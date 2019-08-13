import axios from 'axios'
import {
  HOST
} from 'common/js/config'

// 获取排行榜数据
export function getTop(id) {
  const url = HOST + `/top/list?idx=${id}`

  return axios.get(url)
}
