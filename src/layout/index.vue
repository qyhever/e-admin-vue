<template>
  <div class="app-wrapper">
    <sidebar />
    <div class="main-container" :class="{collapse: collapse}">
      <header-bar />
      <breadcrumb />
      <div class="main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { HeaderBar, Sidebar, Breadcrumb } from './components'
export default {
  components: {
    HeaderBar,
    Sidebar,
    Breadcrumb
  },
  computed: {
    ...mapGetters(['collapse'])
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
.main-container {
  position: relative;
  min-height: 100%;
  margin-left: 210px;
  transition: margin-left 0.3s;
  &.collapse {
    margin-left: 54px;
  }
}
.main {
  position: relative;
  min-height: calc(100vh - 127px);
  width: 100%;
  padding: 20px;
  overflow: hidden;
}
</style>
