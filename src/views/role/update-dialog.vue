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
      <el-form-item label="角色名: " prop="name">
        <el-input v-model="form.name" placeholder="请输入角色名" />
      </el-form-item>
      <el-form-item label="角色描述: " prop="description">
        <el-input v-model="form.description" placeholder="请输入角色描述" />
      </el-form-item>
      <el-form-item label="可用权限：" prop="remark">
				<el-tree
          ref="tree"
          :data="totalResources"
          show-checkbox
          :default-checked-keys="checkedKeys"
          node-key="id"
          :props="{
            children: 'children',
            label: 'name'
          }">
        </el-tree>
			</el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close" size="small">取 消</el-button>
      <el-button type="primary" size="small" @click="onSubmit" :loading="submiting">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { saveRole } from './service'
export default {
  props: {
    totalResources: {
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
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      },
      checkedKeys: []
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
            description: row.description
          }
        })
        // 去除掉目录类型（checkedKeys只需要叶子节点id集合）
        this.checkedKeys = row.resources.filter(item => item.type === '2').map(v => v.id)
      }
    },
    close() {
      if (this.submiting && this.cancel) {
        this.cancel()
      }
      this.visible = false
      this.form.id = ''
      this.checkedKeys = []
      this.$refs.form.resetFields()
    },
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          try {
            const checkedNodes = this.$refs.tree.getCheckedNodes(false, false)
            const checkedNodeKeys = checkedNodes.map(item => item.id)
            const halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys()
            const params = {
              ...this.form,
              resources: halfCheckedKeys.concat(checkedNodeKeys)
            }
            await saveRole(
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
