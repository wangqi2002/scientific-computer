<template>
    <div class="compute_box">
        <div class="compute_title">{{ title }}</div>
        <div class="compute_content">
            <div class="Coplanar_strips">
                <div class="top">
                    <div class="top_top line">
                        <table cellspacing="0" cellpadding="0" border="0">
                            <col width="240px">
                            <col width="180px">
                            <tr>
                                <td rowspan="4">
                                    <img class="slit_img" src="@/assets/rf/Coplanar-strips.gif" />
                                </td>
                                <td>
                                    <span class="top_span"><b>er</b></span>
                                    <input class="small_input" type="number" v-model="er_value" @change="" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span class="top_span"><b>s</b></span>
                                    <input class="small_input" type="number" v-model="s_value" @change="" />
                                    [mm]
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span class="top_span"><b>h</b></span>
                                    <input class="small_input" type="number" v-model="h_value" @change="" />
                                    [mm]
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span class="top_span"><b>fo</b></span>
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
                        <span class="bottom_span"><b>er eff</b></span>
                        <input class="small_input" type="number" v-model="ef_value" @change="" />
                        <span class="bottom_span"><b>k</b></span>
                        <input class="small_input" type="number" v-model="k_value" @change="" />
                        <span class="bottom_span"><b>lambda/4</b></span>
                        <input class="small_input" type="number" v-model="l4_value" @change="" />
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

                    <p><b>[注]超出以下范围，计算精度会变差。</b>
                        <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* er=2.2~9.7—W/lambda: 0.0015~1.0
                        <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* er=9.7~20.0—W/h: 0.020~1.0
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
import { ref } from "vue";
import { ElMessage } from 'element-plus'

import {
    CoplanarAnalyze,
    CoplanarSvnthesis
} from "@/uitls/compute/rf/transmissionLine"

const title = ref("共面带线计算器 | Coplanar Strips Calculator");

const er_value = ref()
const s_value = ref()
const h_value = ref()
const f_value = ref()
const W_value = ref()
const Zo_value = ref()
const Z_value = ref()
const WW_value = ref()
const ef_value = ref()
const k_value = ref()
const l4_value = ref()


const getFormData = () => {
    let formData = {
        er: er_value.value,
        s: s_value.value,
        h: h_value.value,
        f: f_value.value,
        W: W_value.value,
        Zo: Zo_value.value,
        Z: Z_value.value,
        WW: WW_value.value,
        // ef: ef_value.value,
        // k: k_value.value,
        // l4: l4_value.value
    }
    return formData
}
const setFormData = (formData) => {
    if (formData.er !== undefined) {
        er_value.value = formData.er
    }
    if (formData.s !== undefined) {
        s_value.value = formData.s
    }
    if (formData.h !== undefined) {
        h_value.value = formData.h
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
    if (formData.ef !== undefined) {
        ef_value.value = formData.ef
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
    if ((formData.er !== undefined && formData.er !== '') || (formData.s !== undefined && formData.s !== '') || (formData.h !== undefined && formData.h !== '') || (formData.f !== undefined && formData.f !== '')) {
        setFormData(CoplanarAnalyze(formData))
    } else {
        ElMessage('请输入数据')
    }
}
const handleSvnthesis = () => {
    let formData = getFormData()
    if ((formData.er !== undefined && formData.er !== '') || (formData.s !== undefined && formData.s !== '') || (formData.h !== undefined && formData.h !== '') || (formData.f !== undefined && formData.f !== '')) {
        setFormData(CoplanarSvnthesis(formData))
    } else {
        ElMessage('请输入数据')
    }
}
const handleClear = () => {
    er_value.value = ''
    s_value.value = ''
    h_value.value = ''
    f_value.value = ''
    W_value.value = ''
    Zo_value.value = ''
    Z_value.value = ''
    WW_value.value = ''
    ef_value.value = ''
    k_value.value = ''
    l4_value.value = ''
}

</script>

<style src="@/style/compute.scss" lang="scss"></style>
<style src="@/style/rf/transmissionLine.scss" lang="scss"></style>
<style lang="scss"></style>
  