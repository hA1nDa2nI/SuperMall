<template>
  <div id="cart">
    <nav-bar class="cart-nav"><div slot="center">购物车({{length}})</div></nav-bar>
    <scroll class="content" ref="scroll">
      <cart-list/>
    </scroll>
    <cart-buttom-bar/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import scroll from 'components/common/scroll/Scroll'

  import CartList from './childComps/CartList'
  import CartButtomBar from './childComps/CartButtomBar'

  import {mapGetters} from 'vuex'

  export default {
    name: 'Cart',
    components: {
      NavBar,
      scroll,

      CartList,
      CartButtomBar
    },
    computed: {
      // 两种语法
      // ...mapGetters(['cartLength'])
      ...mapGetters({
        length: 'cartLength'
      })
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  #cart {
    height: 100vh;
  }

  .cart-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: relative;
    z-index: 9;
  }

  .content {
    height: calc(100% - 44px - 49px - 40px);
  }
</style>