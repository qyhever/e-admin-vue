<template>
  <div>
    <div v-for="(item, index) in menus" :key="index">
      <template v-if="!item.hidden">
        <el-submenu v-if="item.children && item.children.length" :index="item.path" :popper-append-to-body="false">
          <template slot="title">
            <ComSvgIcon class="menu-item__icon" v-if="item.icon" :name="item.icon"/>
            <span>{{item.title}}</span>
          </template>
          <MenuItem :menus="item.children"/>
        </el-submenu>
        <router-link v-else :to="item.path" class="menu-item__link">
          <el-menu-item :index="item.path" class="menu-item--nodropdown">
            <ComSvgIcon class="menu-item__icon" v-if="item.icon" :name="item.icon"/>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </router-link>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MenuItem',
    props: {
      menus: {
        type: Array,
        default: () => []
      }
    }
  }
</script>
