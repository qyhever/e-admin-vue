<template>
  <div class="empty-container">
    <ComSvgIcon name="empty" class="empty-icon"></ComSvgIcon>
    <div class="empty-text-wrapper">
      <slot>
        <div class="empty-text">{{text}}</div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .empty-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 20px;
    padding: 20px 0;
    .empty-icon {
      font-size: 100px;
      color: #DCDCDC;
    }
    .empty-text-wrapper {
      padding-top: 10px;
      color: $color-text-primary;
    }
    .empty-text {
      font-weight: 700;
    }
  }
</style>
