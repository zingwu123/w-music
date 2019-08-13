import Vue from 'vue'
import App from './App'
import fastclick from 'fastclick'
import 'common/scss/index.scss' // 引入初始样式
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false

Vue.use(VueLazyload)

fastclick.attach(document.body) // 解决点击延迟300ms

Vue.use(VueLazyload, {
  loading: 'static/default.jpg' // 图片加载的路径
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
