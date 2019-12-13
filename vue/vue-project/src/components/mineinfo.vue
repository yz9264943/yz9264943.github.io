<template>
  <div>
    <van-cell is-link @click="showPopup" title="性别" :value="gender"></van-cell>
    <van-popup v-model="show" position="bottom" :style="{ height: '28%' }">
      <div class="sex">更改性别</div>
      <div class="man" @click="setsex(1)">
        <van-nav-bar title="男" />
      </div>
      <div class="man"  @click="setsex(0)">
        <van-nav-bar title="女" />
      </div>
      <div style="margin-top:10px"  @click="Cancel">
        <van-nav-bar id="cancel" title="取消" />
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      gender: sessionStorage.gender ? sessionStorage.gender : "未设置"
    };
  },

  methods: {
    showPopup() {
      this.show = true;
    },
    setsex(gender) {
      // console.log(gender);
     this.$http
        .get("/vue/gender", {
          params: {
            gender:gender,
            phone:sessionStorage.phone
          }
        })
        .then(res => {
          // console.log(res);
          this.show = false;
          // this.gender = res.body.gender ? res.body.gender : "未设置";
          sessionStorage.gender = res.body.gender;
          this.gender = res.body.gender;
          // console.log(sessionStorage.gender);
        });
    },
    Cancel() {
      this.show = false;
    }
  }
};
</script>

<style scoped lang="scss">
.van-cell,
.van-cell--clickable {
  padding: 13px 16px;
}
.van-popup,
.van-popup--bottom {
  background-color: #f4f4f4;
}
.sex {
  text-align: center;
  height: 30px;
  line-height: 30px;
  font-size: 13px;
  color: #bdc0c5;
  background-color: #fff;
}
.man {
  .van-nav-bar,
  .van-hairline--bottom {
    height: 50px;
  }
}
</style>
