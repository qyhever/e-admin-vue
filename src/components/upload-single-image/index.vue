<template>
  <el-upload
    v-loading="loading"
    element-loading-text="正在上传..."
    class="uploader"
    :class="{'hover-mask': value}"
    :action="$QINIU_UPLOAD_URL"
    :show-file-list="false"
    :data="param"
    accept="image/*"
    :on-success="handleSuccess"
    :on-error="handleError"
    :before-upload="handlebeforeUpload">
      <el-image v-if="value" class="image" :src="value" fit="cover"></el-image>
      <i class="el-icon-plus uploader-icon"></i>
  </el-upload>
</template>

<script>
import { getQiniuToken } from '@/api/global'
import { getRandomStr } from '@/utils'
export default {
  name: 'UploadSingleImage',
  props: {
    value: String
  },
  data() {
    return {
      loading: false,
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
      const imageUrl = this.$QINIU_PREFIX + key
      this.$emit('input', imageUrl)
    },
    handleError(err) {
      console.log(err)
      this.loading = false
      this.$message.closeAll()
      this.$message.error('上传失败!')
    },
    handlebeforeUpload(file) {
      const isImg = /^image\/\w+$/i.test(file.type)
      if (!isImg) {
        this.$message.error('只能上传 JPG、PNG、GIF 格式!')
        return false
      }
      return new Promise((resolve, reject) => {
        this.loading = true
        getQiniuToken()
          .then(res => {
            const { token } = res
            this.param.token = token
            this.param.key = getRandomStr() + file.name
            resolve()
          })
          .catch(err => {
            console.log(err)
            this.loading = false
            this.$message.closeAll()
            this.$message.error('上传失败!')
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
    border-color: #409eff;
  }
  ::v-deep .el-upload {
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
.image + .uploader-icon {
  opacity: 0;
}
.image {
  width: 128px;
  height: 128px;
  display: block;
  border-radius: 6px;
}
.hover-mask:hover .uploader-icon {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.2);
  color: #fff;
}
</style>
