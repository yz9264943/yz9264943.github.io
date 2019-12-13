<template>
  <div>
    <van-cell is-link @click="showPopup" title="出生年月">{{time?time:"未设置"}}</van-cell>
    <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
      <van-datetime-picker
        @confirm="setAge"
        @cancel="offSet"
        v-model="currentDate"
        type="date"
        :min-date="minDate"
      />
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      minHour: 10,
      maxHour: 20,
      minDate: new Date(1989, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
      time: ""
    };
  },
  mounted() {
    // console.log(sessionStorage.age);
    var age = sessionStorage.age ? sessionStorage.age : "";
    // console.log(age.split("T"));
    var Age = age.split("T")[0].split("-");
    // console.log(Age);
    this.time = sessionStorage.age ? age.split("T")[0] : "";
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    setAge(value) {
      // console.log(value);
      this.$axios
        .post("vue/setage", {
          params: {
            value: value,
            phone: sessionStorage.phone
          }
        })
        .then(res => {
          // console.log(res);
        });

      // 获取 时间
      var time = value.getTime(); // 总毫秒数
      // console.log(time);

      function getMyDate(str) {
        var oDate = new Date(str),
          oYear = oDate.getFullYear(),
          oMonth = oDate.getMonth() + 1,
          oDay = oDate.getDate(),
          oTime = oYear + "-" + addZero(oMonth) + "-" + addZero(oDay);
        return oTime;
      }
      //补零操作
      function addZero(num) {
        if (parseInt(num) < 10) {
          num = "0" + num;
        }
        return num;
      }
      var time = getMyDate(parseInt(time));
      // console.log(time);
      this.time = time;
      // console.log(this.time);
      this.show = false;
    },
    offSet() {
      this.show = false;
    }
  }
};
</script>

<style scoped lang="scss">
.van-cell,
.van-cell--clickable {
  padding: 13px 16px;
}
</style>
