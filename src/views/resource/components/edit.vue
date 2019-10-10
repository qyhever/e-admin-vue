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
      <el-form-item label="权限编码: " prop="code">
        <el-input v-model="form.code" placeholder="请输入权限编码" />
      </el-form-item>
      <el-form-item label="权限类型: " prop="type">
        <el-radio-group v-model="form.type">
          <el-radio label="1">目录</el-radio>
          <el-radio label="2">资源</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="父级菜单: " prop="parentCode">
        <el-select v-model="form.parentCode" style="width: 100%">
          <el-option
            v-for="item in dirs"
            :key="item.id"
            :label="item.name"
            :value="item.code"
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
import { createResource, updateResource, getDirs } from '@/api/resource'
export default {
  data() {
    return {
      submiting: false,
      querying: false,
      visible: false,
      title: '添加',
      id: null,
      dirs: [],
      form: {
        name: '',
        code: '',
        type: '2',
        parentCode: null
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
      this.visible = true
      this.title = row ? '编辑' : '添加'
      this.query()
      if (row) {
        this.id = row.id
        this.form = {
          name: row.name,
          code: row.code,
          type: row.type,
          parentCode: row.parentCode
        }
      }
    },
    async query() {
      try {
        this.querying = true
        const res = await getDirs()
        console.log(res)
        if (res.success) {
          this.dirs = [
            {name: '无', code: null},
            ...res.data
          ]
        }
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
              const res = await updateResource({
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
              const res = await createResource(this.form)
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
        code: '',
        type: '2',
        parentCode: null
      }
      this.$refs.form.clearValidate()
    }
  }
}
</script>
