<template>
  <div :id="id"></div>
</template>

<script>
import { debounce } from 'lodash'
import asyncLoadScript from '@/utils/async-script'
const src = process.env.BASE_URL + 'ckeditor5-classic/ckeditor.js'
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      id: 'ckeditor' + new Date().getTime() + Math.random().toString().slice(2),
      lastEditorData: ''
    }
  },
  watch: {
    value(newVal, oldVal) {
      if (newVal !== oldVal && newVal !== this.lastEditorData) {
        this.editor.setData(newVal)
      }
    }
  },
  mounted() {
    asyncLoadScript(src, window.ClassicEditor, (err) => {
      if (err) {
        return this.$message.warning('加载编辑器失败')
      }
      asyncLoadScript(process.env.BASE_URL + 'ckeditor5-classic/translations/zh-cn.js')
      this.init()
    })
  },
  beforeDestroy() {
    this.editor && this.editor.destroy()
  },
  methods: {
    init() {
      console.log('window.ClassicEditor', window.ClassicEditor)
      const config = {
        language: 'zh-cn',
        fontSize: 14,
        placeholder: '请输入内容'
      }
      if (this.value) {
        config.initialData = this.value
      }
      window.ClassicEditor
        .create(document.getElementById(this.id), config)
        .then(editor => {
          console.log('editor', editor)
          this.editor = editor
          this.setupEditorEvents()
          this.$emit('ready', editor)
        })
    },
    setupEditorEvents() {
      const editor = this.editor
      const handleInputDebounced = debounce(event => {
        const data = this.lastEditorData = editor.getData()
        this.$emit('input', data, event, data)
      }, 300)
      editor.model.document.on('change:data', handleInputDebounced)
      editor.editing.view.document.on('focus', event => {
        this.$emit('focus', event, editor)
      })
      editor.editing.view.document.on('blur', event => {
        this.$emit('blur', event, editor)
      })
    }
  }
}
</script>

<style lang="scss">
  // https://github.com/ckeditor/ckeditor5/issues/1708
  .ck-editor__editable {
    min-height: 260px;
  }
</style>
