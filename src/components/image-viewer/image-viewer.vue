<template>
  <el-image-viewer
    ref="viewer"
    v-if="visible"
    :on-close="onClose"
    :url-list="urlList"
  />
</template>

<script>
  import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
  export default {
    name: 'image-viewer',
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
        urlList: [],
        visible: false
      }
    },
    methods: {
      onClose() {
        this.visible = false
        this.urlList = false
      },
      preview(value, index) {
        this.visible = true
        let urlList = []
        if (typeof value === 'string') {
          urlList = [value]
        }
        if (Array.isArray(value)) {
          urlList = value
        }
        this.urlList = urlList
        if (typeof index === 'number') {
          this.$nextTick(() => {
            this.$refs.viewer.index = index
          })
        }
      }
    }
  }
</script>
