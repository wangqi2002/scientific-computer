<template>
    <div class="compute_box">
        <div class="compute_title">{{ title }}</div>
        <div class="compute_content">
            <div class="">
                <div class="top"></div>
                <div class="bottom"></div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
import { ref } from "vue";

const title = ref("驻波系数、dBm、dBμV、dBmW、V换算表");

</script>

<style src="@/style/compute.scss" lang="scss"></style>
<style src="@/style/rf/transmissionLine.scss" lang="scss"></style>
<style lang="scss"></style>
  