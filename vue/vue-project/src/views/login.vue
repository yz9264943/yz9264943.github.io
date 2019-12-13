<template>
  <div class="box">
    <div class="up">
      <img src="@/assets/logo.png" alt />
    </div>
    <div class="wrap">
      <van-cell-group>
        <van-field label="手机号" v-model="form.phone" type="text" placeholder="请输入手机号" />
        <van-field label="密 码" v-model="form.password" type="password" placeholder="请输入密码" />
      </van-cell-group>
    </div>
    <div class="btn">
      <p @click="gotoRegister">没有账号？点击注册...</p>
      <van-button @click="todoLogin" type="danger">登录</van-button>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      form: {
        phone: ""
      }
    };
  },
  
  methods: {
    gotoRegister() {
      this.$router.push({ name: "register" });
    },
    todoLogin() {
      // console.log(this.form);
      this.$axios.post("vue/login", this.form).then(res => {
        console.log(res);
        if (!!res.data.result) {
          // console.log("登陆成功");
          this.$router.push({ name: "my" });

          sessionStorage.token = res.data.token;
          sessionStorage.phone = res.data.result.phone;
          sessionStorage.username = res.data.result.username;
          sessionStorage.gender = res.data.result.gender?res.data.result.gender:'';
          sessionStorage.pic = res.data.result.pic?res.data.result.pic.replace("public", "http://192.168.50.7:9090"):'';
          sessionStorage.age = res.data.result.age?res.data.result.age:'';
          // console.log(sessionStorage.pic)

        } else {
          // 登录失败
          Dialog.alert({
            message: res.data.msg
          });
        }
      });
    }
  },
  created() {
    this.form.phone = this.$route.query.phone ? this.$route.query.phone : "";
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