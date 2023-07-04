<template>
    <div class="option_box">
        <div class="title_box">多用报表</div>
        <div class="download_box">
            <el-divider>报表导出</el-divider>
            <button class="download_btn" @click="downloadReport">导出报表</button>
            <button class="print_btn" @click="printReport">打印报表</button>
        </div>
    </div>
</template>
    
<script setup>
import { ref } from "vue";

const jsonData = ref({});


const downloadReport = () => {
    window.print();
};
const printReport = () => {
    window.print();
};
</script>
    
<style src="@/style/option.scss"  lang="scss"></style>
<style lang="scss"></style>
  