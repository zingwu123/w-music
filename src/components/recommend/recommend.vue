<template>
  <div class="recommend" ref="recommend">
    <scroll class="recommend-content" ref="scroll" :data="playList">
      <div>
        <!-- v-if是当banner.length>0时，才会显示轮播图组件，避免无组件内容就进行渲染-->
        <div v-if="banner.length" class="slider-wrapper">
          <slider>
            <!-- :=v-bind 动态更新dom @=v-on 监听dom事件 -->
            <div v-for="item in banner" :key="item.id" @click.stop="selectBanner(item)">
              <img :src="item.imageUrl" />
            </div>
          </slider>
        </div>
        <div class="recommend-list" ref="recommendList">
          <h1 class="title">推荐歌单</h1>
          <ul>
            <li class="item" v-for="item in playList" :key="item.id">
              <div class="icon" @click="selectList(item)">
                <div class="gradients"></div>
                <img v-lazy="item.picUrl" :key="item.picUrl" />
              </div>
              <p class="play-count">
                <i class="iconfont icon-listeningvolume"></i>
                {{Math.floor(item.playCount / 10000) }}万
              </p>
              <div class="text">
                <p class="name">{{item.name}}</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="recommend-song" ref="recommendSong">
          <h1 class="title">新歌推荐</h1>
          <ul>
            <li
              class="item"
              v-for="item in recommendMusic"
              :key="item.id"
              @click="selectSong(item)"
            >
              <div class="icon">
                <img v-lazy="item.image" />
              </div>
              <p class="text">{{item.name}}</p>
              <p class="singer">{{item.singer}}</p>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import Scroll from "base/scroll/scroll";
import Slider from "base/slider/slider";
import { ERR_OK } from "common/js/config";
import { getBanner, getRecommendList, getRecommendMusic } from "api/recommend";
import { createRecommendSong } from "common/js/song";
import { getSongDetail } from "api/search";
import { mapMutations, mapActions } from "vuex";
import { playlistMixin } from "common/js/mixin";
export default {
  mixins: [playlistMixin],
  data() {
    return {
      banner: [], // 初始化轮播图
      playList: [], // 初始化推荐歌单
      recommendMusic: [] // 初始化推荐音乐
    };
  },
  components: {
    Slider,
    Scroll
  },
  beforeMount() {
    this.$Lazyload.config({
      loading: require("common/image/default.png")
    });
  },
  created() {
    // 调用这三个函数
    this._getBanner();
    this._getRecommendList();
    this._getRecommendMusic();
  },
  methods: {
    //  获取轮播图数据并存储到banner
    _getBanner() {
      getBanner().then(res => {
        if (res.status === ERR_OK) {
          let data = res.data.banners;
          this.banner = data;
        } else {
          console.error("Banner 获取失败");
        }
      });
    },
    //  获取推荐歌单数据并存储到playList
    _getRecommendList() {
      getRecommendList().then(res => {
        if (res.status === ERR_OK) {
          this.playList = res.data.result;
        } else {
          console.error("推荐歌单获取失败");
        }
      });
    },
    //  获取推荐音乐数据并存储到recommendMusic
    _getRecommendMusic() {
      getRecommendMusic().then(res => {
        if (res.status === ERR_OK) {
          let list = res.data.result.map(item => {
            return createRecommendSong(item);
            // map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值
            // map() 方法按照原始数组元素顺序依次处理元素
          });
          list.splice(9); // splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。
          this.recommendMusic = list;
        } else {
          console.error("getRecommendMusic 获取失败");
        }
      });
    },
    // 添加轮播图对应音乐到播放器
    selectBanner(item) {
      if (item.url) {
        window.open(item.url);
      } else {
        getSongDetail(item.targetId).then(res => {
          if (res.status === ERR_OK) {
            let m = res.data.songs[0];
            let song = {
              id: m.id,
              singer: m.ar[0].name,
              name: m.name,
              image: m.al.picUrl,
              album: m.al.name
            };
            this.insertSong(song);
            this.setFullScreen(true);
          }
        });
      }
    },
    selectSong(item) {
      this.insertSong(item);
    },
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? "60px" : "";
      this.$refs.recommend.style.bottom = bottom;
      this.$refs.scroll.refresh();
    },
    selectList(item) {
      this.$router.push({
        path: `/recommend/${item.id}`
      });
      this.setMuiscList(item);
    },
    ...mapMutations({
      setMuiscList: "SET_MUSIC_LIST",
      setFullScreen: "SET_FULL_SCREEN"
    }),
    ...mapActions(["insertSong"])
  }
};
</script>
<style lang="scss" scoped>
@import "common/scss/variable.scss";
@import "common/scss/mixin.scss";
.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  z-index: 100;
  .recommend-content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .slider-wrapper {
      width: 100%;
      margin: 0 auto;
      overflow: hidden;
    }
    .recommend-list {
      position: relative;
      box-sizing: border-box;
      width: 100%;
      text-align: center;
      .title {
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: $font-size-medium;
        font-weight: bold;
        color: $color-text;
      }
      .item {
        display: inline-block;
        position: relative;
        box-sizing: border-box;
        width: 33%;
        padding: 0 1%;
        .icon {
          position: relative;
          display: inline-block;
          width: 100%;
          margin-bottom: 5px;
          .gradients {
            position: absolute;
            width: 100%;
            height: 30px;
            background: linear-gradient(
              rgba(109, 109, 109, 0.4),
              rgba(255, 255, 255, 0)
            );
          }
          img {
            width: 100%;
            height: 100%;
            border-radius: 3px;
          }
        }
        .play-count {
          position: absolute;
          top: 5px;
          right: 8px;
          font-size: $font-size-small-s;
          color: $color-text-l;
        }
        .text {
          float: left;
          line-height: 16px;
          text-align: left;
          height: 32px;
          overflow: hidden;
          margin-bottom: 10px;
          font-size: $font-size-small;
        }
      }
    }
    .recommend-song {
      margin-top: -20px;
      box-sizing: border-box;
      width: 100%;
      text-align: center;
      .title {
        height: 40px;
        line-height: 50px;
        text-align: center;
        font-size: $font-size-medium;
        font-weight: bold;
        color: $color-text;
      }
      .item {
        display: inline-block;
        position: relative;
        box-sizing: border-box;
        width: 33%;
        padding: 0 1%;
        .icon {
          position: relative;
          display: inline-block;
          width: 100%;
          margin-bottom: 5px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 3px;
          }
        }
        .text {
          line-height: 16px;
          text-align: left;
          height: 16px;
          @include no-wrap(); // 不换行
          font-size: $font-size-small;
        }
        .singer {
          line-height: 16px;
          text-align: left;
          @include no-wrap();
          font-size: $font-size-small;
          color: $color-text-g;
        }
      }
    }
  }
}
</style>
