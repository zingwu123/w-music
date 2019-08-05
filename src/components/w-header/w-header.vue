<template>
  <div class="w-header">
    <router-link tag="div" to="/user-list" class="userList">
      <i class="iconfont icon-menu"></i>
    </router-link>
    <h1 class="title">w-music</h1>
    <router-link tag="div" to="/search" class="search">
      <i class="iconfont icon-search"></i>
    </router-link>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import "common/scss/variable.scss";
.w-header {
  position: relative;
  height: 44px;
  width: 100%;
  background: $color-theme;
  text-align: center;
  .title {
    font-weight: bold;
    color: $color-text-l;
    letter-spacing: 3px;
    font-size: 24px;
    padding-top: 9px;
  }
  .userList {
    position: absolute;
    left: 0;
    top: 10px;
    .iconfont {
      display: block;
      color: $color-theme-l;
      padding-left: 10px;
      font-size: 22px;
    }
  }
  .search {
    position: absolute;
    right: 0;
    top: 10px;
    .iconfont {
      display: block;
      padding-right: 10px;
      color: $color-theme-l;
      font-size: 22px;
    }
  }
}
</style>
