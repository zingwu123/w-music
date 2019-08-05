import axios from 'axios'
import {HOST} from '../common/js/config'

// 调用轮播图接口
export function getBanner () {
  const url = HOST + '/banner'
  return axios.get(url)
}

// 调用推荐歌单接口
export function getRecommendList () {
  const url = HOST + '/personalized'
  return axios.get(url)
}

// 调用推荐歌曲接口
export function getRecommendMusic () {
  const url = HOST + '/personalized/newsong'
  return axios.get(url)
}

export function getRecommendListDetail (id) {
  const url = HOST + `/playlist/detail?id=${id}`
  return axios.get(url)
}
