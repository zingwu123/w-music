import Vue from 'vue'
import App from './App'
import fastclick from 'fastclick'
import 'common/scss/index.scss'
import router from './router'

Vue.config.productionTip = false

fastclick.attach(document.body) // 解决点击延迟300ms

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
