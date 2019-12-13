<template>
  <div class="nav">
    <ul class="mv">
      <li class="con" v-for="(l,i) in list" :key="i" @click="mvList(i,l.filmId)">
        <img :src="l.poster" alt />
        <div class="content">
          <p class="title">
            {{l.name}}
            <span>{{l.item.name}}</span>
          </p>
          <p>
            <span>主演：</span>
            <span v-for="(n,j) in l.actors" :key="j">{{n.name }}&nbsp;</span>
          </p>
          <p>上映日期：{{l.premiereAt}}</p>
        </div>
        <div class="buy">预购</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  mounted() {
    this.$axios({
      url:
        "https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=2&k=7085711",
      method: "GET",
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"15734547965132485919205"}',
        "X-Host": "mall.film-ticket.film.list"
      }
    }).then(res => {
      // console.log(res)
      this.list = res.data.data.films;
      // console.log(this.list);
      for (let i = 0; i < this.list.length; i++) {
        var premiereAt = this.list[i].premiereAt;
        // console.log(premiereAt + "+" + i);
        // 获取 时间
        var time = premiereAt * 1000; // 总毫秒数
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

        this.list[i].premiereAt = getMyDate(parseInt(time));; // 重新将 日期 赋值给 list
      }
    });
  },
  methods: {
    mvList(i, Id) {
      // console.log(i, Id);
      this.$router.push({ name: "mvlist", query: { Id: Id } });
    }
  }
};
</script>

<style scoped lang="scss">
.mv {
  margin-bottom: 50px;
  background-color: #fff;
  .con {
    padding: 15px 15px 15px 15px;
    height: 94px;
    display: flex;
    img {
      width: 66px;
      height: 94px;
    }
    .content {
      padding: 0px 10px;
      text-align: left;
      width: calc(100% - 136px);
      p {
        font-size: 13px;
        margin-top: 4px;
        color: #797d82;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .mark {
          color: #ffb232;
          font-size: 14px;
        }
      }
      .title {
        color: #191a1b;
        font-size: 16px;
        height: 22px;
        line-height: 22px;
        margin-right: 5px;
        margin-bottom: 17px;
        span {
          display: inline-block;
          font-size: 9px;
          color: #fff;
          background-color: #d2d6dc;
          height: 14px;
          line-height: 14px;
          padding: 0 2px;
          border-radius: 2px;
        }
      }
    }
    .buy {
      line-height: 25px;
      height: 25px;
      width: 50px;
      color: #ffb232;
      font-size: 13px;
      text-align: center;
      border: 1px solid #ffb232;
      border-radius: 2px;
      margin-top: 35px;
    }
  }
}
</style>
