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
      class="form"
      ref="form"
      label-width="96px"
      :model="form"
      :rules="rules"
      size="small"
      v-loading="querying">
      <el-form-item label="角色名: " prop="name">
        <el-input v-model="form.name" placeholder="请输入角色名" />
      </el-form-item>
      <el-form-item label="角色描述: " prop="description">
        <el-input v-model="form.description" placeholder="请输入角色描述" />
      </el-form-item>
      <el-form-item label="可用权限：" prop="remark">
				<el-tree
          ref="tree"
          :data="resourceList"
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
			<el-button @click="onClose" size="small">取 消</el-button>
			<el-button type="primary" size="small" @click="onSubmit" :loading="submiting">确 定</el-button>
		</div>
  </el-dialog>
</template>

<script>
import { createRole, updateRole } from '@/api/role'
import { getTotalResources } from '@/api/resource'
import { listToTree } from '@/utils'
export default {
  data() {
    return {
      visible: false,
      submiting: false,
      querying: false,
      title: '添加',
      id: null,
      form: {
        name: '',
        description: ''
      },
      resourceList: [],
      checkedKeys: [],
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
      this.visible = true
      this.title = row ? '编辑' : '添加'
      this.query()
      if (row) {
        this.id = row.id
        this.$nextTick(() => {
          this.form = {
            name: row.name,
            description: row.description
          }
        })
        this.checkedKeys = row.resources.filter(item => item.type === '2').map(v => v.id)
      }
    },
    async query() {
      try {
        this.querying = true
        const res = await getTotalResources()
        if (res.success) {
          const list = res.data || []
          const result = listToTree(list, null, 'code', 'parentCode')
          this.resourceList = result
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
            let res = {}
            const checkedNodes = this.$refs.tree.getCheckedNodes(false, false)
            const checkedNodeKeys = checkedNodes.map(item => item.id)
            const halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys()
            if (this.id) {
              res = await updateRole({
                ...this.form,
                id: this.id,
                resources: halfCheckedKeys.concat(checkedNodeKeys)
              })
            } else {
              res = await createRole({
                ...this.form,
                resources: halfCheckedKeys.concat(checkedNodeKeys)
              })
            }
            if (res.success) {
              this.$message.closeAll()
              this.$message.success(this.id ? '修改成功' : '添加成功')
              this.visible = false
              this.$emit('success')
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
      this.$refs.form.resetFields()
      this.resourceList = []
      this.checkedKeys = []
    }
  }
}
</script>
