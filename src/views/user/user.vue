<template>
  <div class="com-container">
    <el-form class="com-form media-form" label-width="80px" size="small">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="用户名">
            <el-input v-model="params.userName" placeholder="请输入用户名" clearable @clear="changeQuery" @keyup.enter.native="changeQuery" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="真实姓名">
            <el-input v-model="params.fullName" placeholder="请输入真实姓名" clearable @clear="changeQuery" @keyup.enter.native="changeQuery" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="启用状态">
            <el-select v-model="params.enable" style="width: 100%">
              <el-option label="全部" value="" />
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="" label-width="0px">
            <el-button type="primary" :disabled="querying" @click="changeQuery">查询</el-button>
            <el-button type="primary" @click="handleCreate">添加</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table class="com-table" :data="list" v-loading="querying">
			<el-table-column align="center" label="头像">
        <template slot-scope="{row}">
          <img class="avatar" v-if="row.avatar" :src="row.avatar" alt="加载失败">
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
    <el-pagination
      v-if="total"
			class="com-pagination"
			small
			background
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="params.page"
			:page-size="params.size"
			:page-sizes="pageSizes"
			:layout="paginationLayout"
			:total="total">
		</el-pagination>
    <edit ref="dialog" @success="query" />
  </div>
</template>

<script>
import { getUsers, patchUser, deleteUser } from '@/api/user'
import { pagination } from '@/mixins'
import Edit from './components/edit'
export default {
  mixins: [ pagination ],
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
        userName: '',
        fullName: '',
        enable: ''
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
        const data = await getUsers(this.params)
        const list = data.list || []
        const total = data.total || 0
        this.list = list
        this.total = total
      } catch (err) {
        console.log(err)
      } finally {
        this.querying = false
      }
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
          await deleteUser({
            id: row.id
          })
          this.query()
          this.$message.closeAll()
          this.$message.success('删除成功')
        } catch (err) {
          console.log(err)
        } finally {
          // ...
        }
      })
    },
    async handleToggleEnable(row) {
      try {
        await patchUser({
          id: row.id,
          enable: !row.enable
        })
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
      } finally {
        // ...
      }
    }
  }
}
</script>
