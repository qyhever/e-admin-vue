<template>
  <textarea :id="id" :style="{visibility: 'hidden'}"></textarea>
</template>

<script>
import plugins from './plugins'
import toolbar from './toolbar'
import initImageUploadPlugin from './customer-image-upload'
import { getQiniuToken } from '@/api/global'
import { getRandomStr } from '@/utils'
import axios from 'axios'
import asyncLoadScript from '@/utils/async-script'
const src = process.env.BASE_URL + 'tinymce5.4.2/tinymce.js'
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      id: 'tinymce' + new Date().getTime() + Math.random().toString().slice(2),
      hasChange: false,
      hasInit: false
    }
  },
  watch: {
    value(val) {
      if (this.hasInit && !this.hasChange) {
        this.$nextTick(() => {
          this.editor.setContent(val || '')
        })
      }
    }
  },
  mounted() {
    asyncLoadScript(src, window.tinymce, (err) => {
      if (err) {
        return this.$message.warning('加载编辑器失败')
      }
      initImageUploadPlugin()
      this.init()
    })
  },
  beforeDestroy() {
    this.editor && this.editor.remove()
  },
  methods: {
    init() {
      window.tinymce.init({
        selector: '#' + this.id,
        language: 'zh_CN',
        content_style: 'img {max-width:100%;}',
        auto_focus: false,
        height: this.height,
        min_height: this.height,
        object_resizing: false,
        placeholder: '请输入内容',
        plugins,
        toolbar,
        fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
        font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
        autosave_ask_before_unload: false,
        branding: false, // 隐藏编辑器界面右下角的“Powered by Tiny”（官方汉化为：由Tiny驱动）字样
        contextmenu: 'bold copy',
        elementpath: false, // 隐藏底栏的元素路径
        statusbar: false,
        toolbar_mode: 'wrap', // 工具栏布局模式
        quickbars_insert_toolbar: '', // [插入]快捷工具栏
        quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote', // [选择]快捷工具栏
        fullpage_default_font_size: '14px',
        init_instance_callback: editor => {
          this.editor = editor
          if (this.value) {
            editor.setContent(this.value)
          }
          this.hasInit = true
          editor.on('keyup input', () => {
            this.hasChange = true
          })
          editor.on('NodeChange Change keyup', () => {
            this.$emit('input', editor.getBody().innerHTML)
          })
        },
        imageSelectorCallback: async (file, success) => {
          const { token } = await getQiniuToken()
          const formData = new FormData()
          formData.append('file', file)
          formData.append('key', getRandomStr() + file.name)
          formData.append('token', token)
          const res = await axios({
            url: this.$QINIU_UPLOAD_URL,
            method: 'post',
            data: formData,
            onUploadProgress: progressEvent => {
              const { loaded, total } = progressEvent
              const current = (loaded / total) * 100
              console.log(parseInt(current, 10))
              this.$progress.open(parseInt(current, 10))
            }
          })
          const src = this.$QINIU_PREFIX + res.data.key
          success(src)
        }
      })
    }
  }
}
</script>
