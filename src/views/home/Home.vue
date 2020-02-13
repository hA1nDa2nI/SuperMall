<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control class="tab-control" 
                 :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 v-show="isTabFixed"/>
    
    <scroll class="content"
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isshowBackTop"/>

  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from "components/content/tabControl/TabControl"
  import GoodsList from "components/content/goods/GoodsList"
  import Scroll from "components/common/scroll/Scroll"

  import HomeSwiper from "./childComps/HomeSwiper"
  import RecommendView from "./childComps/RecommendView"
  import FeatureView from "./childComps/FeatureView"

  import {getHomeMultidata, getHomeGoods} from 'network/home'
  import {debounce} from 'common/utils'
  import {itemListenerMixin, backTopMixin} from "common/mixin"

  export default {
    name: 'Home',
    components: {
      NavBar,
      TabControl,
      GoodsList,
      Scroll,

      HomeSwiper,
      RecommendView,
      FeatureView
    },
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    destroyed() {
      console.log('home destroyed')
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      // 1.保存Y值
      this.saveY = this.$refs.scroll.getScrollY()

      // 2.取消全局事件监听
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultidata()

      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted() {},
    methods: {
      /**
       * 事件监听相关方法
       */
      
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      contentScroll(position) {
        // 1.判断BackTop是否显示
        this.isshowBackTop = -position.y > 1000

        // 2.决定tabControl是否吸顶(position: fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType)

        this.$refs.scroll.refresh()  // 等图片都加载完了再重新计算可滚动高度
      },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },

      /**
       * 网络请求相关方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res)
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // console.log(res.data.list)
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }

  let totalNums = []
  const num1 = [20, 11, 22]
  const num2 = [11, 22, 33]

  // for (let n of num1) {
  //   totalNums.push(n)
  // }

  totalNums.push([10, 20, 30, 40, 50])

  totalNums.push(...num1) // 可传可变参数
</script>

<style scoped>
  #home {
    /* vh 视口高度 */
    height: 100vh;
    position: relative;
  }
  .home-nav {
    width: 100%;
    background-color: var(--color-tint);
    color: #fff;
    /* position: fixed;
    top: 0;
    left: 0;
    z-index: 9; */
  }

  /* .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  } */

  .content {
    /* height: 300px; */
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>
