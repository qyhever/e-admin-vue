<template>
  <transition name="el-fade-in">
    <el-progress
      v-show="visible"
      class="progress"
      type="circle"
      :percentage="percent"
    >
    </el-progress>
  </transition>
</template>

<script>
export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  computed: {
    visible() {
      return this.percent < 100
    }
  }
}
</script>

<style lang="scss" scoped>
  .progress {
    z-index: 3000;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    border-radius: 50%;
  }
</style>
