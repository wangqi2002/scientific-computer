<template>
    <div class="welcome_box">
        {{ msg }}
    </div>
</template>
    
<script setup>
import { ref } from "vue";

const msg = ref("hello world, dBm-dBμV-dBmW-V");

</script>
<style lang="scss"></style>
  