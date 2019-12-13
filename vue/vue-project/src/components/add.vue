<template>
  <div class="add">
    <ul>
      <li v-for="(n,i) in list" :key="i">
        <div class="left">
          <span>{{n.name}}</span>
          <span>{{n.address}}</span>
        </div>
        <div class="right">
          <p>
            ￥
            <span>{{n.lowPrice}}</span>&nbsp;起
          </p>
          <p>距离未知</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: {}
    };
  },
  mounted() {
    this.$axios({
      url: "https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=8744863",
      method: "GET",
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"15734547965132485919205"}',
        "X-Host": "mall.film-ticket.cinema.list"
      }
    }).then(res => {
      // console.log(res);
      this.list = res.data.data.cinemas;
      // console.log(this.list);
      for (let i = 0; i < this.list.length; i++) {
        var lowPrice = this.list[i].lowPrice / 100;
        // console.log(lowPrice);
        this.list[i].lowPrice = lowPrice;
      }
      // console.log(this.list)
    });
  }
};
</script>

<style scoped lang="scss">
ul {
  margin-bottom: 50px;
}
li {
  width: 100%;
  padding: 15px;
  height: 75px;
  box-sizing: border-box;
  background-color: #fff;
  .left {
    width: calc(100% - 65px);
    height: 100%;
    float: left;
    span {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      display: block;
      max-width: 80%;
      float: left;
    }
    span:nth-child(1) {
      color: #191a1b;
      font-size: 15px;
    }
    span:nth-child(2) {
      color: #797d82;
      font-size: 12px;
      margin-top: 5px;
    }
  }
  .right {
    float: right;
    p:nth-child(1) {
      color: #ff5f16;
      font-size: 10px;
      span {
        font-size: 15px;
      }
    }
    p:nth-child(2) {
      color: #797d82;
      font-size: 12px;
      margin-top: 5px;
    }
  }
}
</style>
