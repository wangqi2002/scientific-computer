<template>
    <div class="welcome_box">
        <h1>{{ msg }}</h1>
    </div>
</template>
    
<script setup>
import { ref } from "vue";

const msg = ref("Welcome to Scientific Computer");

</script>
<style lang="scss">
.welcome_box {
    margin: 200px 100px;
}
</style>
  