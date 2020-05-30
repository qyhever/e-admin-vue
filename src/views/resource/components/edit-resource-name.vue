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
      <el-form-item label="权限名: " prop="name">
        <el-input v-model="form.name" placeholder="请输入权限名" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
			<el-button @click="onClose" size="small">取 消</el-button>
			<el-button type="primary" size="small" @click="onSubmit" :loading="submiting">确 定</el-button>
		</div>
  </el-dialog>
</template>

<script>
import { updateResource } from '@/api/resource'
export default {
  data() {
    return {
      submiting: false,
      querying: false,
      visible: false,
      title: '修改权限名称',
      id: null,
      form: {
        name: '',
        code: '',
        type: '2',
        parentCode: null
      },
      rules: {
        name: [
          { required: true, message: '请输入权限名', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    open(row) {
      this.visible = true
      if (row) {
        this.id = row.id
        this.$nextTick(() => {
          this.form = {
            name: row.name,
            code: row.code,
            type: row.type,
            parentCode: row.parentCode
          }
        })
      }
    },
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          try {
            this.submiting = true
            await updateResource({
              ...this.form,
              id: this.id
            })
            this.$message.closeAll()
            this.$message.success('修改成功')
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
