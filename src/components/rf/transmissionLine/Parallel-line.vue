<template>
    <div class="compute_box">
        <div class="compute_title">{{ title }}</div>
        <div class="compute_content">
            <div class="parallel_line">
                <div class="top">
                    <div class="top_top line">
                        <table cellspacing="0" cellpadding="0" border="0">
                            <col width="240px">
                            <col width="180px">
                            <tr>
                                <td rowspan="4">
                                    <img class="slit_img" src="@/assets/rf/Parallellines.png" />
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
                                    <span class="top_span"><b>d</b></span>
                                    <input class="small_input" type="number" v-model="d_value" @change="" />
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
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
import { ref } from "vue";

import {
    parallelCalc
} from "@/uitls/compute/rf/transmissionLine"

const title = ref("平行双线计算工具 | Parallel Lines Calculator");

const er_value = ref()
const ur_value = ref()
const a_value = ref()
const d_value = ref()
const c_value = ref()
const l_value = ref()
const Zo_value = ref()

const getFormData = () => {
    let formData = {
        er: er_value.value,
        ur: ur_value.value,
        a: a_value.value,
        d: d_value.value,
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
    if (formData.d !== undefined && formData.d !== NaN) {
        d_value.value = formData.d
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
    setFormData(parallelCalc(formData))
}
const handleClear = () => {
    er_value.value = ''
    ur_value.value = ''
    a_value.value = ''
    d_value.value = ''
    c_value.value = ''
    l_value.value = ''
    Zo_value.value = ''
}

</script>

<style src="@/style/compute.scss" lang="scss"></style>
<style src="@/style/rf/transmissionLine.scss" lang="scss"></style>
<style lang="scss"></style>
  