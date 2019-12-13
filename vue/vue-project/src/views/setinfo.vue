<template>
  <div class="box">
    <div id="one">
      <van-nav-bar title="设置" left-arrow @click-left="huitui" />
    </div>
    <div>
      <van-cell title="账号ID" :value="id" />
    </div>
    <div>
      <van-cell title="登录密码" is-link value="修改" @click="gotoSetPwd" />
      <van-cell title="安全密码" is-link value="设置" />
    </div>
    <div>
      <van-cell title="软件版本" is-link />
      <van-cell @click="gotoIdea" title="意见反馈" is-link />
    </div>
    <div id="two">
      <van-cell is-link @click="showPopup">清除缓存</van-cell>
      <van-popup v-model="show" position="bottom" :style="{ height: '20%' }">
        <div class="up">是否确定清除缓存</div>
        <div @click="rmShow">
          <van-nav-bar title="确定" />
        </div>
        <div @click="rmShow" style="margin-top:10px">
          <van-nav-bar id="cancel" title="取消" />
        </div>
      </van-popup>
    </div>
    <div id="end" @click="rmLogin">
      <van-nav-bar title="退出登录" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      id: sessionStorage.phone
    };
  },
  methods: {
    huitui() {
      this.$router.push({ name: "my" });
    },
    rmLogin() {
      // console.log(window.sessionStorage);
      sessionStorage.phone = "";
      sessionStorage.username = "";
      sessionStorage.token = "";
      // console.log(window.sessionStorage);
      this.$router.push({ name: "my" });
    },
    showPopup() {
      this.show = true;
    },
    rmShow() {
      this.show = false;
    },
    gotoIdea() {
      this.$router.push({ name: "idea" });
    },
    gotoSetPwd() {
      this.$router.push({ name: "setpwd" });
    }
  }
};
</script>

<style scoped lang="scss">
#app {
  background-color: #f4f4f4;
}
#one {
  .van-icon,
  .van-icon-arrow-left,
  .van-nav-bar__arrow {
    color: gray;
    font-size: 25px;
  }
}
.box > div {
  margin-bottom: 10px;
  .van-cell,
  .van-cell--clickable {
    height: 49px;
    line-height: 29px;
    .van-cell__title {
      text-align: left;
    }
    .van-cell__value {
      font-size: 13px;
    }
  }
  .van-icon,
  .van-icon-arrow-left,
  .van-nav-bar__arrow {
    font-size: 15px;
  }
}
#end {
  width: 100%;
  height: 49px;
  margin: 0;
  position: fixed;
  left: 0;
  bottom: 0;
  .van-nav-bar,
  .van-hairline--bottom {
    .van-nav-bar__title,
    .van-ellipsis {
      color: #ff5f16;
    }
  }
}
#two {
  .van-cell ,.van-cell--clickable{
    .van-cell__value ,.van-cell__value--alone{
      font-size: 14px;
    }
  }
}
.up {
  background-color: #fff;
  margin: 0;
  font-size: 13px;
  padding-top: 6px;
  padding-bottom: 6px;
  color: #bdc0c5;
}
</style>