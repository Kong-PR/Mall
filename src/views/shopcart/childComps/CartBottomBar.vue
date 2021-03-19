<template>
  <div class="bottom-bar">
    <div class="checked-content">
      <check-button
        class="checked-button"
        :isChecked="isSelectAll"
        @click.native="checkClick"
      />
      <span>全选 </span>
    </div>
    <div class="price">合计:{{ totalPrice }}</div>
    <div class="calculate">去计算({{ checkedLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import { mapGetters } from "vuex";
export default {
  components: { CheckButton },
  name: "CartBottomBar",
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "¥" +
        this.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkedLength() {
      return this.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      if (this.cartList.length === 0) return false;
      //   return !this.cartList.filter((item) => !item.checked).length;
      return !this.cartList.find((item) => !item.checked);
    },
  },
  methods: {
    checkClick() {
      // 自己写的
      //   let mark = true;
      //   for (let item of this.cartList) {
      //     if (!item.checked) {
      //       item.checked = true;
      //       mark = false;
      //     }
      //   }
      //   if (mark) {
      //     for (let item of this.cartList) {
      //       item.checked = false;
      //     }
      //   }
      //   课程第一种
      //   if (this.isSelectAll) {
      //     this.cartList.forEach((item) => (item.checked = false));
      //   } else {
      //     this.cartList.forEach((item) => (item.checked = true));
      //   }
      //   第二种
      let mark = this.isSelectAll;
      this.cartList.forEach((item) => {
        item.checked = !mark;
      });
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #eee;
  position: relative;
  line-height: 40px;
  display: flex;
  font-size: 14px;
}
.checked-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.checked-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
  margin-left: 30px;
  flex: 1;
}
.calculate {
  margin-right: auto;
  background-color: red;
  width: 90px;
  color: #fff;
  text-align: center;
}
</style>