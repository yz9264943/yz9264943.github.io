<template>
  <div id="box"></div>
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
      url: "https://m.maizuo.com/gateway?actId=ElzMZU125260",
      method: "GET",
      headers: {
        "X-Client-Info": "",
        "X-Host": "mall.act.static-page.info"
      }
    }).then(res => {
      // console.log(res);
      this.list = res.data.data;
      // console.log(this.list);
      document.getElementById("box").innerHTML = this.list.data.content;
    });
  }
};
</script>

<style scoped lang="scss">
#box {
  width: 100%;
  background-color: #fff;
}
</style>
