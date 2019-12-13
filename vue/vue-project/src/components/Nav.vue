<template>
  <van-tabs id="a" v-model="activeName">
    <van-tab title="正在热映" name="a">
      <NavOne></NavOne>
    </van-tab>
    <van-tab title="即将上映" name="b">
      <NavTwo></NavTwo>
    </van-tab>
  </van-tabs>
</template>

<script>
import NavOne from "./NavOne.vue";
import NavTwo from "./NavTwo.vue";
export default {
  data() {
    return {
      activeName: "a"
    };
  },
  components: {
    NavOne,
    NavTwo
  }
};
</script>

<style scoped lang="scss">
</style>