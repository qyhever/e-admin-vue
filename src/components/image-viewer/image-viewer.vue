<template>
  <el-image-viewer
    v-if="visible"
    :on-close="onClose"
    :url-list="urlList"
  />
</template>

<script>
  import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
  export default {
    name: 'ImageViewer',
    components: {
      ElImageViewer
    },
    props: {
      zIndex: {
        type: Number
      }
    },
    data() {
      return {
        visible: false,
        urlList: []
      }
    },
    methods: {
      onClose() {
        this.visible = false
        this.urlList = []
      },
      preview(value) {
        this.visible = true
        let urlList = []
        if (typeof value === 'string') {
          urlList = [value]
        }
        if (Array.isArray(value)) {
          urlList = value
        }
        this.urlList = urlList
      }
    }
  }
</script>
