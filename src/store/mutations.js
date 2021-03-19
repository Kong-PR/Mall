import {
  ADD_COUNTER,
  ADD_CART
} from "./mutation-types"
export default {
  [ADD_COUNTER](state, payload) {

    payload.count += 1
  },
  [ADD_CART](state, payload) {
    payload.checked = true
    payload.count = 1
    state.cartList.push(payload)
  }
}
