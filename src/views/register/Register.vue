<template>
  <div id="register">
    <register-nav-bar/>
    <register-form/>
  </div>
</template>

<script>
  import RegisterNavBar from './childComps/RegisterNavBar'
  import RegisterForm from './childComps/RegisterForm'

  export default {
    name: 'Register',
    components: {
      RegisterNavBar,
      RegisterForm
    }
  }
</script>

<style scoped>
  #register {
    position: relative;
    background-color: #f2f2f2;
    height: 100vh;
    z-index: 100;
  }
</style>