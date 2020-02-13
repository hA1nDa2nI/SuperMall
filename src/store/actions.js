import {ADD_COUNTER, ADD_TO_CART} from './mutation-types'

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // payload新添加商品
      // 数组常用的方法有哪些：push/pop/shift/unshift/sort/reverse/map/filter/reduce/join
  
      // 1.查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if (oldProduct) {
        // oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量加1')
      } else {
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('添加新的商品')
      }
    })
  }
}