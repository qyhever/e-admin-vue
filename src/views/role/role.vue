<template>
  <div>
    <el-form class="com-form" label-width="80px" size="small">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="角色名">
            <el-input v-model="params.name" placeholder="请输入角色名" clearable @clear="changeQuery" @keyup.enter.native="changeQuery" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="" label-width="0px">
            <el-button type="primary" :loading="querying" @click="changeQuery">查询</el-button>
            <el-button type="primary" @click="handleCreate">添加</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table class="com-table" :data="list" v-loading="querying" @sort-change="handleSortChange">
      <el-table-column align="center" prop="name" label="角色名" />
      <el-table-column align="center" prop="description" label="角色描述" />
      <el-table-column align="center" label="添加时间" prop="createdAt" sortable="custom">
        <template slot-scope="{row}">
          {{row.createdAt | formatDateTime}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="修改时间" prop="updatedAt" sortable="custom">
        <template slot-scope="{row}">
          {{row.updatedAt | formatDateTime}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="{row}">
          <template v-if="row.name === '超级管理员'">
            -
          </template>
          <template v-else>
            <el-button type="text" @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button type="text" @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-if="total" class="com-pagination" small background @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="params.page" :page-size="params.size" :page-sizes="pageSizes" :layout="paginationLayout" :total="total">
    </el-pagination>
    <edit ref="dialog" @success="query" />
  </div>
</template>

<script>
  import {
    getRoles,
    deleteRole
  } from '@/api/role'
  import {
    pagination
  } from '@/mixins'
  import Edit from './components/edit'
  export default {
    mixins: [pagination],
    components: {
      Edit
    },
    data() {
      return {
        querying: false,
        list: [],
        total: 0,
        params: {
          page: 1,
          size: 10,
          name: ''
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
          const res = await getRoles(this.params)
          if (res.success) {
            const data = res.data || {}
            const list = data.list || []
            const total = data.total || 0
            this.list = list
            this.total = total
          }
        } catch (err) {
          console.log(err)
        } finally {
          this.querying = false
        }
      },
      handleSortChange(sort) {
        this.params.page = 1
        this.params.size = 10
        if (sort.prop && sort.order) {
          this.params.sortProp = sort.prop
          this.params.sortOrder = sort.order === 'ascending' ? 1 : -1
        } else {
          this.params.sortProp = null
          this.params.sortOrder = null
        }
        this.query()
      },
      handleCreate() {
        this.$refs.dialog.open()
      },
      handleEdit(row) {
        this.$refs.dialog.open(row)
      },
      handleDelete(row) {
        this.$confirm('确定要删除吗？', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          try {
            const res = await deleteRole({
              id: row.id
            })
            if (res.success) {
              this.$message.closeAll()
              this.$message.success('删除成功')
              this.query()
            }
          } catch (err) {
            console.log(err)
          }
        })
      }
    }
  }

</script>

<style lang="scss" scoped>
  .com-form {
    flex: 0 0 auto;

    .el-row {
      flex-wrap: wrap;
    }
  }

  @media screen and (max-width: 1500px) {
    .com-form {
      /deep/ .el-col {
        width: 33.33%;
      }
    }
  }

  @media screen and (max-width: 1180px) {
    .com-form {
      /deep/ .el-col {
        width: 50%;
      }
    }
  }

</style>
