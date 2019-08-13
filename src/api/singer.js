import axios from 'axios'
import {
  HOST
} from '../common/js/config'

// 调用歌手信息接口
export function getSingers() {
  const url = HOST + '/top/artists?limit=200' // limit值代表请求的歌手数量
  return axios.get(url)
}

// 调用歌手单曲接口
export function getSingerDetail(singerId) {
  const url = HOST + `/artists?id=${singerId}`

  return axios.get(url)
}
