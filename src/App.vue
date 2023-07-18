<template>
  <div id="app">
    <Home></Home>
  </div>
</template>

<script setup>
import { ref, provide, onMounted } from "vue";

import Home from "@/views/HomeView.vue";


onMounted(() => {
});
</script>

<style lang="scss">
#app {
  font-family: 'Times New Roman', Times, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  user-select: none;
  color: #2c3e50;

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  ::-webkit-scrollbar-track {
    width: 6px;
    background: rgba(#101F1C, 0.1);
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(144, 147, 153, .5);
    background-clip: padding-box;
    min-height: 28px;
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em;
    transition: background-color .3s;
    cursor: pointer;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(144, 147, 153, .3);
  }
}
</style>
