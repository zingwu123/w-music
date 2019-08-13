<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span
        class="dot"
        v-for="(item, index) in dots"
        :key="index"
        :class="{'active' : currentPageIndex === index}"
      ></span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { addClass } from 'common/js/dom'
export default {
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  props: {
    // 是否循环轮播
    loop: {
      type: Boolean,
      default: true
    },
    // 是否自动轮播
    autoPlay: {
      type: Boolean,
      default: true
    },
    // 轮播间隔时间
    interval: {
      type: Number,
      default: 4000
    }
  },
  // 保证先执行setTimeout()这个函数
  mounted() {
    setTimeout(() => {
      this._setSliderWidth()
      this._initDots()
      this._initSlider()
      this._onScrollEnd()
    }, 20)
    //  浏览器大小切换刷新图片大小
    window.addEventListener('resize', () => {
      if (!this.slider) {
        return
      }
      this._setSliderWidth(true)
    })
  },
  methods: {
    // 设置slider宽度
    _setSliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children // 获取轮播图张数

      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth //  获取父元素宽度
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item') // 添加轮播图信息到slider-item
        child.style.width = sliderWidth + 'px' //   设定轮播图宽度
        width += sliderWidth
      }
      if (this.loop && !isResize) {
        width += 2 * sliderWidth // 循环播放设置左右图片宽度
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    // 设置轮播小圆点
    _initDots() {
      this.dots = new Array(this.children.length) // 小圆点数等于图片数
    },
    // slider初始化
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true, //   允许轮播图横向滚动
        scrollY: false, //  不允许轮播图纵向滚动
        momentun: false, // 不生成滚动动画
        // 循环轮播设置
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        },
        snapSpeed: 400,
        bounce: false,
        stopPropagation: true,
        click: true
      })
      this.slider.on('scrollEnd', this._onScrollEnd)
    },
    _onScrollEnd() {
      let pageIndex = this.slider.getCurrentPage().pageX // 获取轮播到第几张图
      this.currentPageIndex = pageIndex
      if (this.autoPlay) {
        this._play()
      }
    },
    // 设置自动轮播
    _play() {
      clearTimeout(this.timer) //   防止手动轮播与自动轮播冲突
      this.timer = setTimeout(() => {
        this.slider.next()
      }, this.interval)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "common/scss/variable.scss";
.slider {
  min-height: 1px;
  position: relative;
  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;
      img {
        display: block;
        width: 100%;
      }
    }
  }
  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-l;
      &.active {
        // width: 10px;
        border-radius: 5px;
        background: $color-highlight-background;
      }
    }
  }
}
</style>
