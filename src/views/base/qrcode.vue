<template>
  <div>
    <ComUploadImageMultiple v-model="urls" :on-preview="onPreview"></ComUploadImageMultiple>
    <ComImageViewer ref="imageViewer"></ComImageViewer>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        urls: []
      }
    },
    mounted() {
      setTimeout(() => {
        this.urls = ['http://test.qiniu.qyhever.com/u=1758137825,1453100457&fm=26&gp=0.jpg']
      }, 1500)
    },
    methods: {
      onPreview(urls) {
        this.$refs.imageViewer.preview(urls)
      }
    }
  }
</script>
