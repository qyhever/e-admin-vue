<template>
  <div class="com-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="树状查看" name="tree">
        <tab-tree />
      </el-tab-pane>
      <el-tab-pane label="列表查看" name="list">
        <tab-list />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TabTree from './tab-tree'
import TabList from './tab-list'
export default {
  components: {
    TabTree,
    TabList
  },
  data() {
    return {
      activeName: 'tree'
    }
  },
  methods: {
    handleClick() {
      // ....
    }
  }
}
</script>

<style scoped>
  .com-container >>> .el-tabs__content {
    overflow: initial;
  }
</style>

