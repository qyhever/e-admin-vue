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
      <el-form-item label="权限名: " prop="name">
        <el-input v-model="params.name" placeholder="请输入权限名" />
      </el-form-item>
      <el-form-item label="权限编码: " prop="code">
        <el-input v-model="params.code" placeholder="请输入权限编码" />
      </el-form-item>
      <el-form-item label="父级菜单: " prop="parentId">
        <el-select v-model="params.parentId" style="width: 100%">
          <el-option label="无" value=""></el-option>
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
export default {
  data() {
    return {
      submiting: false,
      visible: false,
      title: '添加',
      id: null,
      form: {
        name: '',
        code: '',
        parentId: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入权限名', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入权限名', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    open(row) {
      console.log(row)
      this.visible = true
      if (row) {
        this.form = {
          name: row.name,
          code: row.code,
          parentId: row.parentId
        }
      }
    },
    onSubmit() {
      this.$refs.form.validate(async valid => {
        console.log(valid)
      })
    },
    onClose() {
      this.visible = false
      this.id = null
      this.form = {
        name: '',
        code: '',
        parentId: ''
      }
      this.$refs.form.clearValidate()
    }
  }
}
</script>
