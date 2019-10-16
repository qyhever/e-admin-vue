<template>
  <div class="header">
    <div class="menu-button-wrapper" @click="handleToggle">
      <svg-icon :icon-class="collapse ? 'menu-unfold' : 'menu-fold'" class="menu-button" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'headerbar',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['collapse'])
  },
  methods: {
    handleToggle() {
      this.$store.commit('app/TOGGLE_SIDEBAR')
    }
  }
}
</script>

<style lang="scss" scoped>
  .header {
    height: 60px;
    box-shadow: 0 0 4px rgba(0, 21, 41, 0.08);
    .menu-button-wrapper {
      width: 60px;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #404040;
      cursor: pointer;
      &:hover {
        color: $--color-primary;
        background-color: #f9f9fc;
      }
      .menu-button {
        font-size: 20px;
      }
    }
  }
</style>
