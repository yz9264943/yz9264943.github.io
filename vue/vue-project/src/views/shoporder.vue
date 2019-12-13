<template>
  <div class="box">
    <div id="one">
      <van-nav-bar title="我的订单" left-arrow @click-left="huitui" />
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {};
  },
  methods: {
    huitui() {
      this.$router.push({ name: "my" });
    }
  }
};
</script>

<style scoped lang="scss">
#one {
  .van-icon,
  .van-icon-arrow-left,
  .van-nav-bar__arrow {
    color: gray;
    font-size: 25px;
  }
}
</style>





