<template>
  <div class="box">
    <div id="one">
      <van-nav-bar title="我的资料" left-arrow @click-left="huitui" />
    </div>
    <div class="con">
      <div>
        <van-cell @click="setPic" id="a" title="头像" is-link>
          <img :src="pic" alt />
          <input type="file" @change="todoUpload" ref="upload" class="file" />
        </van-cell>
      </div>
      <van-cell @click="setName" title="昵称" is-link :value="nikname" />
      <mineinfo></mineinfo>
      <ageinfo></ageinfo>
    </div>
  </div>
</template>


<script>
import mineinfo from "@/components/mineinfo.vue";
import ageinfo from "@/components/ageinfo.vue";
import pic from "@/assets/tx.jpg";
export default {
  data() {
    return {
      nikname: sessionStorage.username,
      pic: sessionStorage.pic?sessionStorage.pic:pic
    };
  },
  mounted() {
    this.$axios.post("/vue/getavatar").then(res => {
      // console.log(res);
      if (!!res.data.flag) {
        this.pic = res.data.result.pic.replace("public", "http://192.168.50.7:9090");
        sessionStorage.pic = this.pic;
      } else {
        this.pic = pic;
      }
    });
  },
  methods: {
    setPic() {
      this.$refs.upload.click(); // 指向 upload
    },
    todoUpload() {
      var file = this.$refs.upload.files[0]; // 上传的文件
      var data = new FormData(); // 转为表单 方便 提交到后台
      data.append("avatar", file);

      this.$axios({
        url: "/vue/upload",
        method: "POST",
        data
      }).then(res => {
        // console.log(res);
        this.pic = res.data.pic.replace("public", "http://192.168.50.7:9090");
        sessionStorage.pic = this.pic;
      });
    },
    huitui() {
      this.$router.push({ name: "my" });
    },
    setName() {
      this.$router.push({ name: "/setname" });
    }
  },
  components: {
    mineinfo,
    ageinfo
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
}
.con {
  margin-top: 10px;
  text-align: left;
  > div:nth-child(2) {
    padding: 13px 16px;
  }
  img {
    width: 50px;
    height: 50px;
    float: right;
  }
  #a {
    line-height: 50px;
    > .van-icon,
    > .van-icon-arrow,
    > .van-cell__right-icon {
      margin-top: 13px;
    }
  }
}
.file {
  display: none;
}
</style>





