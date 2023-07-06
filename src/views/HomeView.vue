<template>
  <el-container class="container_box">
    <el-aside class="sidebar_box">
      <Sidebar></Sidebar>
    </el-aside>
    <el-main class="content_box">
      <Compute></Compute>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref, provide, onMounted } from "vue";

import Sidebar from "@/components/Sidebar.vue";
import Compute from "@/components/computeView.vue";


onMounted(() => {
});
</script>
<style lang="scss">
* {
  padding: 0;
  margin: 0;
}

.container_box {
  width: 100vw;
  height: 100vh;
  display: flex;

  .sidebar_box {
    height: 100%;
  }

  .content_box {
    flex: 1;
    height: 100%;
    padding: 0;
    overflow: hidden;
  }
}
</style>
