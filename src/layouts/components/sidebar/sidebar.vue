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
        <!-- <template v-for="item in routes">
          <template v-if="item.children && item.children.length > 1">
            <el-submenu :index="item.path" :key="item.path">
              <template slot="title">
                <span>{{item.meta.title}}</span>
              </template>
              <el-menu-item v-for="(subItem) in item.children" :key="subItem.path" :index="subItem.path">
                {{subItem.meta.title}}
              </el-menu-item>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :index="item.children[0].path" :key="item.children[0].path">
              <span>{{item.children[0].meta.title}}</span>
            </el-menu-item>
          </template>
        </template> -->
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
      // if set activeMenu, the sidebar will highlight the path you set
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
        &.is-active, &.is-active:hover, &:focus {
          background-color: #346fff !important;
        }
        &:hover {
          background-color: #0b1133 !important;
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
