<template>
  <div class="analysis">
    <el-tooltip content="返回" placement="bottom">
      <el-row class="back" type="flex" align="middle" justify="center" @click.native="onBack">
        <i class="el-icon-back"></i>
      </el-row>
    </el-tooltip>
    <div id="mapContainer" class="map-container"></div>
  </div>
</template>

<script>
import asyncLoadScript from '@/utils/async-script'
const src = 'https://webapi.amap.com/maps?v=1.4.7&key=9ace730e33248ef1f462160f85445847&plugin=AMap.CitySearch,AMap.Autocomplete,AMap.PlaceSearch,AMap.Geocoder'
export default {
  name: 'Analysis',
  mounted() {
    asyncLoadScript(src, window.AMap, (err) => {
      if (err) {
        return this.$message.warning('加载地图失败')
      }
      this.initMap()
    })
  },
  methods: {
    initMap() {
      this.map = new window.AMap.Map('mapContainer', {
        zoom: 12
      })
    },
    onBack() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
  .analysis {
    position: relative;
    height: 100vh;
    .back {
      z-index: 9;
      position: absolute;
      top: 10px;
      left: 10px;
      width: 40px;
      height: 24px;
      cursor: pointer;
    }
    .el-icon-back {
      font-size: 20px;
    }
  }
  .map-container {
    height: 100vh;
  }
</style>
