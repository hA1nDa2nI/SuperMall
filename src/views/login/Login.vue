<template>
  <div id="login">
    <login-nav-bar/>
    <login-form/>
    <third-party/>
  </div>
</template>

<script>
  import LoginNavBar from './childComps/LoginNavBar'
  import LoginForm from './childComps/LoginForm'
  import ThirdParty from './childComps/ThirdParty'

  export default {
    name: 'Login',
    components: {
      LoginNavBar,
      LoginForm,
      ThirdParty
    }
  }
</script>

<style scoped>
  #login {
    position: relative;
    background-color: #f2f2f2;
    height: 100vh;
    z-index: 100;
  }
</style>