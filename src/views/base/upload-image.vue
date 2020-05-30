<template>
  <div class="com-container">
    <el-form
      ref="form"
      label-width="96px"
      :model="form"
      :rules="rules"
      size="small">
      <el-form-item label="上传图片: " prop="urls">
        <com-upload-image-multiple v-model="form.urls"/>
      </el-form-item>
      <el-form-item label>
        <el-button type="primary" size="small" @click="onSubmit" :loading="submiting">确 定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        submiting: false,
        form: {
          urls: []
        },
        rules: {
          urls: [
            { required: true, message: '请上传图片', trigger: 'blur' }
          ]
        }
      }
    },
    mounted() {
      setTimeout(() => {
        this.form.urls = [
          'https://test.qiniu.qyhever.com/1580292629299b37be1e0ac312',
          'https://test.qiniu.qyhever.com/15802926307285ef893ee8ca4f'
        ]
      }, 1000)
    },
    methods: {
      onSubmit() {
        this.$refs.form.validate(valid => {
          if (valid) {
            console.log(this.form.urls)
          }
        })
      }
    }
  }
</script>
