<template>
  <el-upload
    v-loading="loading"
    class="uploader"
    :class="{'hover-mask': value}"
    :action="QINIU_UPLOAD_URL"
    :show-file-list="false"
    :data="param"
    accept="image/*"
    :on-success="handleSuccess"
    :before-upload="handlebeforeUpload">
      <img v-if="value" :src="value" class="avatar">
      <i class="el-icon-plus uploader-icon"></i>
  </el-upload>
</template>

<script>
import axios from '@/utils/axios'
export default {
  props: {
    value: String
  },
  data() {
    return {
      loading: '',
      param: {
        token: '',
        key: ''
      }
    }
  },
  methods: {
    handleSuccess(res) {
      this.loading = false
      const { key } = res
      const imageUrl = this.QINIU_PREFIX + key
      this.$emit('input', imageUrl)
    },
    handlebeforeUpload(file) {
      const isImg = /^image\/\w+$/i.test(file.type)
      if (!isImg) {
        this.$message.error('只能上传 JPG、PNG、GIF 格式!')
        return false
      }
      return new Promise((resolve, reject) => {
        this.loading = true
        axios.get('/upload/qiniu_token').then(res => {
          const { token } = res.data
          this.param.token = token
          this.param.key = new Date().getTime() + Math.random().toString(16).slice(2) + file.name
          resolve(true)
        }).catch(err => {
          this.loading = false
          reject(err)
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .uploader {
    width: 130px;
    height: 130px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    &:hover {
      border-color: #409EFF;
    }
    /deep/ .el-upload {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  }
  .uploader-icon {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    line-height: 128px;
    text-align: center;
    font-size: 28px;
    color: #8c939d;
  }
  .avatar + .uploader-icon {
    opacity: 0;
  }
  .avatar {
    width: 128px;
    height: 128px;
    display: block;
    border-radius: 6px;
  }
  .hover-mask:hover .uploader-icon {
    opacity: 1;
    background-color: rgba(0, 0, 0, .2);
    color: #fff;
  }
</style>
