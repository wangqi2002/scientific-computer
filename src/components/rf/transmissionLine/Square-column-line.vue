<template>
    <div class="compute_box">
        <div class="compute_title">{{ title }}</div>
        <div class="compute_content">
            <div class="square_column_line">
                <div class="top">
                    <div class="top_top line">
                        <table cellspacing="0" cellpadding="0" border="0">
                            <col width="240px">
                            <col width="180px">
                            <tr>
                                <td rowspan="4">
                                    <img class="slit_img" src="@/assets/rf/Squarecolumn.png" />
                                </td>
                                <td>
                                    <span class="top_span"><b>er</b></span>
                                    <input class="small_input" type="number" v-model="er_value" @change="" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span class="top_span"><b>ur</b></span>
                                    <input class="small_input" type="number" v-model="ur_value" @change="" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span class="top_span"><b>a</b></span>
                                    <input class="small_input" type="number" v-model="a_value" @change="" />
                                    [mm]
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span class="top_span"><b>b</b></span>
                                    <input class="small_input" type="number" v-model="b_value" @change="" />
                                    [mm]
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
                                    <input class="middle_input" type="number" v-model="c_value" @change="" />
                                    [pF/m]
                                </td>
                                <td>
                                    <span class="bottom_span"><b>L</b></span>
                                    <input class="middle_input" type="number" v-model="l_value" @change="" />
                                    [nH/m]
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span class="bottom_span"><b>Zo</b></span>
                                    <input class="middle_input" type="number" v-model="Zo_value" @change="" />
                                    [Ω]
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <button class="btn" style="width:100px; height:30px" @click="handleClear">清空</button>
                                    <button class="btn" style="width:100px; height:30px" @click="handleCalc">计算</button>
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
    SquarecolumnCalc
} from "@/uitls/compute/rf/transmissionLine"

const title = ref("方柱形传输线计算工具 | Square column lines Calculator");

const er_value = ref()
const ur_value = ref()
const a_value = ref()
const b_value = ref()
const c_value = ref()
const l_value = ref()
const Zo_value = ref()

const getFormData = () => {
    let formData = {
        er: er_value.value,
        ur: ur_value.value,
        a: a_value.value,
        b: b_value.value,
        // c: c_value.value,
        // l: l_value.value,
    }
    return formData
}
const setFormData = (formData) => {
    if (formData.er !== undefined && formData.er !== NaN) {
        er_value.value = formData.er
    }
    if (formData.ur !== undefined && formData.ur !== NaN) {
        ur_value.value = formData.ur
    }
    if (formData.a !== undefined && formData.a !== NaN) {
        a_value.value = formData.a
    }
    if (formData.b !== undefined && formData.b !== NaN) {
        b_value.value = formData.b
    }
    if (formData.C !== undefined && formData.C !== NaN) {
        c_value.value = formData.C
    }
    if (formData.L !== undefined && formData.L !== NaN) {
        l_value.value = formData.L
    }
    if (formData.Zo !== undefined && formData.Zo !== NaN) {
        Zo_value.value = formData.Zo
    }
}

const handleCalc = () => {
    let formData = getFormData()
    setFormData(SquarecolumnCalc(formData))
}
const handleClear = () => {
    er_value.value = ''
    ur_value.value = ''
    a_value.value = ''
    b_value.value = ''
    c_value.value = ''
    l_value.value = ''
    Zo_value.value = ''
}

</script>

<style src="@/style/compute.scss" lang="scss"></style>
<style src="@/style/rf/transmissionLine.scss" lang="scss"></style>
<style lang="scss"></style>
  