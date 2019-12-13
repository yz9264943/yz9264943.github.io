<template>
  <div class="box">
    <van-nav-bar title="影院" left-text="北京">
      <van-icon name="search" slot="right" />
    </van-nav-bar>
    <van-dropdown-menu active-color="#ee0a24">
      <van-dropdown-item v-model="value1" :options="option1" />
      <van-dropdown-item v-model="value2" :options="option2" />
      <van-dropdown-item v-model="value3" :options="option3" />
    </van-dropdown-menu>
    <Add></Add>
  </div>
</template>

<script>
import Add from "@/components/add.vue";
export default {
  data() {
    return {
      value1: 0,
      value2: 0,
      value3: 0,
      option1: [
        { text: "全城", value: 0 },
        { text: "西城区", value: 1 },
        { text: "东城区", value: 2 }
      ],
      option2: [
        { text: "APP订票", value: 0 },
        { text: "前台兑换", value: 1 },
      ],
      option3: [
        { text: "最近去过", value: 0 },
        { text: "离我最近", value: 1 },
      ]
    };
  },
  components:{
    Add
  }
};
</script>


