<template>
  <transition name="el-fade-in">
    <div
      v-show="visible"
      @click.stop="handleClick"
      :style="{
        'right': styleRight,
        'bottom': styleBottom
      }"
      class="el-backtop">
      <slot>
        <el-icon name="caret-top"></el-icon>
      </slot>
    </div>
  </transition>
</template>

<script>
import { throttle } from 'lodash'
const cubic = value => Math.pow(value, 3)
const easeInOutCubic = value => value < 0.5
  ? cubic(value * 2) / 2
  : 1 - cubic((1 - value) * 2) / 2
export default {
  name: 'ComBacktop',
  props: {
    visibilityHeight: {
      type: Number,
      default: 200
    },
    el: {
      type: Object
    },
    right: {
      type: Number,
      default: 40
    },
    bottom: {
      type: Number,
      default: 40
    }
  },
  data() {
    return {
      container: null,
      visible: false
    }
  },
  computed: {
    styleBottom() {
      return `${this.bottom}px`
    },
    styleRight() {
      return `${this.right}px`
    }
  },
  mounted() {
    this.init()
    this.throttledScrollHandler = throttle(this.onScroll, 300)
    this.container.addEventListener('scroll', this.throttledScrollHandler)
  },
  beforeDestroy() {
    this.container.removeEventListener('scroll', this.throttledScrollHandler)
  },
  methods: {
    init() {
      this.container = window
      if (this.el) {
        this.container = this.el
      }
    },
    onScroll() {
      let scrollTop = 0
      if (this.el) {
        scrollTop = this.el.scrollTop
      } else {
        scrollTop = window.pageYOffset || document.documentElement.scrollTop
      }
      this.visible = scrollTop >= this.visibilityHeight
    },
    handleClick(e) {
      this.scrollToTop()
      this.$emit('click', e)
    },
    scrollToTop() {
      const el = this.el
      const beginTime = Date.now()
      const beginValue = el ? el.scrollTop : window.pageYOffset
      const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16))
      const frameFunc = () => {
        const progress = (Date.now() - beginTime) / 500
        if (progress < 1) {
          const result = beginValue * (1 - easeInOutCubic(progress))
          if (el) {
            el.scrollTop = result
          } else {
            window.scrollTo(0, result)
          }
          rAF(frameFunc)
        } else {
          if (el) {
            el.scrollTop = 0
          } else {
            window.scrollTo(0, 0)
          }
        }
      }
      rAF(frameFunc)
    }
  }
}
</script>
