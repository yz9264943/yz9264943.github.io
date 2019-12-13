<template>
  <div>
    <router-view class="main"></router-view>
    <van-grid id="foot" clickable :column-num="4">
      <router-link to="/main/mv">
        <van-grid-item icon="play-circle-o" text="电影" />
      </router-link>
      <router-link to="/main/mh">
        <van-grid-item icon="video-o" text="影院" />
      </router-link>
      <router-link to="/main/mn">
        <van-grid-item icon="comment-o" text="资讯" />
      </router-link>
      <router-link to="/main/my">
        <van-grid-item icon="contact" text="我的" />
      </router-link>
    </van-grid>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
#foot {
  width: 100%;
  height: 50px;
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1;
  background-color: #fff;
  a {
    flex: 1;
    color: #797d82;
    .van-grid-item__content {
      padding: 5px 0 0 0;
      .van-grid-item__text {
        margin: 0;
      }
    }
  }
}
.router-link-exact-active,
.router-link-active {
  .van-grid-item {
    color: #ff5f16;
  }
  .van-grid-item__text {
    color: #ff5f16;
  }
}
</style>

