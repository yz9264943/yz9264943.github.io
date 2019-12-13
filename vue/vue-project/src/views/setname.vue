<template>
  <div class="box">
    <div id="one">
      <van-nav-bar
        title="我的资料"
        left-arrow
        right-text="保存"
        @click-right="newname"
        @click-left="$router.back(-1)"
      />
    </div>
    <div class="newname">
      <van-cell-group>
        <van-field v-model="form.username" placeholder="请输入用户名" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        phone: sessionStorage.phone,
        username: sessionStorage.username
      }
    };
  },
  methods: {
    newname() {
      //   console.log(this.form);
      this.$http.post("vue/setname", this.form).then(res => {
        // console.log(res);
        sessionStorage.username = res.body.username;
        this.$router.push({ name: "myinfo" });
      });
    }
  }
};
</script>

<style scoped lang="scss">
.box {
  width: 100vw;
  height: 100vh;
  background-color: #f4f4f4;
}

#one {
  .van-icon,
  .van-icon-arrow-left,
  .van-nav-bar__arrow {
    color: gray;
    font-size: 25px;
  }
  .van-nav-bar__text {
    font-size: 15px;
    color: #797d82;
  }
}
.newname {
  margin-top: 10px;
}
</style>