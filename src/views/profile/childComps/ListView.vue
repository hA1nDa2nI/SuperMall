<template>
  <div id="list">
    <div v-for="(item, index) in listData" :key="index" class="item">
      <i class="icon" :style="{color: item.iconColor}">{{item.icon}}</i>
      <div class="info">{{item.info}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ListView',
    props: {
      listData: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  #list {
    background-color: #fff;
    font-size: 15px;
    color: #333;
  }

  #list .item {
    height: 44px;
    line-height: 44px;
    position: relative;
  }

  .item .icon {
    font-family: icomoon;
    font-style: normal;
    font-size: 20px;
    position: absolute;
    left: 15px;
  }

  .item .info {
    margin-left: 40px;
    border-bottom: 1px solid rgba(100, 100, 100, .1);
    padding-left: 5px;
  }

  .item:last-of-type .info {
    border-bottom: none;
  }
</style>