export default {
  data() {
    return {
      params: {
        page: 1,
        size: 10
      }
    }
  },
  methods: {
    handleSizeChange(size) {
      this.params.size = size
      this.params.page = 1
      this.query()
    },
    handleCurrentChange(page) {
      this.params.page = page
      this.query()
    },
    changeQuery() {
      this.params.page = 1
      this.params.size = 10
      this.query()
    }
  }
}
