<template>
  <div v-loading="querying">
    <el-tree
      ref="tree"
      class="tree"
      :data="list"
      node-key="code"
      :default-expanded-keys="expandedKeys"
      :expand-on-click-node="false"
      :props="props">
      <span class="custom-tree-node el-tree-node__label" slot-scope="{ data }">
        <span>{{ data.name }}</span>
        <el-dropdown
          trigger="click"
          size="small"
          placement="bottom-start"
          @command="command => handleOperation(command, data)">
          <span>
            <el-button
              type="text"
              size="mini"
              icon="el-icon-more"/>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="add" icon="el-icon-plus">添加子节点</el-dropdown-item>
            <el-dropdown-item command="update" icon="el-icon-edit-outline">修改名称</el-dropdown-item>
            <el-dropdown-item command="delete" icon="el-icon-delete">删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
    </el-tree>
    <edit ref="edit" @success="query" />
    <edit-resource-name ref="editResourceName" @success="query" />
  </div>
</template>

<script>
import { getTotalResources, deleteResource } from '@/api/resource'
import { listToTree } from '@/utils'
import Edit from './components/edit'
import EditResourceName from './components/edit-resource-name'
export default {
  components: {
    Edit,
    EditResourceName
  },
  data() {
    return {
      querying: false,
      list: [],
      expandedKeys: [],
      props: {
        children: 'children',
        label: 'name'
      }
    }
  },
  mounted() {
    this.query()
  },
  methods: {
    async query() {
      try {
        this.querying = true
        const list = await getTotalResources()
        const result = listToTree(list, null, 'code', 'parentCode')
        const expandedKeys = result.map(item => item.code)
        this.list = result
        this.expandedKeys = expandedKeys
      } catch (err) {
        console.log(err)
      } finally {
        this.querying = false
      }
    },
    handleOperation(command, data) {
      if (command === 'add') {
        this.$refs.edit.open(data, 'treeAdd')
      } else if (command === 'delete') {
        this.handleDelete(data)
      } else {
        this.$refs.editResourceName.open(data)
      }
    },
    handleDelete(row) {
      const msg = row.type === '2' ? '确定要删除吗？' : '该资源为目录权限，删除该目录会删除下面全部子权限，是否确定删除？' 
      this.$confirm(msg, '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await deleteResource({
            id: row.id,
            type: row.type === '2' ? 'resource' : 'dir'
          })
          this.query()
          this.$message.closeAll()
          this.$message.success('删除成功')
        } catch (err) {
          console.log(err)
        } finally {
          // ...
        }
      }).catch(console.log)
    }
  }
}
</script>

<style lang="scss" scoped>
.tree {
  width: 500px;
  min-height: 300px;
  /deep/ .el-icon-more {
    margin-left: 4px;
    transform: rotate(90deg);
    color: #898989;
  }
}
</style>

