import {
  ADD_COUNTER,
  ADD_CART
} from "./mutation-types"
export default {

  addCart(context, payload) {
    let oldProduct = null
    for (let item of context.cartList) {
      if (item.iid === payload.iid) {
        oldProduct = item
        break
      }
    }
    if (oldProduct) {
      // oldProduct.count++
      context.commit(ADD_COUNTER, oldProduct)
    } else {
      payload.count = 1
      // state.cartList.push(payload)
      context.commit(ADD_CART, payload)
    }
  }
}
