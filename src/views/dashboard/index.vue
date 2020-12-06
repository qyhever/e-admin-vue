<template>
  <ComPage class="page">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
        <div class="container">
          <div class="icon">
            <ComSvgIcon name="circle"></ComSvgIcon>
          </div>
          <div class="content">
            <p class="title">在线评论</p>
            <p class="value">
              <CountTo :end="2789" useGroup></CountTo>
            </p>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
        <div class="container">
          <div class="icon">
            <ComSvgIcon name="team"></ComSvgIcon>
          </div>
          <div class="content">
            <p class="title">新客户</p>
            <p class="value">
              <CountTo :end="2534" useGroup></CountTo>
            </p>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
        <div class="container">
          <div class="icon">
            <ComSvgIcon name="message"></ComSvgIcon>
          </div>
          <div class="content">
            <p class="title">活跃项目</p>
            <p class="value">
              <CountTo :end="1273" useGroup></CountTo>
            </p>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
        <div class="container">
          <div class="icon">
            <ComSvgIcon name="cart"></ComSvgIcon>
          </div>
          <div class="content">
            <p class="title">推荐</p>
            <p class="value">
              <CountTo :end="284" useGroup></CountTo>
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
  </ComPage>
</template>

<script>
import CountTo from '@/components/count-to'
import LineChart from './components/line'
import ColmunChart from './components/colmun'
import PieChart from './components/pie'
export default {
  name: 'Dashboard',
  components: {
    CountTo,
    LineChart,
    ColmunChart,
    PieChart
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
</style>
