<template>
  <div class="app-wrapper" :class="{collapse: collapse}">
    <sidebar />
    <div class="main-container">
      <header-bar />
      <breadcrumb />
      <div class="main">
        <router-view />
      </div>
      <footer class="footer">正在缓冲99% ©2019 Created by platchar</footer>
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
  min-height: 100vh;
  margin-left: 210px;
  transition: margin-left 0.3s;
}
.main {
  position: relative;
  min-height: calc(100vh - #{$header-height} - #{$bread-height} - #{$footer-height});
  width: 100%;
  padding: 20px;
}
.footer {
  height: $footer-height;
  padding: 22px 0;
  color: rgba(0, 0, 0, .65);
  font-size: 14px;
  text-align: center;
}
</style>
