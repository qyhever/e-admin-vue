<template>
  <div class="header">
    <div class="menu-button-wrapper" @click="handleToggle">
      <svg-icon :icon-class="collapse ? 'menu-unfold' : 'menu-fold'" class="menu-button" />
    </div>
    <div class="header-right">
      <div class="user">
        <div class="user__text">
          <p>{{userInfo.userName}}</p>
          <p>{{roleNames}}</p>
        </div>
        <el-dropdown @command="handleDropdown">
          <div class="user-dropdown">
            <img v-if="userInfo.avatar" class="user-dropdown__avatar" :src="userInfo.avatar" alt="头像">
            <img v-else class="user-dropdown__avatar" src="@/assets/images/user.png" alt="头像">
            <i class="el-icon-caret-bottom user-dropdown__arrow"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">安全退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'headerbar',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['collapse', 'userInfo']),
    roleNames() {
      return this.userInfo.roleNames && this.userInfo.roleNames.join(',')
    }
  },
  methods: {
    handleToggle() {
      this.$store.commit('app/TOGGLE_SIDEBAR')
    },
    handleAvatarError() {
      return true
    },
    async handleDropdown(command) {
      if (command === 'logout') {
        await this.$store.dispatch('user/clearInfo')
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .header {
    height: 60px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
    // box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    .menu-button-wrapper {
      float: left;
      width: 60px;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #404040;
      cursor: pointer;
      &:hover {
        color: $--color-primary;
        background-color: #f9f9fc;
      }
      .menu-button {
        font-size: 20px;
      }
    }
    .header-right {
      float: right;
      .user {
        display: flex;
        .user__text {
          p {
            margin: 0;
            line-height: 30px;
          }
        }
        .user-dropdown {
          height: 60px;
          display: flex;
          align-items: center;
          padding: 0 16px;
          cursor: pointer;
          &:hover {
            background-color: #f9f9fc;
          }
          .user-dropdown__avatar {
            width: 50px;
            height: 50px;
            border: 1px solid #eee;
            border-radius: 50%;
            margin-right: 6px;
          }
          .user-dropdown__arrow {
            color: #404040;
          }
        }
      }
    }
  }
</style>
