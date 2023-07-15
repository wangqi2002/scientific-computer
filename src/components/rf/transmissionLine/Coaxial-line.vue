<template>
    <div class="compute_box">
        <div class="compute_title">{{ title }}</div>
        <div class="compute_content">
            <div class="coaxial_line">
                <div class="top">
                    <div class="top_top line">
                        <table cellspacing="0" cellpadding="0" border="0">
                            <col width="240px">
                            <col width="180px">
                            <tr>
                                <td rowspan="3">
                                    <img class="slit_img" src="@/assets/rf/coaxial_line.gif" />
                                </td>
                                <td>
                                    <span class="top_span"><b>er</b></span>
                                    <input class="small_input" type="number" v-model="er_value" @change="" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span class="top_span"><b>d</b></span>
                                    <input class="small_input" type="number" v-model="a_value" @change="" />
                                    [mm]
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span class="top_span"><b>D</b></span>
                                    <input class="small_input" type="number" v-model="b_value" @change="" />
                                    [mm]
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="top_middle line">
                        <table cellspacing="0" cellpadding="0" border="0">
                            <col width="180px">
                            <col width="320px">
                            <tr>
                                <td colspan="2">
                                    <button class="btn" @click="handleAnalyze">Analyze</button>
                                    <span class="middle_span" style="width:55px"><b>>>> Zo</b></span>
                                    <input class="big_input" type="number" v-model="Zo_value" @change="" />
                                    <span class="middle_span" style="width:40px">[ohm]</span>
                                </td>
                            </tr>
                            <tr>
                                <td rowspan="2">
                                    <span class="middle_span" style="width:20px"><b>Zo</b></span>
                                    <input class="small_input" type="number" v-model="Z_value" @change="" />
                                    <span class="middle_span" style="width:40px">[ohm]</span>
                                </td>
                                <td>
                                    <span class="middle_span"><b>Input d >>> Synthesis D :</b></span>
                                    <button class="btn" @click="handleSvnthesis1">Svnthesis(D)</button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span class="middle_span"><b>Input D >>> Synthesis d :</b></span>
                                    <button class="btn" @click="handleSvnthesis2">Svnthesis(d)</button>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="top_bottom line">
                        <table cellspacing="0" cellpadding="0" border="0">
                            <col span="2" width="250px">
                            <tr>
                                <td>
                                    <span class="bottom_span"><b>C</b></span>
                                    <input class="middle_input" type="number" v-model="Cap_value" @change="" />
                                    [pF/m]
                                </td>
                                <td>
                                    <span class="bottom_span"><b>L</b></span>
                                    <input class="middle_input" type="number" v-model="Ind_value" @change="" />
                                    [nH/m]
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span class="bottom_span"><b>Vp</b></span>
                                    <input class="middle_input" type="number" v-model="Vp_value" @change="" />
                                    [km/s]
                                </td>
                                <td>
                                    <span class="bottom_span"><b>Td</b></span>
                                    <input class="middle_input" type="number" v-model="Td_value" @change="" />
                                    [ns/m]
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <button class="btn" style="width:100px; height:30px" @click="handleClear">清空</button>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="bottom">
                    <b>[如何使用]</b>
                    <p>1. &nbsp;输入电路板参数和中心频率。</p>
                    <p>2.
                        <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(1)计算某同轴线路的特性阻抗(Zo)时。
                        输入内导体的直径，外导体的直径，
                        然后点击[Analyze]按钮。
                        <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(2)计算具有一定特性阻抗的同轴线直径时。
                        输入任一导体的直径，点击[Svnthesis]按钮。
                    </p>
                    <p>3.给出了计算结果。</p>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
import { ref } from "vue";

import {
    coaxialAnalyze,
    coaxialSvnthesis1,
    coaxialSvnthesis2
} from "@/uitls/compute/rf/transmissionLine"

const title = ref("微带线计算工具 | Microstrip Line Calculator");

const er_value = ref()
const a_value = ref()
const b_value = ref()
const Zo_value = ref()
const Z_value = ref()
const Cap_value = ref()
const Ind_value = ref()
const Vp_value = ref()
const Td_value = ref()

const getFormData = () => {
    let formData = {
        er: er_value.value,
        a: a_value.value,
        b: b_value.value,
        Zo: Zo_value.value,
        Z: Z_value.value,
        Cap: Cap_value.value,
        Ind: Ind_value.value,
        Vp: Vp_value.value,
        Td: Td_value.value
    }
    return formData
}
const setFormData = (formData) => {
    if (formData.er !== undefined && formData.er !== NaN) {
        er_value.value = formData.er
    }
    if (formData.a !== undefined && formData.a !== NaN) {
        a_value.value = formData.a
    }
    if (formData.b !== undefined && formData.b !== NaN) {
        b_value.value = formData.b
    }
    if (formData.Zo !== undefined && formData.Zo !== NaN) {
        Zo_value.value = formData.Zo
    }
    if (formData.Z !== undefined && formData.Z !== NaN) {
        Z_value.value = formData.Z
    }
    if (formData.Cap !== undefined && formData.Cap !== NaN) {
        Cap_value.value = formData.Cap
    }
    if (formData.Ind !== undefined && formData.Ind !== NaN) {
        Ind_value.value = formData.Ind
    }
    if (formData.Vp !== undefined && formData.vp !== NaN) {
        Vp_value.value = formData.Vp
    }
    if (formData.Td !== undefined && formData.Td !== NaN) {
        Td_value.value = formData.Td
    }
}

const handleAnalyze = () => {
    let formData = getFormData()
    setFormData(coaxialAnalyze(formData))
}
const handleSvnthesis1 = () => {
    let formData = getFormData()
    setFormData(coaxialSvnthesis1(formData))
}
const handleSvnthesis2 = () => {
    let formData = getFormData()
    setFormData(coaxialSvnthesis2(formData))
}
const handleClear = () => {
    er_value.value = ''
    a_value.value = ''
    b_value.value = ''
    Zo_value.value = ''
    Z_value.value = ''
    Cap_value.value = ''
    Ind_value.value = ''
    Vp_value.value = ''
    Td_value.value = ''
}

</script>

<style src="@/style/compute.scss" lang="scss"></style>
<style src="@/style/rf/transmissionLine.scss" lang="scss"></style>
<style lang="scss"></style>
  