<template>
  <ComPage>
    <div v-loading="querying">
      <el-form label-width="80px" size="small">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="角色名">
              <el-input
                v-model="params.name"
                placeholder="请输入角色名"
                clearable
                @clear="changeQuery"
                @keyup.enter.native="changeQuery"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="" label-width="0px">
              <el-button type="primary" @click="changeQuery">查询</el-button>
              <el-button type="primary" @click="$refs.updateDialog.open()">添加</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table
        :data="list"
        @sort-change="handleSortChange"
      >
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
              <el-button type="text" @click="$refs.updateDialog.open(row)">
                编辑
              </el-button>
              <el-button type="text" @click="handleDelete(row)">
                删除
              </el-button>
            </template>
          </template>
        </el-table-column>
        <ComEmpty slot="empty"></ComEmpty>
      </el-table>
      <el-pagination
        v-if="total"
        class="com-pagination"
        small
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.page"
        :page-size="params.size"
        :page-sizes="$pageSizes"
        :layout="$paginationLayout"
        :total="total">
      </el-pagination>
      <UpdateDialog
        ref="updateDialog"
        :totalResources="totalResources"
        @createSuccess="changeQuery"
        @updateSuccess="query"
      />
    </div>
  </ComPage>
</template>

<script>
import { pagination } from '@/mixins'
import { getRoles, deleteRole } from './service'
import { getTotalResources } from '@/api/global'
import UpdateDialog from './update-dialog'
import { listToTree } from '@/utils'
export default {
  name: 'Role',
  components: {
    UpdateDialog
  },
  mixins: [pagination],
  data() {
    return {
      querying: false,
      list: [],
      total: 0,
      params: {
        name: ''
      },
      totalResources: []
    }
  },
  mounted() {
    this.query()
    this.queryTotalResources()
  },
  methods: {
    async query() {
      try {
        const res = await getRoles(
          this.params,
          loading => (this.querying = loading)
        )
        this.list = res.list || []
        this.total = res.total || 0
      } catch (err) {
        console.log(err)
      }
    },
    async queryTotalResources() {
      try {
        const list = await getTotalResources()
        this.totalResources = listToTree(list, null, 'code', 'parentCode')
      } catch (err) {
        console.log(err)
      }
    },
    handleDelete(row) {
      this.$confirm('确定要删除吗？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await deleteRole(
            {
              id: row.id
            },
            loading => (this.querying = loading)
          )
          this.$message.closeAll()
          this.$message.success('删除成功')
          this.query()
        } catch (err) {
          console.log(err)
        }
      })
    }
  }
}
</script>
