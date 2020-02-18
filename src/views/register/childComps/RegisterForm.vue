<template>
  <form action="" method="post" class="register_form">
    <div class="username">
      <label for="uname"><i></i></label>
      <input type="text" name="username" id="uname" placeholder="输入昵称/手机号/邮箱">
    </div>
    <div class="password">
      <label for="pwd"><i></i></label>
      <input type="password" name="passwsd" id="pwd" placeholder="输入密码">
    </div>
    <div class="repwd">
      <label for="repwd"><i></i></label>
      <input type="password" name="repwd" id="repwd" placeholder="确认密码">
    </div>
    <button type="submit" class="commit">注册</button>
  </form>
</template>

<script>
  export default {
    name: 'RegisterForm'
  }
</script>

<style scoped>
  .register_form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    background-color: #fff;
    padding: 20px 10px;
    box-shadow: 0 4px 4px 4px rgba(200, 200, 200, .5);
  }

  .register_form i {
    font-family: icomoon;
    font-style: normal;
    color: #333;
    font-size: 20px;
    line-height: 40px;
    margin-left: 10px;
  }

  .register_form input {
    border: 0px;
    line-height: 40px;
    margin-left: 20px;
  }

  .username, .password, .repwd {
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
  }

  .commit {
    background-color: var(--color-tint);
    width: 100%;
    line-height: 40px;
    margin: 30px 0 20px;
    border: 0px;
    color: #fff;
    font-size: 18px;
  }
</style>