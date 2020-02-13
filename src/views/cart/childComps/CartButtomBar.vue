<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
          :is-checked="isSelectAll" 
          class="check-button"
          @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">合计:{{totalPrice}}</div>
    <div class="calculate" @click="calcClick">立即购买({{checkLength}})</div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  export default {
    name: 'CartButtomBar',
    components: {
      CheckButton
    },
    computed: {
      totalPrice() {
        return '￥' + this.$store.state.cartList.filter(item => item.checked).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        // return !(this.$store.state.cartList.filter(item => !item.checked).length)
        return !this.$store.state.cartList.find(item => !item.checked)
      }
    },
    methods: {
      checkClick() {
        if (this.isSelectAll) { // 全部选中
          this.$store.state.cartList.forEach(item => item.checked = false)
        } else { // 部分或全部不选中
          this.$store.state.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick() {
        if (!this.isSelectAll) {
          this.$toast.show('当前未选中商品', 2000)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    display: flex;
    position: relative;
    height: 40px;
    line-height: 40px;
    background-color: #eee;
    font-size: 14px;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }
  
  .check-button {
    width: 18px;
    height: 18px;
    line-height: 18px;
    margin-right: 5px;
  }

  .price {
    margin-left: 20px;
    flex: 1;
  }

  .calculate {
    width: 90px;
    background-color: var(--color-tint);
    color: #fff;
    text-align: center;
  }
</style>