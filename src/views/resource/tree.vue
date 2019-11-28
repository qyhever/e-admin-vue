<template>
  <div>
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
        <el-dropdown trigger="click" size="small" placement="bottom-start">
          <span>
            <el-button
              type="text"
              size="mini"
              icon="el-icon-more"/>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus">添加子节点</el-dropdown-item>
            <el-dropdown-item icon="el-icon-edit-outline">修改名称</el-dropdown-item>
            <el-dropdown-item icon="el-icon-delete">删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
    </el-tree>
  </div>
</template>

<script>
import { getTotalResources } from '@/api/resource'
import { listToTree } from '@/utils'
export default {
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
        const res = await getTotalResources()
        if (res.success) {
          const list = res.data || []
          const result = listToTree(list, null, 'code', 'parentCode')
          const expandedKeys = result.map(item => item.code)
          this.list = result
          this.expandedKeys = expandedKeys
        }
      } catch (err) {
        console.log(err)
      } finally {
        this.querying = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tree {
  width: 500px;
  /deep/ .el-icon-more {
    margin-left: 4px;
    transform: rotate(90deg);
    color: #898989;
  }
}
</style>

