<template>
  <div id="user-info">
    <a href="#" class="clear-fix">
      <div class="user-icon">
        <slot name="user-icon">
          <img src="~assets/img/profile/no_login.jpg" alt="" width="100%">
        </slot>
      </div>
      <div class="login-info left">
        <slot name="user-nickname">
          <div>登录/注册</div>
        </slot>
        <div class="phone">
          <i></i>
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>
      <div class="go-login"><i></i></div>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'UserInfo'
  }
</script>

<style scoped>
  #user-info {
    background-color: var(--color-tint);
    padding: 15px;
    margin-top: -5px;
    position: relative;
  }

  .user-icon {
    width: 60px;
    height: 60px;
    float: left;
    border-radius: 50%;
    overflow: hidden;
  }

  #user-info .login-info {
    color: #fff;
    margin: 10px 0 0 10px;
  }

  #user-info .login-info .phone {
    position: relative;

    font-size: 13px;
    margin-top: 5px;
    font-weight: 300;
  }

  .phone i {
    font-family: icomoon;
    font-style: normal;
    font-size: 16px;
  }

  .go-login {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
  }

  .go-login i {
    font-family: icomoon;
    font-style: normal;
    font-size: 26px;
    color: #fff;
  }
</style>