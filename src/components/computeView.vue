<template>
    <div class="compute">
        <!-- <transition name="router-fade" mode="out-in">
            <router-view></router-view>
        </transition> -->
        <router-view v-slot="{ Component }">
            <transition name="router-fade" mode="out-in">
                <keep-alive>
                    <component :is="Component" />
                </keep-alive>
            </transition>
        </router-view>
    </div>
</template>
    
<script setup>
import { ref } from "vue";

const msg = ref("hello world, compute");

</script>
    
<style src="@/style/computeView.scss"  lang="scss"></style>
<style lang="scss"></style>
  