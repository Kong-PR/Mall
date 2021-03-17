<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" />
    <scroll class="content" ref="scroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detailInfo="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo" />
      <detail-comment-info :commentInfo="commentInfo" />
      <detail-recommend-info :recommendList="recommendList" />
    </scroll>
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

import Scroll from "components/common/scroll/Scroll";
import { debounce } from "common/utils";
import { itemListenerMixin } from "common/mixin";
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
    };
  },
  mixins: [itemListenerMixin],
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
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
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
  height: calc(100% - 44px);
  overflow: hidden;
}
</style>