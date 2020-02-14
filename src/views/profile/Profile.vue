<template>
  <div id="profile">
    <nav-bar class="profile-nav"><div slot="center">hA1nDa2nI</div></nav-bar>
    <user-info/>
    <section class="account">
      <div class="account-item">
        <div class="number">
          <span class="balance">0.00</span>元
        </div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>个
        </div>
        <div class="account-info">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>分
        </div>
        <div class="account-info">我的积分</div>
      </div>
    </section>
    <ListView :list-data="orderList" class="order-list"/>
    <list-view :list-data="serviceList" class="service-list"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import UserInfo from './childComps/UserInfo'
  import ListView from './childComps/ListView'

  export default {
    name: 'Profile',
    components: {
      NavBar,
      UserInfo,
      ListView
    },
    data() {
      return {
        orderList: [
          {icon: '', iconColor: '#333', info: '我的消息'},
          {icon: '', iconColor: '#fc7b53', info: '积分商城'},
          {icon: '', iconColor: '#ffc636', info: '会员卡'},
        ],
        serviceList: [
          {icon: '', iconColor: '#ff8198', info: '我的购物车'},
          {icon: '', iconColor: '#ff8198', info: '下载购物APP'},
        ]
      }
    }
  }
</script>

<style scoped>
  #profile {
    background-color: #f2f2f2;
  }
  .profile-nav {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }

  .account {
    display: flex;
  }

  .account-item {
    flex: 1;
    background-color: #fff;
    border-right: 1px solid #f2f2f2;
    padding: 18px;
    text-align: center;
  }

  .account-item:last-of-type {
    border-right: 0;
  }

  .balance {
    font-size: 24px;
    font-weight: 700;
    color: #ff5f3e;
  }

  .account-info {
    margin-top: 6px;
  }

  .order-list, .service-list {
    margin-top: 12px;
  }
</style>