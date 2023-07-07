<template>
    <div class="welcome_box">
        <h1>{{ msg }}</h1>
    </div>
</template>
    
<script setup>
import { ref } from "vue";

const msg = ref("hello world, welcome");

</script>
<style lang="scss"></style>
  