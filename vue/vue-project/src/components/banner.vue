<template>
  <div class="banner">

    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(l,i) in imgList" :key="i">
        <img :src="l.imgUrl" alt />
      </van-swipe-item>
    </van-swipe>

    <div></div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      imgList: {}
    };
  },
  mounted() {
    this.$axios({
      url: "https://m.maizuo.com/gateway?type=2&cityId=110100&k=9590013",
      method: "GET",
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"15734547965132485919205"}',
        "X-Host": "mall.cfg.common-banner"
      }
    }).then(res => {
      this.imgList = res.data.data;
      // console.log(this.imgList);
    });
  }
};
</script>


<style scoped lang="scss">
.banner {
  width: 100%;
  height: 56vw;
  div {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
