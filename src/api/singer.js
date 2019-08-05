import axios from 'axios'
import {HOST} from '../common/js/config'

// 调用歌手信息接口
export function getSinger() {
  const url = HOST + '/top/artists'
  return axios.get(url)
}