<template>
  <div class="box">
    <div class="top">
      <img src="../assets/logo.png" alt />
    </div>
    <div class="wrap">
      <van-cell-group>
        <van-field label="原始密码" v-model="form.oldpwd" type="password" placeholder="请输入原始密码" />
        <van-field label="新的密码" v-model="form.newpwd" type="password" placeholder="请输入新的密码" />
        <van-field label="确认密码" v-model="form.quepwd" type="password" placeholder="请确认新的密码" />
      </van-cell-group>
    </div>
    <div class="btn">
      <van-button @click="setPwd" type="danger">确认修改</van-button>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      form: {
        phone: sessionStorage.phone
      }
    };
  },
  methods: {
    setPwd() {
      // console.log(this.form);
      if (this.form.newpwd == this.form.quepwd) {
        this.$http
          .post("http://192.168.50.7:9090/vue/setpwd", this.form)
          .then(res => {
            // console.log(res);
            // console.log(res.body.result);
            if (res.body.result) {
              // console.log(this.form.phone);
              // 修改成功
              Dialog.alert({
                message: res.body.msg
              });
              this.form.oldpwd = "";
              this.form.newpwd = "";
              this.form.quepwd = "";
              this.$router.push({ name: "setinfo" });
            } else {
              // 修改失败
              Dialog.alert({
                message: res.body.msg
              });
            }
          });
      } else {
        Dialog.alert({
          title: "注册失败",
          message: "密码与确认密码不一致，请重新输入"
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.box {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  overflow: hidden;
  .top {
    margin: 55px auto;
    text-align: center;
    height: 60px;
    line-height: 60px;
    img {
      height: 60px;
      width: auto;
      margin: 0 auto;
    }
  }
}
</style>