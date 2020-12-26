<template>
  <ComPage class="page">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6" v-for="(item, index) in infoCardList" :key="index">
        <div class="container">
          <div class="icon">
            <ComSvgIcon :name="item.icon"></ComSvgIcon>
          </div>
          <div class="content">
            <p class="title">{{item.title}}</p>
            <p class="value">
              <CountTo :end="item.value" useGroup></CountTo>
            </p>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="line">
      <LineChart></LineChart>
    </div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <div class="chart-wrapper">
          <ColmunChart></ColmunChart>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <div class="chart-wrapper">
          <PieChart></PieChart>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <div class="table-wrapper">
          <el-table
            :data="userList"
          >
            <el-table-column
              align="center"
              prop="avatar"
              label="Avatar"
              width="180">
              <template slot-scope="{row}">
                <el-image class="avatar" :src="row.avatar" :preview-src-list="urlList"></el-image>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="name"
              label="Name">
            </el-table-column>
            <el-table-column
              align="center"
              prop="location"
              label="Location">
            </el-table-column>
            <el-table-column
              align="center"
              prop="date"
              label="Date">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <div class="table-wrapper">
          <el-table
            :data="orderList"
          >
            <el-table-column
              align="center"
              prop="orderId"
              label="ID"
              width="180"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              align="center"
              prop="price"
              label="Price">
              <template slot-scope="{row}">
                <span>￥{{row.price | formatCurrency}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="Status">
              <template slot-scope="{$index}">
                <el-tag v-if="$index % 2 === 0" type="success">success</el-tag>
                <el-tag v-else type="danger">fail</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="operation"
              label="Operation">
              <template slot-scope="{row}">
                <el-tooltip effect="dark" content="点击复制" placement="top">
                  <el-button icon="el-icon-copy-document" @click="onCopy(row, $event)"></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </ComPage>
</template>

<script>
import CountTo from '@/components/count-to'
import LineChart from './components/line'
import ColmunChart from './components/colmun'
import PieChart from './components/pie'
import { genGuid, copy } from '@/utils'
const infoCardList = [
  {
    icon: 'circle',
    title: '在线评论',
    value: 2789
  },
  {
    icon: 'team',
    title: '新客户',
    value: 2534
  },
  {
    icon: 'message',
    title: '活跃项目',
    value: 1273
  },
  {
    icon: 'cart',
    title: '推荐',
    value: 284
  }
]
const userList = [
  {
    name: 'Louis Hansen',
    location: 'USA',
    date: '2020-08-08'
  },
  {
    name: 'Craig Hause',
    location: 'Canada',
    date: '2020-07-29'
  },
  {
    name: 'Edward Grimes',
    location: 'Brazil',
    date: '2020-07-22'
  },
  {
    name: 'Bret Weaver',
    location: 'USA',
    date: '2020-07-20'
  },
  {
    name: 'Mark',
    location: 'India',
    date: '2020-06-09'
  },
  {
    name: 'Michael Thompson',
    location: 'UK',
    date: '2020-07-07'
  },
  {
    name: 'Susan Young',
    location: 'Belgium',
    date: '2020-05-08'
  },
  {
    name: 'Eric White',
    location: 'Sweden',
    date: '2020-10-08'
  }
].map((item, index) => {
  return Object.assign({}, item, {
    avatar: require('@/assets/images/users/' + (index + 1) + '.webp')
  })
})
const orderList = Array(8).fill(null).map(() => {
  return {
    orderId: genGuid(),
    price: parseInt(Math.random() * 10000 + 1000, 10)
  }
})
export default {
  name: 'Dashboard',
  components: {
    CountTo,
    LineChart,
    ColmunChart,
    PieChart
  },
  data() {
    return {
      userList,
      orderList,
      infoCardList
    }
  },
  computed: {
    urlList() {
      return userList.map(v => v.avatar)
    }
  },
  methods: {
    onCopy(row, e) {
      copy(row.orderId, e)
      this.$message.closeAll()
      this.$message.success('复制成功')
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin shadow {
  transition: box-shadow .4s;
  &:hover {
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
  }
}
.page {
  ::v-deep .page-container {
    padding: 0;
    background-color: transparent;
  }
}
::v-deep .el-col {
  // height: 170px;
  // background-color: #fff;
  margin-bottom: 20px;
}
.container {
  display: flex;
  align-items: center;
  height: 170px;
  padding: 20px 20px 20px 36px;
  background-color: #fff;
  cursor: pointer;
  @include shadow;
  .icon {
    display: flex;
    font-size: 54px;
    flex: 0 0 80px;
    ::v-deep {
      .circle {
        color: rgb(100, 234, 145);
      }
      .team {
        color: rgb(143, 201, 251);
      }
      .message {
        color: rgb(216, 151, 235);
      }
      .cart {
        color: rgb(246, 152, 153);
      }
    }
  }
  .content {
    flex: auto;
  }
  .title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, .45);;
    font-size: 16px;
  }
  .value {
    color: $color-text-regular;
    font-size: 24px;
  }
}
.line {
  @include shadow;
  height: 400px;
  margin-bottom: 20px;
  background-color: #fff;
}
.chart-wrapper {
  @include shadow;
  height: 400px;
  background-color: #fff;
}
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
</style>
