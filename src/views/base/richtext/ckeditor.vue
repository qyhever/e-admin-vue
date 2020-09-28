<template>
  <ComPage>
    <ComCkeditor v-model="desc"></ComCkeditor>
  </ComPage>
</template>

<script>
export default {
  data() {
    return {
      desc: 'test'
    }
  },
  mounted() {
    setTimeout(() => {
      this.desc = '生命在于折腾'
    }, 1000)
  }
}
</script>
