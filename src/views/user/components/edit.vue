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
      <el-form-item label="角色名: " prop="name">
        <el-input v-model="form.name" placeholder="请输入角色名" />
      </el-form-item>
      <el-form-item label="角色描述: " prop="description">
        <el-input v-model="form.description" placeholder="请输入角色描述" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
			<el-button @click="onClose" size="small">取 消</el-button>
			<el-button type="primary" size="small" @click="onSubmit" :loading="submiting">确 定</el-button>
		</div>
  </el-dialog>
</template>

<script>
import { createRole, updateRole } from '@/api/role'
export default {
  data() {
    return {
      submiting: false,
      visible: false,
      title: '添加',
      id: null,
      form: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入权限名', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入权限名', trigger: 'blur' }
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
          name: row.name,
          description: row.description
        }
      }
    },
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          try {
            this.submiting = true
            if (this.id) {
              const res = await updateRole({
                ...this.form,
                id: this.id
              })
              if (res.success) {
                console.log(res)
                this.$message.closeAll()
                this.$message.success('修改成功')
                this.visible = false
                this.$emit('success')
              }
            } else {
              const res = await createRole(this.form)
              if (res.success) {
                console.log(res)
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
        name: '',
        description: ''
      }
      this.$refs.form.clearValidate()
    }
  }
}
</script>
