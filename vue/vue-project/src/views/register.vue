<template>
  <div class="box">
    <div class="up">
      <img src="@/assets/logo.png" alt />
    </div>
    <div class="wrap">
      <van-cell-group>
        <van-field label="手机号" v-model="form.phone" type="text" placeholder="请输入手机号" />
        <van-field label="用户名" v-model="form.username" type="text" placeholder="请输入用户名" />
        <van-field label="密 码" v-model="form.password" type="password" placeholder="请输入密码" />
        <van-field label="确 认" v-model="form.pwd" type="password" placeholder="请确认密码" />
      </van-cell-group>
    </div>
    <div class="btn">
      <p @click="gotoLogin">已有账号？点击登录...</p>
      <van-button @click="todoRegister" type="danger">注册</van-button>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        phone: "",
        pwd: ""
      }
    };
  },
  methods: {
    gotoLogin() {
      this.$router.push({ name: "login" });
    },
    todoRegister() {
      // console.log(this.form);
      if (this.form.password == this.form.pwd) {
        this.$http
          .post("http://192.168.50.7:9090/vue/register", this.form)
          .then(res => {
            // console.log(res);
            // console.log(res.body.result);
            if (!res.body.result) {
              // console.log(this.form.phone);
              // 注册成功
              this.$router.push({
                name: "login",
                query: { phone: this.form.phone }
              });
            } else {
              // 注册失败
              Dialog.alert({
                title: res.body.result,
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

<style lang="scss">
.up {
  margin-top: 80px;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  img {
    height: 60px;
    width: 60px;
  }
}
.wrap {
  padding: 0px 10px;
  .van-cell,
  .van-field {
    height: 55px;
  }
}
.btn {
  margin: 40px 25px 0px;
  p {
    text-align: left;
    font-size: 13px;
    color: gray;
    margin-bottom: 10px;
  }
  button {
    width: 100%;
  }
}
</style>