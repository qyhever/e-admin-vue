<template>
  <ComPage>
    <ComTinymce v-model="desc"></ComTinymce>
  </ComPage>
</template>

<script>
export default {
  data() {
    return {
      desc: 'test',
      visible: false,
      percent: 0
    }
  },
  mounted() {
    setTimeout(() => {
      this.desc = '生命在于折腾'
    }, 1000)
  }
}
</script>
