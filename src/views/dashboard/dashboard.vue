<template>
  <div>
    <ul>
      <li v-for="(item, index) in list" :key="index">{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: ['a', 'b', 'c']
    }
  },
  mounted() {
    setTimeout(() => {
      this.list.push('d')
    }, 2000)
  }
}
</script>

