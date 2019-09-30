<template>
  <div>
    <el-form class="com-form" label-width="80px" size="small">
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
              <el-option label="目录" value="dir" />
              <el-option label="资源" value="resource" />
            </el-select>
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
    <el-table class="com-table" :data="list" v-loading="querying">
			<el-table-column align="center" prop="name" label="权限名" />
			<el-table-column align="center" prop="code" label="权限编码" />
			<el-table-column align="center" label="类型">
        <template slot-scope="{row}">
          <span>{{row.parentId ? '目录' : '资源'}}</span>
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
    <edit ref="dialog" />
  </div>
</template>

<script>
import { getResources } from '@/api/resource'
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
        const res = await getResources(this.params)
        console.log(res)
        if (res.success) {
          const list = res.list || []
          const total = res.total || 0
          this.list = list
          this.total = total
        }
      } catch (err) {
        console.log(err)
      } finally {
        this.querying = false
      }
    },
    handleCreate() {
      // ...
    },
    handleEdit(row) {
      console.log(row)
    },
    handleDelete(row) {
      console.log(row)
      const msg = row.parentId ? '该资源为目录权限，删除该目录会删除下面全部子权限，是否确定删除？' : '确定要删除吗？'
      this.$confirm(msg, '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // ...
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
