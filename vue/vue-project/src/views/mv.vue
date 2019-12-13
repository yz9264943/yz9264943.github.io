<template>
  <div class="box">
    <imgList></imgList>
    <Nav></Nav>
  </div>
</template>

<script>
import imgList from "@/components/banner.vue";
import Nav from "@/components/Nav.vue";
export default {
  data() {
    return {};
  },
  components: {
    imgList,
    Nav,
  }
};
</script>
