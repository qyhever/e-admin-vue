<template>
  <aside class="sidebar" :class="[theme]">
    <router-link class="logo-container" to="/" title="e-admin">
      <img class="image" src="@/assets/images/logo.png" alt="logo">
      <transition name="el-fade-in">
        <h1 v-show="!collapse" class="title">e-admin</h1>
      </transition>
    </router-link>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        class="menu"
        :collapse="collapse"
        :collapse-transition="false"
      >
        <MenuItem :menus="menus"></MenuItem>
      </el-menu>
    </el-scrollbar>
    <div class="toggle-theme" v-show="!collapse">
      <div class="toggle-theme-left">
        <ComSvgIcon name="bulb"></ComSvgIcon>
        <span class="toggle-theme-text">切换主题</span>
      </div>
      <el-switch
        :active-text="collapse ? '' : '黑'"
        :inactive-text="collapse ? '' : '白'"
        active-value="dark"
        inactive-value="light"
        v-model="theme"
      />
    </div>
  </aside>
</template>

<script>
  import { mapGetters } from 'vuex'
  import MenuItem from './menu-item'
  import { getSideBarTheme, setSideBarTheme } from '@/utils/local'
  import { getAccessRoutes } from '@/utils'
  import { routes } from '@/router/routes'
  const generateMenus = (list) => {
    return list.map(item => {
      const { path, meta = {}, hidden } = item
      const { title, icon } = meta
      if (Array.isArray(item.children) && item.children.length) {
        return {
          path,
          title,
          icon,
          hidden,
          children: generateMenus(item.children)
        }
      }
      return {
        path,
        title,
        icon,
        hidden
      }
    })
  }
  export default {
    name: 'SideBar',
    components: {
      MenuItem
    },
    data() {
      return {
        theme: getSideBarTheme() === 'light' ? 'light' : 'dark'
      }
    },
    watch: {
      theme(newVal) {
        setSideBarTheme(newVal)
      }
    },
    computed: {
      ...mapGetters(['collapse', 'user']),
      activeMenu() {
        const { meta, path } = this.$route
        if (meta && meta.activeMenu) {
          return meta.activeMenu
        }
        return path
      },
      menus() {
        const accessRoutes = getAccessRoutes(routes, this.user.resourceCodes)
        return generateMenus(accessRoutes)
      }
    }
  }
</script>
