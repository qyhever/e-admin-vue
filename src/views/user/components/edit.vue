<template>
  <el-dialog
    :title="title"
    :visible="visible"
    width="600px"
    @close="onClose"
		:close-on-click-modal="dialogModalClose"
    :close-on-press-escape="dialogEscClose"
  >
    <el-form
      v-loading="querying"
      class="form"
      ref="form"
      label-width="96px"
      :model="form"
      :rules="rules"
      size="small">
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
      <el-form-item label="角色: " prop="role">
        <el-select v-model="form.role" multiple style="width: 100%">
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
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
import { getTotalRoles } from '@/api/role'
import md5 from 'md5'
export default {
  data() {
    return {
      submiting: false,
      querying: false,
      visible: false,
      title: '添加',
      id: null,
      roles: [],
      form: {
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
      this.query()
      if (row) {
        this.id = row.id
        this.$nextTick(() => {
          this.form = {
            avatar: row.avatar,
            userName: row.userName,
            fullName: row.fullName,
            enable: row.enable,
            role: row.roles.map(item => item.id)
          }
        })
      }
    },
    async query() {
      try {
        this.querying = true
        const list = await getTotalRoles()
        this.roles = list
      } catch (err) {
        console.log(err)
      } finally {
        this.querying = false
      }
    },
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          try {
            this.submiting = true
            if (this.id) {
              await updateUser({
                ...this.form,
                id: this.id
              })
            } else {
              const { password, ...params } = this.form
              await createUser({
                ...params,
                password: md5(md5(password))
              })
            }
            this.$message.closeAll()
            this.$message.success(this.id ? '修改成功' : '添加成功')
            this.visible = false
            this.$emit('success')
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
      this.$refs.form.resetFields()
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
