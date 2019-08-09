import {
  playMode
} from 'common/js/config'
import {
  loadSearch,
  loadPlay,
  loadFavorite
} from 'common/js/cache'

const state = {
  musicList: {},
  singer: {},
  // 播放
  playing: false,
  // 全屏
  fullScreen: false,
  // 顺序列表
  playlist: [],
  // 播放模式
  sequenceList: [],
  // 当前播放索引
  currentIndex: -1,
  mode: playMode.sequence,
  disc: {},
  topList: {},
  searchHistory: loadSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
}

export default state
