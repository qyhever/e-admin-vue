<template>
  <el-dialog
    :title="title"
    :visible="visible"
    width="600px"
    @close="onClose"
		:close-on-click-modal="dialogModalClose"
    :close-on-press-escape="dialogEscClose"
  >
    <el-form class="form" ref="form" label-width="96px" :model="form" :rules="rules" size="small">
      <el-form-item label="头像: " prop="avatar">
        <com-upload-image-single v-model="form.avatar"></com-upload-image-single>
      </el-form-item>
      <el-form-item label="账户名: " prop="userName">
        <el-input v-model="form.userName" placeholder="请输入账户名" />
      </el-form-item>
      <el-form-item label="真实姓名: " prop="fullName">
        <el-input v-model="form.fullName" placeholder="请输入真实姓名" />
      </el-form-item>
      <el-form-item v-if="!id" label="密码: " prop="password">
        <el-input type="password" v-model="form.password" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item label="状态: " prop="enable">
        <el-radio-group v-model="form.enable">
          <el-radio-button :label="true">启用</el-radio-button>
          <el-radio-button :label="false">禁用</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
			<el-button @click="onClose" size="small">取 消</el-button>
			<el-button type="primary" size="small" @click="onSubmit" :loading="submiting">确 定</el-button>
		</div>
  </el-dialog>
</template>

<script>
import { createUser, updateUser } from '@/api/user'
export default {
  data() {
    return {
      submiting: false,
      visible: false,
      title: '添加',
      id: null,
      form: {
        avatar: '',
        userName: '',
        fullName: '',
        password: '',
        enable: true
      },
      rules: {
        avatar: [
          { required: true, message: '请上传头像', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入账户名', trigger: 'blur' }
        ],
        fullName: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    open(row) {
      console.log(row)
      this.visible = true
      this.title = row ? '编辑' : '添加'
      if (row) {
        this.id = row.id
        this.form = {
          avatar: row.avatar,
          userName: row.userName,
          fullName: row.fullName,
          enable: row.enable
        }
      }
    },
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          try {
            this.submiting = true
            if (this.id) {
              const res = await updateUser({
                ...this.form,
                id: this.id
              })
              if (res.success) {
                this.$message.closeAll()
                this.$message.success('修改成功')
                this.visible = false
                this.$emit('success')
              }
            } else {
              const res = await createUser(this.form)
              if (res.success) {
                this.$message.closeAll()
                this.$message.success('添加成功')
                this.visible = false
                this.$emit('success')
              }
            }
          } catch (err) {
            console.log(err)
          } finally {
            this.submiting = false
          }
        }
      })
    },
    onClose() {
      this.visible = false
      this.id = null
      this.form = {
        avatar: '',
        userName: '',
        fullName: '',
        password: '',
        enable: true
      }
      this.$refs.form.clearValidate()
    }
  }
}
</script>

<style lang="scss" scoped>
  .form {
    width: 500px;
    margin: 0 auto;
  }
</style>
