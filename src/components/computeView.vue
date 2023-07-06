<template>
    <div class="compute_box">
        <transition name="router-fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
    
<script setup>
import { ref } from "vue";

const msg = ref("hello world, compute");

</script>
    
<style src="@/style/compute.scss"  lang="scss"></style>
<style lang="scss"></style>
  