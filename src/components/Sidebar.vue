<template>
    <div class="sidebar_box">
        <el-tabs v-model="sidebarTabsValue" tab-position="left" type="border-card" class="sidebar_tabs"
            @tab-click="handleTabpane">
            <el-tab-pane v-for="item in sidebarTabs" :key="item.name" :label="item.title" :name="item.name">
                <div class="pane_box" v-if="item.name === 'welcome'">{{ item.content }}</div>
                <div class="pane_box" v-else>
                    <div class="pane_title">{{ item.content }}</div>
                    <div class="pane_compute">
                        <el-collapse v-if="item.children" v-for="(subItem, subIndex) in item.children">
                            <el-collapse-item class="pane_card" :title="subItem.content">
                                <div class="pane_card_content" v-if="subItem.children"
                                    v-for="(grandItem, grandIndex) in subItem.children">
                                    <img class="compute_icon" src="../assets/point.svg" />
                                    <router-link class="compute_item" :to="{
                                        name: grandItem.name
                                    }">{{ grandItem.content }}</router-link>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
    
<script setup>
import { ref, onMounted } from "vue";

import { exportFormula } from "../uitls/index"

const sidebarTabsValue = ref('welcome')
const sidebarTabs = ref([])

const handleTabpane = (e) => {
    let sidebar = document.querySelector(".sidebar_box")
    let tabpane = document.querySelector(".sidebar_tabs .el-tabs__content")
    if (e.props.name === sidebarTabsValue.value) {
        sidebar.style.width = 100 + 'px'
    } else {
        sidebar.style.width = 400 + 'px'
    }
}

onMounted(() => {
    sidebarTabs.value = exportFormula()
});
</script>
    
<style src="@/style/sidebar.scss"  lang="scss"></style>
<style lang="scss"></style>
  