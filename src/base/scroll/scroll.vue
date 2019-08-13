<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    probeType: {
      type: Number,
      default: 1 // 当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件；
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    pullup: {
      type: Boolean,
      default: false
    },
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll()
    })
  },
  methods: {
    _initScroll() {
      // 未渲染时
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      })

      if (this.listenScroll) {
        let _this = this
        this.scroll.on('scroll', pos => {
          _this.$emit('scroll', pos)
        })
      }
      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= this.scroll.maxScrollY + 50) {
            this.$emit('scrollToEnd')
          }
        })
      }
    },
    enable() {
      this.scroll && this.scroll.enable() // 判断scroll是否启用
    },
    disable() {
      this.scroll && this.scroll.disable() // 禁用scroll
    },
    refresh() {
      this.scroll && this.scroll.refresh() // 重新计算 BetterScroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments) // 滚动到指定位置
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments) // 滚动到指定位置的目标元素
    }
  },
  // 侦听器侦听data
  watch: {
    data() {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  }
}
</script>

<style>
</style>
