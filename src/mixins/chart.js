export default {
  mounted() {
    let timer = null
    const onResize = () => {
      timer = setTimeout(() => {
        this.chart.resize()
      }, 500)
    }
    const unsubscribe = this.$store.subscribe(({ type }) => {
      if (type === 'app/TOGGLE_SIDEBAR') {
        onResize()
      }
    })
    window.addEventListener('resize', onResize)
    this.$once('hook:beforeDestroy', () => {
      unsubscribe()
      clearTimeout(timer)
      window.removeEventListener('resize', onResize)
    })
  }
}
