<template>
  <div id="app">
    <w-header></w-header>
    <navbar></navbar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
// import 要用驼峰命名，否则会报错
import WHeader from 'components/w-header/w-header'
import Navbar from 'components/navbar/navbar'
import Player from 'components/player/player'
export default {
  // 注册组件
  components: {
    WHeader,
    Navbar,
    Player
  }
}
</script>

<style lang="scss" scoped>
@import "common/scss/variable.scss";
#app {
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>