import Vue from "vue"
import Vuex from "vuex"


import mutations from "./mutations"
import actions from "./actions"
// 安装插件
Vue.use(Vuex)
// 创建使用对象
const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations,
  actions


})

// 挂载
export default store
