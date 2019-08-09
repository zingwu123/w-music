import axios from 'axios'
import {HOST} from 'common/js/config'

// 调用获取音乐URL接口
export function getSong (id) {
  const url = HOST + `/song/url?id=${id}`

  return axios.get(url)
}
// 调用获取歌词接口
export function getLyric (id) {
  const url = HOST + `/lyric?id=${id}`

  return axios.get(url)
}