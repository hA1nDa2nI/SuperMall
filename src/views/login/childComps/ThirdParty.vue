<template>
  <div class="third_party">
    <div class="title">第三方账号快速登录</div>
    <div class="content">
      <div class="item">
        <i style="color: #1294E2"></i>
        <span>qq登录</span>
      </div>
      <div class="item">
        <i style="color: #7BB32E"></i>
        <span>微信登录</span>
      </div>
      <div class="item">
        <i style="color: #E6162D"></i>
        <span>微博登录</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ThirdParty'
  }
</script>

<style scoped>
  .third_party {
    position: absolute;
    bottom: 5%;
    left: 5%;
    width: 90%;
  }

  .title {
    text-align: center;
    line-height: 30px;
  }

  .content {
    display: flex;
    margin-top: 10px;
    text-decoration: underline;
  }

  .content .item {
    position: relative;
    flex: 1;
    padding-top: 50px;
    text-align: center;
  }

  .item i {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: icomoon;
    font-style: normal;
    font-size: 30px;
  }
</style>