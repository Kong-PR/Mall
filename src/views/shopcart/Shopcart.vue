<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list />
    <!-- 底部封装 -->
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CariList";
import { mapGetters } from "vuex";
export default {
  name: "Shopcart",
  components: {
    NavBar,
    CartList,
  },
  computed: {
    ...mapGetters(["cartLength"]),
    // 也可以用对象属性来更改名字
  },
};
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>