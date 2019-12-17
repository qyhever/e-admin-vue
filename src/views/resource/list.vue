<template>
  <div>
    <el-form class="com-form media-form" label-width="80px" size="small">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="权限名">
            <el-input v-model="params.name" placeholder="请输入权限名" clearable @clear="changeQuery" @keyup.enter.native="changeQuery" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="权限编码">
            <el-input v-model="params.code" placeholder="请输入权限名" clearable @clear="changeQuery" @keyup.enter.native="changeQuery" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="类型">
            <el-select v-model="params.type" style="width: 100%">
              <el-option label="全部" value="" />
              <el-option label="目录" value="1" />
              <el-option label="资源" value="2" />
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
    <el-table
      class="com-table"
      :data="list"
      v-loading="querying"
      @sort-change="handleSortChange">
			<el-table-column align="center" prop="name" label="权限名" />
			<el-table-column align="center" prop="code" label="权限编码" sortable="custom" />
			<el-table-column align="center" label="类型">
        <template slot-scope="{row}">
          <span>{{row.type === '1' ? '目录' : '资源'}}</span>
        </template>
			</el-table-column>
      <el-table-column align="center" label="启用状态">
        <template slot-scope="{row}">
          <el-switch :value="row.enable" @change="handleToggleEnable(row)" />
        </template>
      </el-table-column>
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
					<el-button type="text" @click="handleEdit(row)">
            编辑
          </el-button>
          <el-button type="text" @click="handleDelete(row)">
            删除
          </el-button>
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
import { getResources, patchResource, deleteResource } from '@/api/resource'
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
        name: '',
        code: '',
        type: ''
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
        const data = await getResources(this.params)
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
    async handleToggleEnable(row) {
      try {
        await patchResource({
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
