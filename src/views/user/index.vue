<template>
  <ComPage>
    <div v-loading="querying">
      <el-form label-width="80px" size="small">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="用户名">
              <el-input
                v-model="params.userName"
                placeholder="请输入用户名"
                clearable
                @clear="changeQuery"
                @keyup.enter.native="changeQuery"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="真实姓名">
              <el-input
                v-model="params.fullName"
                placeholder="请输入真实姓名"
                clearable
                @clear="changeQuery"
                @keyup.enter.native="changeQuery"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="启用状态">
              <el-select v-model="params.enable" style="width: 100%" @change="changeQuery">
                <el-option label="全部" value="" />
                <el-option label="启用" :value="1" />
                <el-option label="禁用" :value="0" />
              </el-select>
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
      <el-table :data="list">
        <el-table-column align="center" label="头像">
          <template slot-scope="{row}">
            <el-avatar class="avatar" :size="32" :src="row.avatar" @error="$imageErrorHandler">
              <img src="@/assets/images/default.png">
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="userName" label="用户名" />
        <el-table-column align="center" prop="fullName" label="真实姓名" />
        <el-table-column align="center" label="角色">
          <template slot-scope="{row}">
            <span v-if="row.roles && row.roles.length">
              <span v-for="item in row.roles" :key="item.id">{{item.name}}<br></span>
            </span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="启用状态">
          <template slot-scope="{row}">
            <span v-if="row.userName === 'admin'">-</span>
            <el-switch v-else :value="row.enable" @change="handleToggleEnable(row)" />
          </template>
        </el-table-column>
        <el-table-column align="center" label="添加时间">
          <template slot-scope="{row}">
            {{row.createdAt | formatDateTime}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="修改时间">
          <template slot-scope="{row}">
            {{row.updatedAt | formatDateTime}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="{row}">
            <template v-if="row.userName === 'admin'">
              <span>-</span>
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
        :totalRoles="totalRoles"
        @createSuccess="changeQuery"
        @updateSuccess="query"
      />
    </div>
  </ComPage>
</template>

<script>
import { pagination } from '@/mixins'
import { getUsers, patchUser, deleteUser } from './service'
import { getTotalRoles } from '@/api/global'
import UpdateDialog from './update-dialog'
export default {
  name: 'User',
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
        userName: '',
        fullName: '',
        enable: ''
      },
      totalRoles: []
    }
  },
  mounted() {
    this.query()
    this.queryTotalRoles()
  },
  methods: {
    async query() {
      try {
        const res = await getUsers(
          this.params,
          loading => (this.querying = loading)
        )
        this.list = res.list || []
        this.total = res.total || 0
      } catch (err) {
        console.log(err)
      }
    },
    async queryTotalRoles() {
      try {
        const list = await getTotalRoles()
        this.totalRoles = list || []
      } catch (err) {
        console.log(err)
      }
    },
    async handleToggleEnable(row) {
      try {
        await patchUser(
          {
            id: row.id,
            enable: !row.enable
          },
          loading => this.querying = loading
        )
        this.list = this.list.map(item => {
          if (item.id === row.id) {
            return {
              ...item,
              enable: !item.enable
            }
          }
          return item
        })
        this.$message.closeAll()
        this.$message.success('操作成功')
      } catch (err) {
        console.log(err)
      }
    },
    async handleDelete(row) {
      this.$confirm('确定要删除吗？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await deleteUser(
            {
              id: row.id
            },
            loading => this.querying = loading
          )
          this.query()
          this.$message.closeAll()
          this.$message.success('删除成功')
        } catch (err) {
          console.log(err)
        }
      })
    }
  }
}
</script>
