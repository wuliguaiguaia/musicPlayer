// import { SSL_OP_SINGLE_ECDH_USE } from "constants";

// import { parse } from "ipaddr.js";

// import { WSASYSCALLFAILURE } from "constants";

window.onload= () =>{

    const serverUrl = "http://127.0.0.1:2080/api";
     
    const loadTemplete = id => document.getElementById(id + '_templ').innerHTML

    const pad = (n,num) => ( Array(n).join(0) + num ).slice(-n)

    const converseTime = num =>{
        let hours = Math.floor(num / 3600) ;
        let  minutes = Math.floor(num % 3600 / 60) ;
        let seconds =  Math.floor(num % 60);
        return hours==0 ? ` ${pad(2,hours)}:${pad(2,minutes)}:${pad(2,seconds)}`:`${pad(2,minutes)}:${pad(2,seconds)}`  
    }

 

    const App = Vue.extend({});
    App.audio = new Audio();

    const Home = Vue.extend({
        template:loadTemplete('home')
    });

    const Songs = Vue.extend({
        template:loadTemplete("list"),
        data(){
            this.$http.jsonp(`${serverUrl}/music`)
            .then(res=>{
                this.list = res.data;
            })
            return{
                list:[],
            }
        },
        methods:{
            pad,
            converseTime,
        }
    });
    
    const Player = Vue.extend({
        template:loadTemplete('item'),
        data(){
            this.$http.jsonp(`${serverUrl}/music`)
            .then(res=>{
                songLength = res.data.length;
            })
            return{
                item:{},
                songLength:0,
            }
        },
        route:{
            data(transition){
                const id = parseInt(transition.to.params.id, 10)
                if(!id){router.go({name:'list'})};
                this.$http.jsonp(`${serverUrl}/music/${id}`)
                .then(res=>{
                    // console.log(res.ok)
                    if(!res.ok){ return router.go({name:'list'})}
                    this.item = { current : 0,playing:true,random:false}
                    Object.assign(this.item,res.data);
                    App.audio.src = this.item.music;
                    App.audio.autoplay = true;
                    App.audio.addEventListener("loadedmetadata",()=>{
                        this.item.duration = App.audio.duration;
                    })
                    App.audio.addEventListener("timeupdate",()=>{
                        this.item.current = App.audio.currentTime;
                    })
                    console.log('fds')
                    App.audio.addEventListener("play",()=>{
                        this.item.random = this.storage().fetch() == "false" ? false : true;
                        this.item.playing = true;
                    })
                    App.audio.addEventListener("pause",()=>{
                        this.item.playing = false;
                    })
                    App.audio.addEventListener("ended",()=>{
                        if(this.item.random){
                            this.getSong().random()
                        }else{
                            this.getSong().next()
                        }
                    })
                }).catch(err=>router.go({name:'list'}))
                return {item:{}} //**** */
            }
        },
        methods:{
            getSong(){
                let id = this.item.id;
                return{
                    prev(){
                        id--
                        if(id <= 1){
                            id = 1;
                        }
                        router.go({name:'item',params:{id:id}});
                    },
                    next(){
                        setTimeout(function(){
                            id++;
                            if(id >= this.songLength){
                                id = this.songLength;
                            }
                            router.go({name:'item',params:{id:id}})
                        },10)
                    },
                    random(){
                        setTimeout(function(){
                            let newId = 0;
                            do{
                                newId = ~~(Math.random()*this.songLength + 1);
                                console.log(newId,id)
                            }while(newId == id)
                            router.go({name:'item',params:{id:newId}})
                        }, 10);
                    }
                }
            },
            converseTime,
            play(){
                if(!this.item.playing){
                    App.audio.play();
                }else{
                    App.audio.pause()
                }
            },
            progress(){
                App.audio.currentTime = this.item.current;
            },
            storage(){
                let storage__key = "isRandom";
                return {
                    fetch(){
                        return window.localStorage.getItem(storage__key) || false;
                    },
                    save(item){
                        window.localStorage.setItem(storage__key,item)
                    }
                }
            },
            randomChange(){
                this.item.random = true;
                this.storage().save(true)
            },
            cycleChange(){
                this.item.random = false;
                this.storage().save(false)
            }
        }
    });    

    /**
     * @type { VueRouter}
     * 
     */
    
    const router = new VueRouter();
    router.map({
        '/home':{
            name:'home',
            component:Home,
        },
        '/songs':{
            name:'list',
            component:Songs,
        },
        '/songs/:id':{
            name:'item',
            component:Player
        }
    });

    router.redirect({'*':'/home'});
    router.start(App,'body')
}

