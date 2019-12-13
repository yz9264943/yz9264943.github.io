<template>
  <div class="box">
    <div id="one">
      <van-nav-bar
        title="意见反馈"
        right-text="提交"
        left-arrow
        @click-left="huitui"
        @click-right="submitBtn"
      />
    </div>
    <div id="two">
      <van-cell-group>
        <van-field
          rows="10"
          autosize
          type="textarea"
          placeholder="请留下您宝贵的意见，我们将努力改进"
          show-word-limit
          v-model="message"
          maxlength="500"
        />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  data() {
    return { message: "" };
  },
  methods: {
    submitBtn() {
      Dialog.alert({
        message: "感谢您的宝贵意见"
      });
      this.$router.push({ name: "setinfo" });
    },
    huitui() {
      this.$router.push({ name: "setinfo" });
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
  .van-nav-bar__right {
    .van-nav-bar__text {
      color: gray;
      font-size: 15px;
    }
  }
}
#two {
  margin-top: 10px;
}
</style>