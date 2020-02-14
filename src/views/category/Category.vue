<template>
  <div id="category">
    <nav-bar class="category-nav"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <tab-menu :categories="categories"/>
      <scroll id="tab-content">
        <div>
          <tab-content-category :subcategories="showSubcategory"/>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'

  import TabMenu from './childComps/TabMenu'
  import TabContentCategory from './childComps/TabContentCategory'

  import {getCategory, getSubcategory, getCategoryDetail} from 'network/category'

  export default {
    name: 'Category',
    components: {
      NavBar,
      Scroll,

      TabMenu,
      TabContentCategory
    },
    computed: {
		  showSubcategory() {
		    if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
    },
    data() {
      return {
        categories: [],
        categoryData: {}
      }
    },
    created() {
      this.getCategory()
    },
    methods: {

      // 网络请求
      getCategory() {
        getCategory().then(res => {
          // console.log(res)
		      // 1.获取分类数据
          this.categories = res.data.category.list
          // console.log(this.categories)

          // 2.初始化每个类别的子数据
          for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          // console.log(this.categoryData)

          // 3.请求第一个分类的数据
          this.getSubcategory(0)
        })
      },
      getSubcategory(index) {
        this.currentIndex = index;
		    const mailKey = this.categories[index].maitKey;
        getSubcategory(mailKey).then(res => {
          this.categoryData[index].subcategories = res.data
          this.categoryData = {...this.categoryData}
          this.getCategoryDetail(POP)
          this.getCategoryDetail(SELL)
          this.getCategoryDetail(NEW)
        })
      },
      getCategoryDetail(type) {
		    // 1.获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        // 2.发送请求,传入miniWallkey和type
		    getCategoryDetail(miniWallkey, type).then(res => {
		      // 3.将获取的数据保存下来
		      this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },
      /**
       * 事件响应相关的方法
       */
      selectItem(index) {
        this.getSubcategories(index)
      }
    }
  }
</script>

<style scoped>
  #category {
    height: 100vh;
  }

  .category-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: relative;
    z-index: 9;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    display: flex;
  }

  #tab-content {
    height: 100%;
    flex: 1;
  }

</style>