<template>
  <el-container class="container_box">
    <el-aside class="option_box">
      <Sidebar></Sidebar>
    </el-aside>
    <el-main class="content_box">
      hhh
    </el-main>
  </el-container>
</template>

<script setup>
import { ref, provide, onMounted } from "vue";

import Sidebar from "@/components/Sidebar.vue";


onMounted(() => {
});
</script>
<style lang="scss">
$option: 250px;

* {
  padding: 0;
  margin: 0;
}

.container_box {
  width: 100%;
  height: 100%;

  .option_box {
    width: $option;
  }

  .content_box {
    width: calc(100% - $option);
    height: 100%;
    padding: 0;
    overflow: hidden;
  }
}
</style>
