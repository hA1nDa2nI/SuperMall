import {debounce} from "./utils"
import BackTop from "components/content/backtop/BackTop"

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null
    }
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh, 50)
    this.itemImgListener = () => {
      this.refresh()
    }
    this.$bus.$emit('itemImgLoad', this.itemImgListener)
  }
}

export const backTopMixin = {
  components: {
    BackTop,
  },
  data() {
    return {
      isshowBackTop: false
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 30)
    },
  }
}
