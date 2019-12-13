<template>
  <div class="wrap_a">
    <div id="one">
      <van-nav-bar @click-left="$router.go(-1)" :title="list.name" left-arrow>
        <van-icon name="search" slot="right" />
      </van-nav-bar>
    </div>
    <ul class="day">
      <li class="li" v-for="(n,i) in time" :key="i" @click="Action(i,$event)">{{n}}</li>
    </ul>
    <van-dropdown-menu active-color="#ee0a24">
      <van-dropdown-item v-model="value1" :options="option1" />
      <van-dropdown-item v-model="value2" :options="option2" />
    </van-dropdown-menu>
    <Add></Add>
  </div>
</template>

<script>
import $ from "jquery";
import Add from "@/components/add.vue";
export default {
  data() {
    return {
      value1: 0,
      value2: 0,
      option1: [
        { text: "全城", value: 0 },
        { text: "西城区", value: 1 },
        { text: "东城区", value: 2 }
      ],
      option2: [{ text: "最近去过", value: 0 }, { text: "离我最近", value: 1 }],
      ID: "",
      list: [],
      time: []
    };
  },
  methods: {
    Action(i, e) {
      var e = e || window.event;
      // console.log(i);
      // console.log(e.path[0]);
      $(".day li").attr("class", "");
      e.path[0].className = "action";
    }
  },
  updated() {
    document.getElementsByClassName("li")[0].className = "action";
  },
  mounted() {
    this.ID = this.$route.query.Id;
    // console.log(this.ID);

    // 标题栏 名字
    var url = "https://m.maizuo.com/gateway?filmId=" + this.ID + "&k=4487496";
    this.$axios({
      url: url,
      method: "GET",
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"15734547965132485919205","bc":"110100"}',
        "X-Host": "mall.film-ticket.film.info"
      }
    }).then(res => {
      // console.log(res);
      this.list = res.data.data.film;
      // console.log(this.list);

      // 获取 时间
      // console.log(this.list.premiereAt);
      var time = new Date().getTime(); // 总毫秒数

      function getMyDate(str) {
        var Time = [];
        for (let i = 0; i < 7; i++) {
          var oDate = new Date(str),
            oMonth = oDate.getMonth() + 1,
            oDay = oDate.getDate(),
            oTime = addZero(oMonth) + "月" + (addZero(oDay) * 1 + i * 1) + "日";

          Time.push(oTime);
        }
        // console.log(Time);
        return Time;
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
    });
  },
  components: {
    Add
  }
};
</script>

<style scoped lang="scss">
#one {
  width: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  .van-icon,
  .van-icon-arrow-left,
  .van-nav-bar__arrow {
    color: gray;
    font-size: 25px;
  }
}
.day {
  margin-top: 46px;
  display: flex;
  overflow: hidden;
  overflow-x: visible;
  height: 50px;

  li {
    padding: 0 15px;
    white-space: nowrap;
    line-height: 50px;
    position: relative;
  }
}
.day::-webkit-scrollbar {
  // 让 横向滚动条 消失
  display: none;
}
.action {
  color: #ff5f16;
}
</style>