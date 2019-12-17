<template>
  <div>
    dashboard
    {{msg}}
    {{tooltip}}
  </div>
</template>

<script>
// import { testReq } from '@/api/user'
export default {
  data() {
    return {
      list: ['a', 'b', 'c'],
      msg: '',
      tooltip: ''
    }
  },
  mounted() {
    this.query()
  },
  methods: {
    async query() {
      // try {
      //   const res = await testReq()
      //   console.log(res)
      //   this.msg = res.data.list
      //   this.tooltip = 'he'
      // } catch (err) {
      //   console.log(err)
      // }
    }
  }
}
</script>

