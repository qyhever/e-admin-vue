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
    }
  }
</script>
