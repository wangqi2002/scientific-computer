<template>
    <div class="compute_box">
        <div class="compute_title">{{ title }}</div>
        <div class="compute_content">
            <div class="vpp_W">
                <div class="top">
                    <img src="@/assets/rf/vpp-W.png" />
                </div>
                <div class="bottom">
                    <table cellspacing="0" cellpadding="0" border="0">
                        <col width="150px">
                        <col width="90px">
                        <col width="150px">
                        <col width="150px">
                        <tr>
                            <td colspan="4">
                                输入电阻：
                                <input class="middle_input" type="number" style="margin-left: 0" v-model="R_value"
                                    @change="" />
                                <span style="margin: 0 8px 0 5px">[Ω]</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input class="middle_input" type="number" v-model="vpp1_value" @change="" />
                                [vpp]
                            </td>
                            <td class="ctd">
                                <button class="cbtn" @click="handleVTWD">Convert</button>
                            </td>
                            <td>
                                <input class="middle_input" type="number" v-model="w1_value" @change="" />
                                [w]
                            </td>
                            <td>
                                <input class="middle_input" type="number" v-model="d1_value" @change="" />
                                [dBm]
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input class="middle_input" type="number" v-model="d2_value" @change="" />
                                [dBm]
                            </td>
                            <td class="ctd">
                                <button class="cbtn" @click="handleDTVW">Convert</button>
                            </td>
                            <td>
                                <input class="middle_input" type="number" v-model="vpp2_value" @change="" />
                                [vpp]
                            </td>
                            <td>
                                <input class="middle_input" type="number" v-model="w2_value" @change="" />
                                [w]
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input class="middle_input" type="number" v-model="w3_value" @change="" />
                                [w]
                            </td>
                            <td class="ctd">
                                <button class="cbtn" @click="handleWTDV">Convert</button>
                            </td>
                            <td>
                                <input class="middle_input" type="number" v-model="d3_value" @change="" />
                                [dBm]
                            </td>
                            <td>
                                <input class="middle_input" type="number" v-model="vpp3_value" @change="" />
                                [vpp]
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4">
                                <button class="btn" style="margin-right:15px" @click="handleClear">清空</button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
import { ref } from "vue";

import {
    VppToWdbm,
    dBmToVppW,
    WTodBmVpp
} from "@/uitls/compute/rf/unitConversion"

const title = ref("vpp、W、dBm 单位转换");

const vpp1_value = ref("")
const w1_value = ref("")
const d1_value = ref("")
const vpp2_value = ref("")
const w2_value = ref("")
const d2_value = ref("")
const vpp3_value = ref("")
const w3_value = ref("")
const d3_value = ref("")
const R_value = ref(50)

const getFormData1 = () => {
    let formData = {
        R: R_value.value,
        vpp1: vpp1_value.value,
    }
    return formData
}
const getFormData2 = () => {
    let formData = {
        R: R_value.value,
        d2: d2_value.value,
    }
    return formData
}
const getFormData3 = () => {
    let formData = {
        R: R_value.value,
        w3: w3_value.value,
    }
    return formData
}
const setFormData = (formData) => {
    if (formData.R !== undefined && formData.R !== NaN) {
        R_value.value = formData.R
    }
    if (formData.w1 !== undefined && formData.w1 !== NaN) {
        w1_value.value = formData.w1
    }
    if (formData.vpp1 !== undefined && formData.vpp1 !== NaN) {
        vpp1_value.value = formData.vpp1
    }
    if (formData.d1 !== undefined && formData.d1 !== NaN) {
        d1_value.value = formData.d1
    }
    if (formData.w2 !== undefined && formData.w2 !== NaN) {
        w2_value.value = formData.w2
    }
    if (formData.vpp2 !== undefined && formData.vpp2 !== NaN) {
        vpp2_value.value = formData.vpp2
    }
    if (formData.d2 !== undefined && formData.d2 !== NaN) {
        d2_value.value = formData.d2
    }
    if (formData.w3 !== undefined && formData.w3 !== NaN) {
        w3_value.value = formData.w3
    }
    if (formData.vpp3 !== undefined && formData.vpp3 !== NaN) {
        vpp3_value.value = formData.vpp3
    }
    if (formData.d3 !== undefined && formData.d3 !== NaN) {
        d3_value.value = formData.d3
    }
}
const handleVTWD = () => {
    let formData = getFormData1()
    if ((formData.R !== undefined && formData.R !== '') || (formData.vpp1 !== undefined && formData.vpp1 !== '')) {
        setFormData(VppToWdbm(formData))
    } else {
        ElMessage('请输入数据')
    }
}
const handleDTVW = () => {
    let formData = getFormData2()
    if ((formData.R !== undefined && formData.R !== '') || (formData.d2 !== undefined && formData.d2 !== '')) {
        setFormData(dBmToVppW(formData))
    } else {
        ElMessage('请输入数据')
    }
}
const handleWTDV = () => {
    let formData = getFormData3()
    if ((formData.R !== undefined && formData.R !== '') || (formData.w3 !== undefined && formData.w3 !== '')) {
        setFormData(WTodBmVpp(formData))
    } else {
        ElMessage('请输入数据')
    }
}

const handleClear = () => {
    vpp1_value.value = ""
    vpp2_value.value = ""
    vpp3_value.value = ""
    w1_value.value = ""
    w2_value.value = ""
    w3_value.value = ""
    d1_value.value = ""
    d2_value.value = ""
    d3_value.value = ""
    R_value.value = 50
}

</script>

<style src="@/style/compute.scss" lang="scss"></style>
<style src="@/style/rf/unitConversion.scss" lang="scss"></style>
<style lang="scss"></style>
  