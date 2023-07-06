<template>
    <div class="sidebar_box">
        <el-tabs v-model="editableTabsValue" tab-position="left" type="border-card" class="sidebar_tabs"
            @tab-click="handleTabpane">
            <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
                <div class="pane_title">{{ item.content }}</div>
                <el-collapse class="pane_compute" v-if="item.children" v-for="(subItem, subIndex) in item.children">
                    <el-collapse-item class="pane_card" :title="subItem.content">
                        <div class="pane_card_content" v-if="subItem.children"
                            v-for="(grandItem, grandIndex) in subItem.children">
                            <span class="compute_item">{{ grandItem.content }}</span>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
    
<script setup>
import { ref, onMounted } from "vue";

import { exportFormula } from "../uitls/index"

const editableTabsValue = ref('rf')
const editableTabs = ref([])

const handleTabpane = (e) => {
    console.log(e.props)
}

onMounted(() => {
    editableTabs.value = exportFormula()
});
</script>
    
<style src="@/style/sidebar.scss"  lang="scss"></style>
<style lang="scss"></style>
  