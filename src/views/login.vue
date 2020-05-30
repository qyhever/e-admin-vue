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
          <el-button
            class="submit-btn"
            type="primary"
            size="large"
            :loading="loading"
            @click="submitForm">
            提交
          </el-button>
        </el-form-item>
        <p class="account">
          <span>用户名：admin</span>
          <span>密码：admin</span>
        </p>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import md5 from 'md5'
import { login } from '@/api/user'
export default {
  name: 'login',
  data() {
    return {
      loading: false,
      form: {
        userName: 'admin',
        password: '123456'
      },
      rules: {
        userName: [ { required: true, message: '请输入用户名!' } ],
        password: [ { required: true, message: '请输入密码!' } ]
      }
    }
  },
  methods: {
    ...mapActions('user', [ 'login' ]),
    submitForm() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          try {
            const params = {
              userName: this.form.userName,
              password: md5(md5(this.form.password))
            }
            const response = await login(
              loading => (this.loading = loading),
              params
            )
            this.$store.dispatch('user/initUser', response).then(path => {
              this.$message.closeAll()
              this.$router.push(path)
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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(-135deg, #00dbde, #fc00ff);
}
.form-container {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 670px;
  transform: translate(-50%, -50%);
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
    /deep/ .el-input__inner {
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
  .account {
    display: flex;
    justify-content: space-between;
    color: #ccc;
  }
}
</style>
