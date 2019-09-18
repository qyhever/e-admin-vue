<template>
  <div class="sidebar">
    <router-link class="logo-container" to="/">
      <img class="image" src="@/assets/images/logo.png" alt="加载失败" title="后台管理系统">
      <h1 class="title">后台管理系统</h1>
    </router-link>
    sidebar
  </div>
</template>

<script>
export default {
  name: 'sidebar'
}
</script>

<style lang="scss" scoped>
  .sidebar {
    z-index: 9999;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 210px;
    height: 100%;
    background-color: #161B37;
    transition: width 0.3s;
    font-size: 0;
    overflow: hidden;
  }
  .logo-container {
    display: block;
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    .image {
      width: 48px;
      height: 48px;
      margin-right: 12px;
      vertical-align: middle;
    }
    .title {
      display: inline-block;
      vertical-align: middle;
      margin: 0;
      color: #fff;
      font-weight: 600;
      font-size: 16px;
    }
  }
</style>
