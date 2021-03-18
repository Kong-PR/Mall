import {
  debounce
} from "common/utils"
import BackTop from "components/content/backTop/BackTop";
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 500);
    // 监听item中的图片加载
    this.itemImgListener = () => {
      refresh();
    };
    this.$bus.$on("itemImgLoad", this.itemImgListener);
  },
}

export const backTop = {
  components: {
    BackTop
  },
  data() {
    return {

      isShowBackTop: false,
    }

  },
  methods: {
    backClick() {
      // console.log("点击");
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    backTopListener(position) {

      this.isShowBackTop = position.y < -1000;
    }

  }
}
