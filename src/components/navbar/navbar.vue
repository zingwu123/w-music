<template>
  <div class="navbar">
    <router-link tag="div" class="option" to="/recommend">
      <span>推荐</span>
    </router-link>
    <router-link tag="div" class="option" to="/rank">
      <span>排行</span>
    </router-link>
    <router-link tag="div" class="option" to="/singer">
      <span>歌手</span>
    </router-link>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import "common/scss/variable.scss";
.navbar {
  display: flex;
  height: 44px;
  line-height: 44px;
  width: 100%;
  background: $color-theme;
  font-size: $font-size-medium;
  .option {
    flex: 1;
    text-align: center;
    color: $color-text-lm;
    span {
      padding-bottom: 5px;
    }
    &.router-link-active {
      span {
        font-weight: bold;
        color: $color-text-l;
        border-bottom: 2px solid $color-text-l;
      }
    }
  }
}
</style>
