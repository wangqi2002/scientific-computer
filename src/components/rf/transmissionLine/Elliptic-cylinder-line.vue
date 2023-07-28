<template>
    <div class="compute_box">
        <div class="compute_title">{{ title }}</div>
        <div class="compute_content">
            <div class="elliptic_cylinder_line">
                <div class="top">
                    <div class="top_top line">
                        <table cellspacing="0" cellpadding="0" border="0">
                            <col width="240px">
                            <col width="180px">
                            <tr>
                                <td rowspan="6">
                                    <img class="slit_img" src="@/assets/rf/Ellipticcylinder.png" />
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
                                    <span class="top_span"><b>a1</b></span>
                                    <input class="small_input" type="number" v-model="a1_value" @change="" />
                                    [mm]
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span class="top_span"><b>a2</b></span>
                                    <input class="small_input" type="number" v-model="a2_value" @change="" />
                                    [mm]
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span class="top_span"><b>b1</b></span>
                                    <input class="small_input" type="number" v-model="b1_value" @change="" />
                                    [mm]
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span class="top_span"><b>b2</b></span>
                                    <input class="small_input" type="number" v-model="b2_value" @change="" />
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
    EllipticcylinderCalc
} from "@/uitls/compute/rf/transmissionLine"

const title = ref("椭圆柱形传输线计算工具 | Elliptic cylinder lines Calculator");

const er_value = ref()
const ur_value = ref()
const a1_value = ref()
const a2_value = ref()
const b1_value = ref()
const b2_value = ref()
const c_value = ref()
const l_value = ref()
const Zo_value = ref()

const getFormData = () => {
    let formData = {
        er: er_value.value,
        ur: ur_value.value,
        a1: a1_value.value,
        a2: a2_value.value,
        b1: b1_value.value,
        b2: b2_value.value,
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
    if (formData.a1 !== undefined && formData.a1 !== NaN) {
        a1_value.value = formData.a1
    }
    if (formData.a2 !== undefined && formData.a2 !== NaN) {
        a2_value.value = formData.a2
    }
    if (formData.b1 !== undefined && formData.b1 !== NaN) {
        b1_value.value = formData.b1
    }
    if (formData.b2 !== undefined && formData.b2 !== NaN) {
        b2_value.value = formData.b2
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
    setFormData(EllipticcylinderCalc(formData))
}
const handleClear = () => {
    er_value.value = ''
    ur_value.value = ''
    a1_value.value = ''
    a2_value.value = ''
    b1_value.value = ''
    b2_value.value = ''
    c_value.value = ''
    l_value.value = ''
    Zo_value.value = ''
}

</script>

<style src="@/style/compute.scss" lang="scss"></style>
<style src="@/style/rf/transmissionLine.scss" lang="scss"></style>
<style lang="scss"></style>
  