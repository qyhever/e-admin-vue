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
        this.list = getBreadcrumbs(this.$store.getters.bread, newRoute.path)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .breadcrumb {
    position: relative;
    height: $bread-height;
    line-height: 15px;
    padding: 20px 20px 0;
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
