<template>
  <el-dialog
    :title="title"
    :visible="visible"
    width="600px"
    @close="close"
    :close-on-click-modal="$dialogModalClose"
    :close-on-press-escape="$dialogEscClose"
  >
    <el-form
      ref="form"
      class="form"
      label-width="96px"
      :model="form"
      :rules="rules"
      size="small"
    >
      <el-form-item label="头像: " prop="avatar">
        <ComUploadSingleImage v-model="form.avatar"></ComUploadSingleImage>
      </el-form-item>
      <el-form-item label="账户名: " prop="userName">
        <el-input v-model="form.userName" placeholder="请输入账户名" />
      </el-form-item>
      <el-form-item label="真实姓名: " prop="fullName">
        <el-input v-model="form.fullName" placeholder="请输入真实姓名" />
      </el-form-item>
      <el-form-item v-if="!form.id" label="密码: " prop="password">
        <el-input type="password" v-model="form.password" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item label="状态: " prop="enable">
        <el-radio-group v-model="form.enable">
          <el-radio-button :label="true">启用</el-radio-button>
          <el-radio-button :label="false">禁用</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="角色: " prop="role">
        <el-select v-model="form.role" multiple style="width: 100%">
            <el-option
              v-for="item in totalRoles"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close" size="small">取 消</el-button>
      <el-button type="primary" size="small" @click="onSubmit" :loading="submiting">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import md5 from 'md5'
import { saveUser } from './service'
export default {
  props: {
    totalRoles: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      submiting: false,
      visible: false,
      title: '',
      form: {
        id: '',
        avatar: '',
        userName: '',
        fullName: '',
        password: '',
        enable: true,
        role: []
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
      this.visible = true
      this.title = row ? '编辑' : '添加'
      if (row) {
        this.$nextTick(() => {
          this.form = {
            id: row.id,
            avatar: row.avatar,
            userName: row.userName,
            fullName: row.fullName,
            enable: row.enable,
            role: row.roles.map(item => item.id)
          }
        })
      }
    },
    close() {
      if (this.submiting && this.cancel) {
        this.cancel()
      }
      this.visible = false
      this.form.id = ''
      this.$refs.form.resetFields()
    },
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          try {
            const params = Object.assign({}, this.form)
            if (!this.form.id) {
              params.password = md5(md5(params.password))
            }
            await saveUser(
              params,
              loading => (this.submiting = loading),
              cancel => this.cancel = cancel
            )
            this.$message.closeAll()
            this.$message.success(this.form.id ? '修改成功' : '添加成功')
            this.visible = false
            this.$emit(this.form.id ? 'updateSuccess' : 'createSuccess')
          } catch (err) {
            console.log(err)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .form {
    margin-right: 20px;
  }
</style>
