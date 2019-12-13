<template>
  <div class="box" @click="CouponBtn">
    <!-- 优惠券单元格 -->
    <van-coupon-cell
      icon="credit-pay"
      :coupons="coupons"
      :chosen-coupon="chosenCoupon"
      @click="showList = true"
    />

    <!-- 优惠券列表 -->
    <van-popup v-model="showList" position="bottom">
      <van-coupon-list
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChange"
        @exchange="onExchange"
      />
    </van-popup>
  </div>
</template>

<script>
const coupon = {
  available: 1,
  condition: "无使用门槛\n最多优惠12元",
  reason: "",
  value: 150,
  name: "优惠券名称",
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: "1.5",
  unitDesc: "元"
};

export default {
  data() {
    return {
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon],
      showList: false
    };
  },

  methods: {
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange(code) {
      this.coupons.push(coupon);
    },
    CouponBtn(){
       if (!sessionStorage.token) {
        this.$router.push({ name: "login" });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.van-cell,
.van-cell--clickable,
.van-coupon-cell {
  padding: 13px 16px;
  .van-icon-credit-pay {
    color: red;
    font-size: 25px;
    margin-right: 15px;
  }
}
</style>