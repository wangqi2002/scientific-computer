<template>
    <div class="compute_box">
        <div class="compute_title">{{ title }}</div>
        <div class="compute_content">
            <div class="microstrip_line_CI">
                <div class="top">
                    <div class="top_left top_card">
                        <div class="line_title">关于相对介电常数εr 与等效介电常数εeff</div>
                        <img class="line_img" src="@/assets/rf/weidaixianzukang02.jpg">
                    </div>
                    <div class="top_right top_card">
                        <div class="line_title">关于微带线特征阻抗Zo</div>
                        <img class="line_img" src="@/assets/rf/weidaixianzukang03.jpg">
                    </div>
                    <!-- <div class="line">
                        <div class="line_title">图示</div>
                        <img class="line_img_little">
                    </div> -->
                </div>
                <div class="bottom">
                    <div class="bottom_top">
                        <img class="bottom_img" src="@/assets/rf/weidaixianzukang01.jpg">
                    </div>
                    <div class="bottom_bottom">
                        <table cellspacing="0" cellpadding="0" border="0">
                            <col width="500px">
                            <tr>
                                <td>
                                    <span class="first_span">相对介电常数 εr </span>
                                    <input class="td_input" type="number" v-model="RelativeDielectricConstant_value">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span class="first_span">微带线线宽 W</span>
                                    <input class="td_input" type="number" v-model="TrackWidth_value">
                                    <span class="second_span">毫米</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span class="first_span">微带线厚度 t</span>
                                    <input class="td_input" type="number" v-model="TrackThickness_value">
                                    <span class="second_span">毫米&nbsp;&nbsp;&nbsp;等效介电常数 (εeff): </span>
                                    <input class="td_input" type="number" v-model="Eeff_value">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span class="first_span">介质层厚度 h</span>
                                    <input class="td_input" type="number" v-model="DielectricThickness_value">
                                    <span class="second_span">毫米&nbsp;&nbsp;&nbsp;特征阻抗 (Zo): </span>
                                    <input class="td_input" type="number" v-model="Impedance_value">
                                    欧姆
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button class="btn" @click="handleClear">清空</button>
                                    <button class="btn" @click="handleCompute">计算</button>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
import { ref } from "vue";
import { ElMessage } from 'element-plus'

import {
    microstripCI
} from "@/uitls/compute/rf/transmissionLine"

const title = ref("微带线特征阻抗计算器");

const RelativeDielectricConstant_value = ref(0.5)
const TrackWidth_value = ref(0.5)
const TrackThickness_value = ref(0.5)
const DielectricThickness_value = ref(0.5)
const Eeff_value = ref()
const Impedance_value = ref()

const getFormData = () => {
    let formData = {
        RelativeDielectricConstant: RelativeDielectricConstant_value.value,
        TrackWidth: TrackWidth_value.value,
        TrackThickness: TrackThickness_value.value,
        DielectricThickness: DielectricThickness_value.value,
        Eeff: Eeff_value.value,
        Impedance: Impedance_value.value
    }
    return formData
}
const setFormData = (formData) => {
    if (formData.RelativeDielectricConstant !== undefined) {
        RelativeDielectricConstant_value.value = formData.RelativeDielectricConstant
    }
    if (formData.TrackWidth !== undefined) {
        TrackWidth_value.value = formData.TrackWidth
    }
    if (formData.TrackThickness !== undefined) {
        TrackThickness_value.value = formData.TrackThickness
    }
    if (formData.DielectricThickness !== undefined) {
        DielectricThickness_value.value = formData.DielectricThickness
    }
    if (formData.Eeff !== undefined) {
        Eeff_value.value = formData.Eeff
    }
    if (formData.Impedance !== undefined) {
        Impedance_value.value = formData.Impedance
    }
}

const handleCompute = () => {
    let formData = getFormData()
    if ((formData.RelativeDielectricConstant !== undefined && formData.RelativeDielectricConstant !== '') && (formData.TrackWidth !== undefined && formData.TrackWidth !== '') && (formData.TrackThickness !== undefined && formData.TrackThickness !== '') && (formData.DielectricThickness !== undefined && formData.DielectricThickness !== '')) {
        setFormData(microstripCI(formData))
    } else {
        ElMessage('请输入完整的数据')
    }
}
const handleClear = () => {
    RelativeDielectricConstant_value.value = ''
    TrackWidth_value.value = ''
    TrackThickness_value.value = ''
    DielectricThickness_value.value = ''
    Eeff_value.value = ''
    Impedance_value.value = ''
}
</script>

<style src="@/style/compute.scss" lang="scss"></style>
<style src="@/style/rf/transmissionLine.scss" lang="scss"></style>
<style lang="scss"></style>
  