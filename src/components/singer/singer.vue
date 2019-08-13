<template>
  <div class="singer" ref="singer">
    <list-view :data="this.singers" @select="selectSinger" ref="list"></list-view>
    <!-- router-view承载子路由 -->
    <router-view></router-view>
  </div>
</template>

<script>
import Singer from 'common/js/singer'
import ListView from 'base/list-view/list-view'
import {getSingers} from 'src/api/singer'
import {playlistMixin} from 'common/js/mixin'
import {mapMutations} from 'vuex'

const pinyin = require('pinyin')
const HOT_NAME = '热门'
const HOT_SINGERS = 10

export default {
  mixins: [playlistMixin],
  data () {
    return {
      singers: []
    }
  },
  created () {
    this._getSingers()
  },
  methods: {
    // 点击歌手跳转到歌手详情
    selectSinger (singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    handlePlaylist (playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.singer.style.bottom = bottom
      this.$refs.list.refresh()
    },
    // 获取歌手数据
    _getSingers () {
      getSingers().then((res) => {
        let s = res.data.artists
        s.map((item) => {
          let py = pinyin(item.name[0], {
            style: pinyin.STYLE_FIRST_LETTER // 调用pinyin插件
          })
          item.initial = py[0][0].toUpperCase()
        })
        this.singers = this._normalizeSinger(s)
      })
    },
    // 规范化歌手数据
    _normalizeSinger (list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGERS) {
          // 将以下数据添加到Singer中
          map.hot.items.push(new Singer({
            id: item.id,
            name: item.name,
            avatar: item.img1v1Url,
            aliaName: item.alias.join(' / ')
          }))
        }

        const key = item.initial
        if (!map[key]) {
          // 如果没有map，就生成
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          id: item.id,
          name: item.name,
          avatar: item.img1v1Url,
          aliaName: item.alias[0]
        }))
      })
      // 为了得到有序列表，对map数据再进行处理
      let hot = []
      let ret = []
      for (const key in map) {
        let val = map[key]
        if (val.title.match(/[A-Z]/)) {
          ret.push(val) // 添加到A-Z数组中
        } else if (val.title === HOT_NAME) {
          hot.push(val) // 添加到热门数组中
        }
      }
      // 对数据进行按首字母排序
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret) // 连接hot数组和A-Z数组
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  components: {
    ListView
  }
}
</script>

<style lang="scss" scoped>
 .singer {
    position: fixed;
    top: 88px;
    bottom: 0;
    width: 100%;
 }
</style>
