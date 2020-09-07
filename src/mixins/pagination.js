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
    handleSortChange(sort) {
      this.params.page = 1
      this.params.size = 10
      if (sort.prop && sort.order) {
        this.params.sortProp = sort.prop
        this.params.sortOrder = sort.order === 'ascending' ? 1 : -1
      } else {
        this.params.sortProp = null
        this.params.sortOrder = null
      }
      this.query()
    },
    changeQuery() {
      this.params.page = 1
      this.params.size = 10
      this.query()
    },
    query() {
      // async data
    }
  }
}
