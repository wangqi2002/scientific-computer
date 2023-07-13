<template>
    <div class="compute_box">
        <div class="compute_title">{{ title }}</div>
        <div class="compute_content">
            <div class="strip_line">
                <div class="top">
                    <div class="top_top line">
                        <table cellspacing="0" cellpadding="0" border="0">
                            <col width="240px">
                            <col width="180px">
                            <tr>
                                <td rowspan="4">
                                    <img class="slit_img" src="@/assets/rf/strip_line.gif" />
                                </td>
                                <td>
                                    <span class="top_span"><b>er</b></span>
                                    <input class="small_input" type="number" v-model="er_value" @change="" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span class="top_span"><b>b</b></span>
                                    <input class="small_input" type="number" v-model="b_value" @change="" />
                                    [mm]
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span class="top_span"><b>t</b></span>
                                    <input class="small_input" type="number" v-model="t_value" @change="" />
                                    [um]
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span class="top_span"><b>f</b></span>
                                    <input class="small_input" type="number" v-model="f_value" @change="" />
                                    [MHz]
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="top_middle line">
                        <table cellspacing="0" cellpadding="0" border="0">
                            <col width="500px">
                            <tr>
                                <td>
                                    <span class="middle_span" style="width:20px"><b>W</b></span>
                                    <input class="small_input" type="number" v-model="W_value" @change="" />
                                    <span class="middle_span" style="width:40px">[mm]</span>
                                    <button class="btn" @click="handleAnalyze">Analyze</button>
                                    <span class="middle_span" style="width:55px"><b>>>> Zo</b></span>
                                    <input class="big_input" type="number" v-model="Zo_value" @change="" />
                                    <span class="middle_span" style="width:40px">[ohm]</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span class="middle_span" style="width:20px"><b>Zo</b></span>
                                    <input class="small_input" type="number" v-model="Z_value" @change="" />
                                    <span class="middle_span" style="width:40px">[ohm]</span>
                                    <button class="btn" @click="handleSvnthesis">Svnthesis</button>
                                    <span class="middle_span" style="width:55px"><b>>>> W</b></span>
                                    <input class="big_input" type="number" v-model="WW_value" @change="" />
                                    <span class="middle_span" style="width:40px">[mm]</span>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="top_bottom line">
                        <span class="bottom_span"><b>k</b></span>
                        <input class="big_input" type="number" v-model="k_value" @change="" />
                        <span class="bottom_span"><b>lambda/4</b></span>
                        <input class="big_input" type="number" v-model="l4_value" @change="" />
                        [mm]
                        <div style="margin-top: 20px;">
                            <button class="btn" style="width:100px; height:30px" @click="handleClear">清空</button>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <b>[如何使用]</b>
                    <p>1. &nbsp;输入电路板参数和中心频率。</p>
                    <p>2.
                        <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(1)当计算线宽(w)的特性阻抗(Zo)时。
                        输入w，然后点击[Analyze]按钮。
                        <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(2)计算特性阻抗(Zo)的线宽(w)时。
                        输入Zo，点击[Svnthesis]按钮。
                    </p>
                    <p>3.给出了计算结果。</p>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
import { ref } from "vue";
import { ElMessage } from 'element-plus'

import {
    stripAnalyze,
    stripSvnthesis
} from "@/uitls/compute/rf/transmissionLine"

const title = ref("带状线计算工具 | Strip Line Calculator");

const er_value = ref()
const b_value = ref()
const t_value = ref()
const f_value = ref()
const W_value = ref()
const Zo_value = ref()
const Z_value = ref()
const WW_value = ref()
const k_value = ref()
const l4_value = ref()

const getFormData = () => {
    let formData = {
        er: er_value.value,
        b: b_value.value,
        t: t_value.value,
        f: f_value.value,
        W: W_value.value,
        Zo: Zo_value.value,
        Z: Z_value.value,
        WW: WW_value.value,
        k: k_value.value,
        l4: l4_value.value
    }
    return formData
}
const setFormData = (formData) => {
    if (formData.er !== undefined) {
        er_value.value = formData.er
    }
    if (formData.b !== undefined) {
        b_value.value = formData.b
    }
    if (formData.t !== undefined) {
        t_value.value = formData.t
    }
    if (formData.f !== undefined) {
        f_value.value = formData.f
    }
    if (formData.W !== undefined) {
        W_value.value = formData.W
    }
    if (formData.Zo !== undefined) {
        Zo_value.value = formData.Zo
    }
    if (formData.Z !== undefined) {
        Z_value.value = formData.Z
    }
    if (formData.WW !== undefined) {
        WW_value.value = formData.WW
    }
    if (formData.k !== undefined) {
        k_value.value = formData.k
    }
    if (formData.l4 !== undefined) {
        l4_value.value = formData.l4
    }
}

const handleAnalyze = () => {
    let formData = getFormData()
    if ((formData.er !== undefined && formData.er !== '') || (formData.b !== undefined && formData.b !== '') || (formData.t !== undefined && formData.t !== '') || (formData.f !== undefined && formData.f !== '')) {
        setFormData(stripAnalyze(formData))
    } else {
        ElMessage('请输入数据')
    }
}
const handleSvnthesis = () => {
    let formData = getFormData()
    if ((formData.er !== undefined && formData.er !== '') || (formData.b !== undefined && formData.b !== '') || (formData.t !== undefined && formData.t !== '') || (formData.f !== undefined && formData.f !== '')) {
        setFormData(stripSvnthesis(formData))
    } else {
        ElMessage('请输入数据')
    }
}
const handleClear = () => {
    er_value.value = ''
    b_value.value = ''
    t_value.value = ''
    f_value.value = ''
    W_value.value = ''
    Zo_value.value = ''
    Z_value.value = ''
    WW_value.value = ''
    k_value.value = ''
    l4_value.value = ''
}
</script>

<style src="@/style/compute.scss" lang="scss"></style>
<style src="@/style/rf/transmissionLine.scss" lang="scss"></style>
<style lang="scss"></style>
  