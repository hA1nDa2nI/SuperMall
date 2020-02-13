<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="param" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addCart="addCart"/>
    <back-top @click.native="backClick" v-show="isshowBackTop"/>

    <!-- <toast :message="message" :show="show"/> -->
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar"
  import DetailSwiper from "./childComps/DetailSwiper"
  import DetailBaseInfo from "./childComps/DetailBaseInfo"
  import DetailShopInfo from "./childComps/DetailShopInfo"
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
  import DetailParamInfo from "./childComps/DetailParamInfo"
  import DetailCommentInfo from "./childComps/DetailCommentInfo"
  import DetailBottomBar from "./childComps/DetailBottomBar"

  import Scroll from "components/common/scroll/Scroll"
  import GoodsList from "components/content/goods/GoodsList"

  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "network/detail"
  import {debounce} from "common/utils"
  import {itemListenerMixin, backTopMixin} from "common/mixin"

  import {mapActions} from "vuex"

  // import Toast from "components/common/toast/Toast"

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      // Toast
    },
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
        // message: '',
        // show: false
      }
    },
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid

      // 2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // console.log(res)
        const data = res.result
        // 1.获取顶部轮播图数据
        this.topImages = data.itemInfo.topImages

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // console.log(this.goods)

        // 3.获取店铺信息
        this.shop = new Shop(data.shopInfo)

        // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo

        // 5.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 6.获取评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }

        // 1.第一次获取 值不对
        // 值不对的原因：this.$refs.params.$el压根没有渲染
        // this.themeTopYs = []
        // this.themeTopYs.push(0)
        // this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // console.log(this.themeTopYs);

        // this.$nextTick(() => {
        //   // 2.第二次获取：值不对
        //   // 值不对的原因：图片没有包含在内
        //   // 根据最新的数据，对应的DOM是已经被渲染出来
        //   // 但是图片依然是没有加载完(目前获取到offsetTop不包含其中的图片)
        //   // offsetTop值不对的时候，一般都是因为图片的问题
        //   this.themeTopYs = []

        //   this.themeTopYs.push(0)
        //   this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

        //   console.log(this.themeTopYs);
        // })
      })

      // 3.请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })

      // 4.给getThemeTopY赋值(对给this.themeTopYs赋值的操作进行防抖)
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
      }, 100)
    },
    mounted() {},
    destroyed() {
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
    methods: {
      imageLoad() {
        this.refresh()
        this.getThemeTopY()
      },
      titleClick(index) {
        // console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
      },
      contentScroll(position) {
        // 1.获取Y值
        const positionY = -position.y

        // 2.position和主题中的值进行对比
        // 0, 2632, 3989, 4184
        // positionY 在 (0, 2632) 之间，index=0
        // positionY 在 (2632, 3989) 之间，index=1
        // positionY 在 (3989, 4184) 之间，index=2
        // positionY 在 (4184, ~) 之间，index=3
        let length = this.themeTopYs.length
        for(let i = 0; i < length - 1; i++) {
          if (this.currentIndex !== i && (positionY >= this.themeTopYs[parseInt(i)] && positionY < this.themeTopYs[parseInt(i)+1])) {
            this.currentIndex = i
            // console.log(this.currentIndex)
            this.$refs.nav.currentIndex = this.currentIndex
          }

          // if (positionY > this.themeTopYs[parseInt(i)] && positionY < this.themeTopYs[parseInt(i)+1]) {
          //   console.log(i);
          // }
          // if (positionY >= this.themeTopYs[i]) {
          //   this.currentIndex = i
          //   console.log(this.currentIndex);
          //   break
          // }

          // if (this.currentIndex !== i && ((i < length -1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i ===length - 1 && positionY >= this.themeTopYs[i]))) {
          //   this.currentIndex = i;
          //   // console.log(this.currentIndex)
          //   this.$refs.nav.currentIndex = this.currentIndex
          // }
        }

        this.isshowBackTop = -position.y > 1000
      },
      ...mapActions(['addCart']),
      addCart() {
        // 1.获取购物车需要展示的商品信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.detailInfo.desc
        product.price = this.goods.lowNowPrice
        product.iid = this.iid
        
        // 2.将商品添加到购物车
        // this.$store.cartList.push(product)
        // this.$store.commit('addCart', product)

        this.$store.dispatch('addCart', product).then(res => {
          // this.show = true
          // this.message = res
          // setTimeout(() => {
          //   this.show = false
          //   this.message = ''
          // }, 1500)

          this.$toast.show(res, 2000)
        })

        // this.addCart(product).then(res => {
        //   console.log(res)
        // })
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 49px);
  }
</style>
