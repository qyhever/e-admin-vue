<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in list" :key="item.path">
        <!-- last item not required click -->
        <span v-if="index === list.length - 1">{{item.name}}</span>
        <router-link v-else :to="item.path">{{item.name}}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
// 每次添加路由都需要配置对应的面包屑
const breadcumbs = {
  '/': '首页',
  '/dashboard': '仪表盘',
  '/components': '组件',
  '/components/clipboard': '复制',
  '/components/qrcode': '二维码',
  '/user': '账号管理',
  '/user/index': '账号列表',
  '/role': '角色管理',
  '/role/index': '角色列表',
  '/resource': '权限管理',
  '/resource/index': '权限列表',
  '/admin': 'admin页面',
  '/dev': 'dev页面',
  '/guest': 'guest页面',
  '/test': 'test页面',
  '/operation': 'operation页面'
}
function getBreadcrumbs(breads, path) {
  const matches = []
  path
      // Remove trailing slash "/" from path
      .replace(/\/$/, '')
      // Split pathname into sections
      .split('/')
      // Reduce over the sections and breads map for each section.
      .reduce((previousSection, currentSection) => {
        // Combine the last route section with the currentSection.
        // For example, `pathname = /1/2/3` results in match checks for
        // `/1`, `/1/2`, `/1/2/3`.
        const pathSection = !currentSection ? '/' : `${previousSection}/${currentSection}`
        const breadcrumbName = breads[pathSection]
        // filter '首页'('/')
        if (currentSection && breadcrumbName) {
          matches.push({
            path: pathSection,
            name: breadcrumbName
          })
        }
        return pathSection === '/' ? '' : pathSection
      })
  return matches
}
export default {
  name: 'breadcrumb',
  data() {
    return {
      list: []
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(newRoute) {
        this.list = getBreadcrumbs(breadcumbs, newRoute.path)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .breadcrumb {
    position: relative;
    height: 40px;
    padding: 12px;
    &:after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 1px;
      background-color: #d8dce5;
    }
  }
  /* breadcrumb transition */
	.breadcrumb-enter-active,
	.breadcrumb-leave-active {
		transition: all 0.5s;
	}

	.breadcrumb-enter,
	.breadcrumb-leave-active {
		opacity: 0;
		transform: translateX(20px);
	}

	.breadcrumb-move {
		transition: all 0.5s;
	}

	.breadcrumb-leave-active {
		position: absolute;
	}
</style>
