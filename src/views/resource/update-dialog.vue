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
            v-for="item in totalDirs"
            :key="item.id"
            :label="item.name"
            :value="item.code"
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
import { saveResource } from './service'
export default {
  props: {
    totalDirs: {
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
          { required: true, message: '请输入权限编码', trigger: 'blur' }
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
            name: row.name,
            code: row.code,
            type: row.type,
            parentCode: row.parentCode
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
            await saveResource(
              this.form,
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
