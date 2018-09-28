/**
 * 音乐模型
 */
class Music {
  /**
   * 构造音乐对象
   * @param  {number} id       标识
   * @param  {string} name     歌曲名
   * @param  {string} artist   艺术家
   * @param  {number} duration 时长
   * @param  {string} music    歌曲文件名
   * @param  {string} poster   海报文件名
   * @param  {string} lyric    歌词文件名
   * @return {Music}           音乐对象
   */
  constructor(id, name, artist, duration, music, poster, lyric) {
    this.id = id
    this.name = name
    this.artist = artist
    this.duration = duration
    this.music = music
    this.poster = poster
    this.lyric = lyric
  }

  static find() {
    return storage
  }

  static findOne(id) {
    return storage.find(s => s.id === id)
  }

  delete() {
    return storage.splice(storage.indexOf(this), 1)
  }

  save() {
    storage.indexOf(this) === -1 && storage.push(this)
    return true
  }

  update() {
    return true
  }
}

const storage = [
  new Music(1,    'Knockin\' On Heaven\'s Door',    'Guns N\' Roses',     192,    '9277.mp3',     '9277.jpg',     '9277.lrc'     ),
  new Music(2,    'Knockin\' On Heaven\'s Door',    'Guns N\' Roses',     192,    '9277.mp3',     '9277.jpg',     '9277.lrc'     ),
  new Music(3,    'Knockin\' On Heaven\'s Door',    'Guns N\' Roses',     192,    '9277.mp3',     '9277.jpg',     '9277.lrc'     ),
  new Music(4,    'Knockin\' On Heaven\'s Door',    'Guns N\' Roses',     192,    '9277.mp3',     '9277.jpg',     '9277.lrc'     ),
  new Music(5,    'Knockin\' On Heaven\'s Door',    'Guns N\' Roses',     192,    '9277.mp3',     '9277.jpg',     '9277.lrc'     ),
  new Music(6,    'Knockin\' On Heaven\'s Door',    'Guns N\' Roses',     192,    '9277.mp3',     '9277.jpg',     '9277.lrc'     ),
  new Music(7,    'Knockin\' On Heaven\'s Door',    'Guns N\' Roses',     192,    '9277.mp3',     '9277.jpg',     '9277.lrc'     ),
  new Music(8,    'Knockin\' On Heaven\'s Door',    'Guns N\' Roses',     192,    '9277.mp3',     '9277.jpg',     '9277.lrc'     ),
  new Music(9,    'Knockin\' On Heaven\'s Door',    'Guns N\' Roses',     192,    '9277.mp3',     '9277.jpg',     '9277.lrc'     ),
  new Music(10,    'Knockin\' On Heaven\'s Door',    'Guns N\' Roses',     192,    '9277.mp3',     '9277.jpg',     '9277.lrc'     ),
  new Music(11,    'Knockin\' On Heaven\'s Door',    'Guns N\' Roses',     192,    '9277.mp3',     '9277.jpg',     '9277.lrc'     ),
  new Music(12,    'Knockin\' On Heaven\'s Door',    'Guns N\' Roses',     192,    '9277.mp3',     '9277.jpg',     '9277.lrc'     ),
  new Music(13,    'Knockin\' On Heaven\'s Door',    'Guns N\' Roses',     192,    '9277.mp3',     '9277.jpg',     '9277.lrc'     ),
  new Music(14,    'Knockin\' On Heaven\'s Door',    'Guns N\' Roses',     192,    '9277.mp3',     '9277.jpg',     '9277.lrc'     ),
  new Music(15,    'Knockin\' On Heaven\'s Door',    'Guns N\' Roses',     192,    '9277.mp3',     '9277.jpg',     '9277.lrc'     ),
  new Music(16,    'Knockin\' On Heaven\'s Door',    'Guns N\' Roses',     192,    '9277.mp3',     '9277.jpg',     '9277.lrc'     ),
  new Music(17,    'Knockin\' On Heaven\'s Door',    'Guns N\' Roses',     192,    '9277.mp3',     '9277.jpg',     '9277.lrc'     ),
  new Music(18,    'Knockin\' On Heaven\'s Door',    'Guns N\' Roses',     192,    '9277.mp3',     '9277.jpg',     '9277.lrc'     ),
  new Music(19,    'Knockin\' On Heaven\'s Door',    'Guns N\' Roses',     192,    '9277.mp3',     '9277.jpg',     '9277.lrc'     ),
  new Music(20,    'Knockin\' On Heaven\'s Door',    'Guns N\' Roses',     192,    '9277.mp3',     '9277.jpg',     '9277.lrc'     ),
]

module.exports = Music
