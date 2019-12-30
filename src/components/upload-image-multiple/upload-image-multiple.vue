<template>
  <div>
    <el-upload
      ref="upload"
      :action="QINIU_UPLOAD_URL"
      multiple
      :data="param"
      :file-list="fileList"
      list-type="picture-card"
      :limit="limit"
      :on-exceed="handleUploadExceed"
      :on-preview="handlePictureCardPreview"
      :on-remove="onRemove"
      :before-upload="handlebeforeUpload"
      :on-success="onSuccess"
      :on-error="onError">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="preview">
    </el-dialog>
  </div>
</template>

<script>
import { getQiniuToken } from '@/api/common'
import { debounce } from 'lodash'
export default {
  props: {
    value: {
      type: Array,
      default: () => []
    },
    limit: {
      type: Number,
      default: 4
    }
  },
  data() {
    return {
      dialogImageUrl: '', // 当前预览图片地址
      dialogVisible: false, // 预览弹框 visible
      param: {
        token: '',
        key: ''
      },
      loading: false,
      uploading: false,
      percent: 0,
      taskQueue: [],
      fileList: []
    }
  },
  watch: {
    value() {
      if (!this.param.token) {
        // ['xxx', 'xxx'] 转换为 [{url: 'xxx'}, {url: 'xxx'}]
        this.fileList = this.value.map((url, index) => ({ name: String(index), url }))
      }
    }
  },
  methods: {
    handleUploadExceed() {
      this.$message.error(`最多上传${this.limit}张图片`)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handlebeforeUpload(file) {
      return this.addFile(file)
    },
    syncUploadFiles () {
      // 这里最后意为排除掉 blob 开头的 URL（这算是一个坑），此时 files 有可能是空数组
      const files = this.$refs.upload.uploadFiles.map(({ url }) => url).filter(url => url.startsWith('http'))
      // 对于无论是否 multiple，ElUpload 的 $data.uploadFiles 始终都是数组类型
      this.$emit('input', files)
    },
    onProgress ({ percent }) {
      this.percent = percent | 0
    },
    onSuccess (res, file) {
      const uploadPath = this.nextFile()
      file.url = uploadPath // 把 blob 链接替换成 CDN 链接
    },
    onRemove: debounce(function () {
      // 手动点击删除显然会调用本函数，但如下场景也会触发调用：
      // 限制 5 张，已传 3 张，若在文件管理器中再选 10 张上传
      // 则溢出了 8 张，即本函数将会频繁调用 8 次（所以要 debounce 一下）

      // 若本函数仅仅就是单纯执行 syncUploadFiles，则必然报错：
      // Uncaught TypeError: Cannot set property 'status' of null
      //
      // 因为此时正在上传 2 张，ElUpload 内部的 handleProgress 一直在不断执行
      // 若直接就粗暴地调用 syncUploadFiles 则会触发 ElUpload $data.uploadFiles 的更新
      // 导致 handleProgress 中的 var file = this.getFile(rawFile) 为 null
      // 故随后 file.status = 'uploading' 就会立即报错
      // （详见源码 https://github.com/ElemeFE/element/blob/1.x/packages/upload/src/index.vue#L141-L146）
      this.uploading
        ? setTimeout(() => this.onRemove, 1000)
        : this.syncUploadFiles()
    }, 250),
    onError () {
      this.uploading = false // 重置上传状态很关键，否则之后就不能 auto run 了
      this.$message.closeAll()
      this.$message.warning('上传功能出了点问题，请重试')
    },
    addFile (file) {
      return new Promise((resolve, reject) => {
        this.taskQueue.push({ file, resolve, reject })

        // auto run
        if (!this.uploading) {
          this.uploading = true
          this.nextFile(true)
        }
      })
    },
    queryQiniuToken() {
      return new Promise((resolve, reject) => {
        if (this.param.token) {
          resolve(this.param.token)
        } else {
          getQiniuToken(
            loading => this.loading = loading
          ).then(data => {
            resolve(data.token)
          }).catch(reject)
        }
      })
    },
    nextFile (isAutorun) {
      // 当 isUploading false => true 时（auto run）：
      // 1. 若之前没有上传过的，则 this.action 和 this.key 均为 ''，故 join 出来是 '/'
      // 2. 若之前有上传过的，则结果为上一次的 uploadPath
      // 鉴于两者都没有意义，故由 auto run 触发的都无需执行 urljoin
      let uploadPath = ''
      if (!isAutorun) {
        uploadPath = this.QINIU_PREFIX + this.param.key
      }
      if (!isAutorun) {
        console.info('上传成功：', uploadPath)
      }

      if (this.taskQueue.length) {
        let nextTask = null
        this.queryQiniuToken()
          .then(token => {
            this.param.token = token
            this.param.key = new Date().getTime() + Math.random().toString(16).slice(2)
            nextTask = this.taskQueue.shift()
            this.$nextTick(() => {
              nextTask.resolve() // 相当于 resolve 掉 before-upload 钩子中返回的 promise
            })
          })
          .catch(err => {
            console.log(err)
            nextTask.reject()
          })
      } else {
        this.uploading = false
        this.$nextTick(() => {
          this.syncUploadFiles()
        })
      }

      return uploadPath
    }
  }
}
</script>
