<template>
  <div id="app">
    <w-header></w-header>
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import WHeader from 'components/w-header/w-header'
import Navbar from 'components/navbar/navbar'
export default {
  components: {
    WHeader,
    Navbar
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