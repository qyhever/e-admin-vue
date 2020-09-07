<template>
  <div class="basic-layout" :class="{collapse}">
    <SideBar/>
    <section class="main">
      <HeaderBar/>
      <router-view/>
    </section>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import HeaderBar from './components/headerbar'
  import SideBar from './components/sidebar'
  import './index.scss'
  export default {
    name: 'BasicLayout',
    components: {
      HeaderBar,
      SideBar
    },
    computed: {
      ...mapGetters(['collapse'])
    }
  }
</script>
