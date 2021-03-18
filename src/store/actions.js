import {
  ADD_COUNTER,
  ADD_CART
} from "./mutation-types"
export default {

  addCart(context, payload) {
    // let oldProduct = null
    // for (let item of context.cartList) {
    //   if (item.iid === payload.iid) {
    //     oldProduct = item
    //     break
    //   }
    // }
    const oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    if (oldProduct) {
      // console.log("if");
      // oldProduct.count++
      context.commit(ADD_COUNTER, oldProduct)
    } else {
      // console.log("else");
      // state.cartList.push(payload)
      context.commit(ADD_CART, payload)
    }
  }
}
