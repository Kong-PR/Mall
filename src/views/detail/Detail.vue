<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detailInfo="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info ref="param" :paramInfo="paramInfo" />
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <detail-recommend-info ref="recommend" :recommendList="recommendList" />
    </scroll>
    <detail-bottom-bar @addToCart="addToCart" />
    <!-- native使用监听组件原生事件 -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <toast :message="message" :show="show" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailRecommendInfo from "./childComps/DetailRecommendInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import { debounce } from "common/utils";
import { itemListenerMixin, backTop } from "common/mixin";
import { mapActions } from "vuex";
import Toast from "components/common/toast/Toast";
import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "network/detail";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    DetailBottomBar,
    Toast,
  },

  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
      themeTopYs: [],
      getThemeTopY: null,
      message: "",
      show: false,
    };
  },
  mixins: [itemListenerMixin, backTop],
  created() {
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then((res) => {
      // console.log(res);
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      this.shop = new Shop(data.shopInfo);
      this.detailInfo = data.detailInfo;
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      this.commentInfo = data.rate.list[0];
    });
    getRecommend().then((res2) => {
      // console.log(res2);
      this.recommendList = res2.data.list;
      // console.log(this.recommendList);
    });
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      // console.log(this.themeTopYs);
    }, 100);
  },
  methods: {
    ...mapActions(["addCart"]),
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      // console.log("detail");
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300);
    },
    contentScroll(position) {
      // console.log(position);
      const positionY = -position.y;

      let len = this.themeTopYs.length;
      for (let i = len - 1; i >= 0; i--) {
        if (positionY >= this.themeTopYs[i]) {
          // console.log(i);
          // 频繁打印
          this.$refs.nav.currentIndex = i;
          break;
        }
      }
      this.backTopListener(position);
    },
    addToCart() {
      // console.log("======");
      // 添加需要添加的商品信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // 将商品添加到购物车
      // this.$store.commit("addCart", product);
      // this.$store.dispatch("addCart", product).then((res) => {
      //   console.log(res);
      // });
      // 添加吐司
      this.addCart(product).then((res) => {
        // this.message = res;
        // this.show = true;
        // setTimeout(() => {
        //   this.show = false;
        //   this.message = "";
        // }, 1500);
        // console.log(res);
        this.$toast.show(res, 1500);
      });
    },
  },
  mounted() {},
  // 该组件没有添加全局缓存，所以使用destroyed监听返回事件
  destroyed() {
    // 取消全局监听
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail {
  position: relative;
  z-index: 9;
  /* background-color: #fff; */
}
.content {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
</style>