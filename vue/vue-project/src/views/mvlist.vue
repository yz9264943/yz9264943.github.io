<template>
  <div class="box">
    <div class="nav">
      <img @click="$router.go(-1)" src="../assets/left.png" alt />
    </div>
    <div class="maximg">
      <img :src="mvList.poster" alt />
    </div>
    <div class="content">
      <div class="head">
        <div class="left">
          {{mvList.name}}
          <span>{{mvList.item.name}}</span>
        </div>
        <div class="right">
          <i>{{mvList.grade}}</i>
          <span v-if="mvList.grade">分</span>
          <span v-else></span>
        </div>
      </div>
      <div class="plot">{{mvList.category.replace("|"," | ")}}</div>
      <div class="hour">{{time}} 上映</div>
      <div class="region">{{mvList.nation}} | {{mvList.runtime}}分钟</div>
      <div id="neirong" class="txt">{{mvList.synopsis}}</div>
      <div class="toggle">
        <img id="img" @click="conInfo" class src="../assets/toggle.png" alt />
      </div>
    </div>
    <div class="performer">
      <div>
        <span>演职人员</span>
      </div>
      <ul>
        <li v-for="(n,i) in mvList.actors" :key="i">
          <div>
            <img :src="n.avatarAddress" alt />
          </div>
          <div>
            <p>{{n.name}}</p>
            <p>{{n.role}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="stills">
      <div>
        <span>剧照</span>
      </div>
      <ul v-if="mvList.photos">
        <li v-for="(m,i) in mvList.photos" :key="i">
          <img :src="m" alt />
        </li>
      </ul>
      <ul v-else>
        <div class="not">暂无电影剧照</div>
      </ul>
    </div>
    <div @click="gotoCinemas" class="foot">选座购票</div>
  </div>
</template>


<script>
import $ from "jquery";
export default {
  data() {
    return {
      ID: "",
      mvList: [],
      time: "",
      flag: false,
    };
  },
  methods: {
    conInfo() {
      // console.log($("#img"));
      this.flag = !this.flag;
      // console.log(this.flag);
      if (this.flag) {
        $("#img").attr("class", "upper");
        $("#neirong").css({ height: "auto" });
      } else {
        $("#img").attr("class", "");
        $("#neirong").css({ height: "38px" });
      }
    },
    gotoCinemas() {
      this.$router.push({ name: "cinemas", query: { Id: this.ID } });
    }
  },
  mounted() {
    this.ID = this.$route.query.Id;
    // console.log(this.ID);
    // console.log(
    //   "https://m.maizuo.com/gateway?filmId=" + this.ID + "&k=4487496"
    // );
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
      this.mvList = res.data.data.film;
      // console.log(this.mvList);

      // 获取 时间
      //   console.log(this.mvList.premiereAt);
      var time = this.mvList.premiereAt * 1000; // 总毫秒数

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
      this.time = getMyDate(parseInt(time));
      //   console.log(this.time);
    });
  }
};
</script>


<style scoped lang="scss">
.box {
  height: 100%;
  width: 100%;
  background-color: #f4f4f4;
}
.nav {
  position: fixed;
  width: 100%;
  height: 44px;
  top: 0;
  left: 0;
  z-index: 1;
  img {
    width: 30px;
    height: 30px;
    margin: 5px;
  }
}
.maximg {
  width: 100%;
  height: 56vw;
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
    position: absolute;
    // top: -82%;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    -o-transform: translateY(-50%);
  }
}
.content {
  padding: 12px 15px 15px;
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  text-align: left;
  font-size: 13px;
  color: #797d82;
  line-height: 20px;
  margin-bottom: 10px;
  div {
    margin-top: 4px;
  }
  .head {
    font-size: 18px;
    overflow: hidden;
    margin-top: 0px;
    .left {
      float: left;
      color: #191a1b;
      span {
        font-size: 9px;
        color: #fff;
        background-color: #d2d6dc;
        height: 14px;
        line-height: 14px;
        padding: 0 2px;
        border-radius: 2px;
        float: right;
        margin: 5px;
      }
    }
    .right {
      float: right;
      color: #ffb232;
      span {
        font-size: 10px;
        margin-left: 5px;
      }
    }
  }
  .txt {
    margin-top: 12px;
    height: 38px;
    overflow: hidden;
  }
  .toggle {
    height: 16px;
    img {
      width: 8px;
      height: 4px;
      margin: 0 auto;
    }
    .upper {
      transform: rotate(180deg);
    }
  }
}
.performer {
  background-color: #fff;
  margin-bottom: 10px;
  div:nth-child(1) {
    padding: 15px;
    text-align: left;
    font-size: 16px;
  }
  ul::-webkit-scrollbar {
    // 让 横向滚动条 消失
    display: none;
  }
  ul {
    width: 100%;
    padding-left: 15px;
    height: 140px;
    box-sizing: border-box;
    display: flex;
    overflow: hidden;
    overflow-x: visible;
    li {
      margin-right: 10px;
      width: 85px;
      min-width: 85px;
      position: relative;
      img {
        width: 100%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
      }
      div:nth-child(1) {
        width: 85px;
        height: 85px;
        padding: 0px;
        position: absolute;
        overflow: hidden;
        top: 0;
      }
      div:nth-child(2) {
        position: absolute;
        bottom: 15px;
        left: 0;
        width: 100%;
        text-align: center;
        p {
          overflow: hidden;
          -o-text-overflow: ellipsis;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        p:nth-child(1) {
          font-size: 12px;
          color: #191a1b;
        }
        p:nth-child(2) {
          margin-top: 2px;
          font-size: 10px;
          color: #797d82;
        }
      }
    }
  }
}
.stills {
  margin-bottom: 60px;
  div {
    background-color: #fff;
    height: 62px;
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
    text-align: left;
  }
  ul::-webkit-scrollbar {
    // 让 横向滚动条 消失
    display: none;
  }
  ul {
    height: 115px;
    padding-left: 10px;
    box-sizing: border-box;
    display: flex;
    overflow: hidden;
    overflow-x: visible;
    background-color: #fff;
    li {
      width: 150px;
      min-width: 150px;
      margin-right: 10px;
      height: 100px;
      img {
        width: 100%;
        margin-top: 6px;
      }
    }
    .not {
      width: 100%;
      height: 100%;
      text-align: center;
      font-size: 14px;
      color: #bdc0c5;
    }
  }
}
.foot {
  height: 50px;
  width: 100%;
  background-color: red;
  color: #fff;
  line-height: 50px;
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>

