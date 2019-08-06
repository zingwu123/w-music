import Vue from 'vue' //    引入Vue
import Router from 'vue-router' //  引入vue-router
import Rank from 'components/rank/rank'
import Search from 'components/search/search'
import Singer from 'components/singer/singer'
import Userlist from 'components/user-list/user-list'
import Recommend from 'components/recommend/recommend'
import SingerDetail from 'components/singer-detail/singer-detail'

Vue.use(Router) //  Vue全局使用Router

export default new Router({
  routes: [
    {
    // 默认跳转到 recommend
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/user-list',
      component: Userlist
    }
  ]
})
