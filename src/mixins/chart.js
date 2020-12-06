export default {
  mounted() {
    let timer = null
    const unsubscribe = this.$store.subscribe(({ type }) => {
      if (type === 'app/TOGGLE_SIDEBAR') {
        timer = setTimeout(() => {
          this.chart.resize()
        }, 500)
      }
    })
    this.$once('hook:beforeDestroy', () => {
      unsubscribe()
      clearTimeout(timer)
    })
  }
}
