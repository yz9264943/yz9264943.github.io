<template>
  <div class="box">
    <header v-if="info.username">
      <img @click="gotomien" :src="pic" alt />
      <span @click="gotomien">{{info.username}}</span>
    </header>
    <header v-else>
      <img :src="info.pic1" alt @click="gotoLogin" />
      <span @click="gotoLogin">立即登录</span>
    </header>

    <van-grid clickable :column-num="2">
      <van-grid-item icon="coupon" text="电影订单" @click="gotoMvOrder" />
      <van-grid-item icon="column" text="商品订单" @click="gotoShopOrder" />
    </van-grid>

    <div class="content">
      <Coupon></Coupon>
      <van-cell @click="RedBtn" :is-link="true" title="组合红包" icon="bill-o" />
      <van-cell @click="moneyBtn" :is-link="true" title="余额" icon="balance-o" value="￥0" />
      <van-cell @click="setInfo" :is-link="true" title="设置" icon="setting-o" />
    </div>
  </div>
</template>

<script>
// console.log(222);
// console.log(sessionStorage.pic);
import Coupon from "@/components/Coupon.vue";
import pic1 from "@/assets/touxiang.png"; // 没登录 默认头像
import pic from "@/assets/tx.jpg"; // 登录   默认头像
export default {
  data() {
    return {
      pic:sessionStorage.pic?sessionStorage.pic:pic,
      info: {
        username: "",
        phone: "",
        pic1: pic1 // 没登录
      }
    };
  },
  methods: {
    gotoLogin() {
      this.$router.push({ name: "login" });
    },
    setInfo() {
      if (sessionStorage.token) {
        this.$router.push({ name: "setinfo" });
      } else {
        this.$router.push({ name: "login" });
      }
    },
    gotoMvOrder() {
      if (sessionStorage.token) {
        this.$router.push({ name: "mvorder" });
      } else {
        this.$router.push({ name: "login" });
      }
    },
    gotoShopOrder() {
      if (sessionStorage.token) {
        this.$router.push({ name: "shoporder" });
      } else {
        this.$router.push({ name: "login" });
      }
    },
    RedBtn() {
      if (!sessionStorage.token) {
        this.$router.push({ name: "login" });
      }
    },
    moneyBtn() {
      if (!sessionStorage.token) {
        this.$router.push({ name: "login" });
      }
    },
    gotomien() {
      if (sessionStorage.token) {
        this.$router.push({ name: "myinfo" });
      } else {
        this.$router.push({ name: "login" });
      }
    }
  },
  mounted() {
    if (sessionStorage.token) {
      this.$axios.get("vue/my").then(res => {
        // console.log(res);
        this.info = res.data.result;
        // console.log(this.info);
      });
    }
  },
  created() {
    this.pic = sessionStorage.pic ? sessionStorage.pic : pic;
    // console.log(sessionStorage.pic);
    // console.log(this.pic);
  },
  components: {
    Coupon
  }
};
</script>

<style scoped lang="scss">
.box {
  background-color: #f4f4f4;
  width: 100%;
  header {
    width: 100%;
    height: 200px;
    background: url(../assets/bg.png) center no-repeat;
    padding-left: 22px;
    padding-top: 64px;
    margin-top: -44px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    img {
      width: 63px;
      height: 63px;
      border-radius: 35px;
      margin-right: 20px;
      border: 2px solid #fff;
    }
    span {
      font-size: 16px;
      color: #fff;
    }
  }
  .van-grid > .van-grid-item:nth-child(1) {
    color: rgba(255, 230, 0, 0.952);
  }
  .van-grid > .van-grid-item:nth-child(2) {
    color: yellowgreen;
  }
  .van-icon-coupon {
    color: red;
  }
  .content {
    margin-top: 10px;
    text-align: left;
    > div {
      height: 50px;
      > i:nth-child(1) {
        font-size: 25px;
        margin-right: 15px;
      }
      .van-icon-bill-o {
        color: blue;
      }
      .van-icon-balance-o {
        color: pink;
      }
      .van-icon-setting-o {
        color: greenyellow;
      }
    }
  }
}
</style>