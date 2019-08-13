import axios from 'axios'
import {
  HOST
} from '../common/js/config'

// 获取搜索歌手信息
export function getSearchSinger(name) {
  const url = HOST + `/search?keywords=${name}&type=100`
  return axios.get(url)
}

// 获取搜索歌曲信息
export function getSearchSongs(name, page) {
  const url = HOST + `/search?keywords=${name}&offset=${page}`
  return axios.get(url)
}

// 获取搜索建议信息
export function getSearchSuggest(name) {
  const url = HOST + `/search/suggest?keywords=${name}`
  return axios.get(url)
}

// 获取歌曲详情
export function getSongDetail(id) {
  const url = HOST + `/song/detail?ids=${id}`
  return axios.get(url)
}

// 获取热搜列表
export function getSearchHot(id) {
  const url = HOST + `/search/hot`
  return axios.get(url)
}
