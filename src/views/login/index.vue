<template>
  <div class="login">
    <div class="form-container">
      <div class="logo">
        <h1 class="title">登录</h1>
      </div>
      <el-form class="form" :model="form" status-icon :rules="rules" ref="form">
        <el-form-item prop="userName" size="large">
          <el-input type="text" v-model.trim="form.userName" placeholder="账号" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="password" size="large">
          <el-input
            type="password"
            v-model="form.password"
            placeholder="密码"
            autocomplete="off"
            @keyup.enter.native="submitForm"
          />
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="remember" label="记住密码"></el-checkbox>
          <!-- <span class="remember-label">记住密码</span> -->
        </el-form-item>
        <el-form-item>
          <el-button
            class="submit-btn"
            type="primary"
            size="large"
            :loading="loading"
            @click="submitForm">
            提交
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import md5 from 'md5'
import { login } from './service'
import { getRememberUser, setRememberUser, removeRememberUser } from '@/utils/local'
export default {
  name: 'login',
  data() {
    return {
      loading: false,
      form: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [ { required: true, message: '请输入用户名!' } ],
        password: [ { required: true, message: '请输入密码!' } ]
      },
      remember: false
    }
  },
  mounted() {
    const rememberUser = getRememberUser()
    if (rememberUser) {
      this.form = rememberUser
      this.remember = true
    }
  },
  methods: {
    ...mapActions('user', [ 'login' ]),
    submitForm() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          try {
            if (this.remember) {
              setRememberUser(this.form)
            } else {
              removeRememberUser()
            }
            const params = {
              userName: this.form.userName,
              password: md5(md5(this.form.password))
            }
            const response = await login({
              loadingCb: loading => (this.loading = loading),
              data: params
            })
            const { token, userInfo } = response
            userInfo.resourceCodes = Array.isArray(userInfo.resources) ? userInfo.resources.map(v => v.code) : []
            this.$store.dispatch('user/initUser', { token, userInfo }).then(() => {
              this.$message.closeAll()
              this.$router.push('/')
            }).catch(err => {
              console.log(err)
              this.$message.closeAll()
              this.$message.warning('没有登录权限')
            })
          } catch (err) {
            console.log(err)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(-135deg, #00dbde, #fc00ff);
}
.form-container {
  width: 670px;
  border-radius: 6px;
  box-shadow: 0 0 100px rgba(255, 255, 255, 0.2);
  background-color: #fff;
  .logo {
    z-index: 1;
    position: relative;
    height: 180px;
    margin-bottom: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('~@/assets/images/login.jpg');
    border-radius: 6px 6px 0 0;
    &:after {
      z-index: -1;
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(54, 84, 99, 0.7);
      border-radius: 6px 6px 0 0;
    }
    .title {
      font-weight: 400;
      color: #fff;
      font-family: Microsoft Yahei;
      margin: 0;
    }
  }
  .form {
    padding: 50px 120px;
    ::v-deep .el-input__inner {
      border-top: 0;
      border-left: 0;
      border-right: 0;
      border-radius: 0;
    }
  }
  .submit-btn {
    width: 100%;
    margin: 20px 0;
    background: linear-gradient(-135deg, #00dbde, #fc00ff);
    border: 0;
  }
  ::v-deep .el-checkbox__label {
    color: #2c3e50;
  }
}
</style>
