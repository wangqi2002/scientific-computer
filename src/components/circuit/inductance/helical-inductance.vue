<template>
    <div class="welcome_box">
        {{ msg }}
    </div>
</template>
    
<script setup>
import { ref } from "vue";

const msg = ref("hello world, helical-inductance");

</script>
<style lang="scss"></style>
  