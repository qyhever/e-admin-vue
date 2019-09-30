<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="树状查看" name="tree">
        <tree />
      </el-tab-pane>
      <el-tab-pane label="列表查看" name="list">
        <list />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Tree from './tree'
import List from './list'
export default {
  components: {
    Tree,
    List
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
