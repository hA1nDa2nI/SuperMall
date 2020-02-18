<template>
  <nav-bar class="register-nav">
    <div slot="left" @click="backClick">
      <i></i>
    </div>
    <div slot="center">注册</div>
    <div slot="right" @click="login">登录</div>
  </nav-bar>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: 'RegisterNavBar',
    components: {
      NavBar
    },
    methods: {
      backClick() {
        this.$router.back()
      },
      login() {
        this.$router.push('/login')
      }
    }
  }
</script>

<style scoped>
  .register-nav {
    background-color: var(--color-tint);
    color: #fff;
  }

  .register-nav i {
    font-family: icomoon;
    font-style: normal;
  }
</style>