<template>
  <div class="page-wrapper" :class="{hasBread, isColumn}">
    <Breadcrumb/>
    <div class="page-container">
      <slot></slot>
    </div>
    <Backtop/>
  </div>
</template>

<script>
import './index.scss'
import Breadcrumb from './breadcrumb'
import Backtop from '@/components/backtop'
export default {
  components: {
    Breadcrumb,
    Backtop
  },
  props: {
    wrapperClass: {
      type: String,
      default: ''
    },
    containerClass: {
      type: String,
      default: ''
    },
    hasBread: {
      type: Boolean,
      default: true
    },
    // 通栏的固定高度，默认高度撑满屏幕（适合不需要滚动，内容少的页面）
    isColumn: {
      type: Boolean,
      default: false
    }
  }
}
</script>
