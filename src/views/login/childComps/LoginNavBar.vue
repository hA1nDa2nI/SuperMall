<template>
  <nav-bar class="login-nav">
    <div slot="left" @click="backClick">
      <i></i>
    </div>
    <div slot="center">登录</div>
    <div slot="right" @click="register">注册</div>
  </nav-bar>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: 'LoginNavBar',
    components: {
      NavBar
    },
    methods: {
      backClick() {
        this.$router.back()
      },
      register() {
        this.$router.push('/register')
      }
    }
  }
</script>

<style scoped>
  .login-nav {
    background-color: var(--color-tint);
    color: #fff;
  }

  .login-nav i {
    font-family: icomoon;
    font-style: normal;
  }
</style>