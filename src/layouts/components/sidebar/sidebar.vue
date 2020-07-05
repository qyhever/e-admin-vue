<template>
  <div class="sidebar-container">
    <router-link class="logo-container" to="/">
      <img class="image" src="@/assets/images/logo.png" alt="加载失败" title="后台管理系统">
      <h1 class="title" v-if="!collapse">后台管理系统</h1>
    </router-link>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu()"
        :collapse="collapse"
        background-color="#161B37"
        text-color="#fff"
        :unique-opened="false"
        active-text-color="#fff"
        :collapse-transition="false"
        mode="vertical"
        router
      >
        <sidebar-item v-for="(route, index) in routes" :key="index" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './sidebar-item'
export default {
  name: 'sidebar',
  components: {
    SidebarItem
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters([ 'routes', 'collapse' ])
  },
  mounted() {
    // console.log(this.constantRoutes)
  },
  methods: {
    activeMenu() {
      const { meta, path } = this.$route
      if (meta && meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  }
}
</script>

<style lang="scss" scoped>
  .sidebar-container {
    z-index: 1999;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: $slide-width;
    height: 100%;
    background-color: #161B37;
    transition: width 0.3s;
    font-size: 0;
    overflow: hidden;
    /deep/ .el-menu {
      border-right: 0;
      .el-menu-item {
        height: 50px;
        line-height: 50px;
        &:hover {
          background-color: #0b1133 !important;
        }
        &.is-active, &.is-active:hover, &:focus {
          background-color: #346fff !important;
        }
      }
    }
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
      animation: fadeLeftIn 0.5s linear;
      animation-fill-mode: both;
    }
  }
  @keyframes fadeLeftIn {
    0% {
      transform: translateX(-10px);
      opacity: 0;
    }

    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
</style>
