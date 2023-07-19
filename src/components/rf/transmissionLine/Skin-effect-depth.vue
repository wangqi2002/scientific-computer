<template>
    <div class="compute_box">
        <div class="compute_title">{{ title }}</div>
        <div class="compute_content">
            <div class="skin_effect_depth">
                <div class="top">
                    <div class="top_top">
                        <div class="top_top_left">
                            <img class="top_img" src="@/assets/rf/skin_effect_depth.gif">
                        </div>
                        <div class="top_top_right">
                            <p>Where ρ = Is the resistivity of the conductor in Ω/m</p>
                            <p>f= frequency in Hertz</p>
                            <p> μ = Is the absolute magnetic permeability of the conductor</p>
                            <p>The absolute magnetic permeability (μ) = μo x μr</p>
                            <p>μo = 4π x 10-7 H/m</p>
                        </div>
                    </div>
                    <div class="top_bottom">
                        <p>The values for μr are from Transmission Line Design Handbook by Brian C Wadell, Artech House 1991
                            Table 9.3.2 page 446.</p>
                        <p>The values for ρ are from CRC Handbook of Chemistry and Physics 1st Student Edition 1998 page
                            F-88 and are for high purity elements at 20°C.</p>
                    </div>
                </div>
                <div class="bottom">
                    <table cellspacing="0" cellpadding="0" border="0">
                        <col width="320px">
                        <col width="360px">
                        <tr>
                            <td>
                                <span class="first_span">
                                    Select the conducting material: </span>
                                <select class="material_select" v-model="material_kind" @change="handleMaterial">
                                    <option value="Aluminium">Aluminium</option>
                                    <option value="Copper">Copper</option>
                                    <option value="Gold">Gold</option>
                                    <option value="Nickel">Nickel</option>
                                    <option value="Silver">Silver</option>
                                </select>
                            </td>
                            <td>
                                <span class="second_span"> Resistivity (ρ): </span>
                                <input class="td_input" type="number" v-model="Resistivity_value">
                                x 10-8 Ω/m
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span class="first_span">Enter the required frequency: </span>
                                <input class="td_input" type="number" v-model="Frequency_value">
                                MHz
                            </td>
                            <td>
                                <span class="second_span">Relative Permeability (μr): </span>
                                <input class="td_input" type="number" v-model="Permeability_value">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <span class="first_span" style="width:150px"> Skin Effect Depth: </span>
                                <input class="td_input" type="number" style="width:120px" v-model="Depth_value">
                                μm
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <button class="btn" @click="handleClear">清空</button>
                                <button class="btn" @click="handleCompute">计算</button>
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
import { ElMessage } from 'element-plus'

import {
    skinED
} from "@/uitls/compute/rf/transmissionLine"

const title = ref("趋肤效应的深度计算工具 | Skin Effect Depth");

const material_kind = ref("Copper")
const Frequency_value = ref(1)
const Resistivity_value = ref()
const Permeability_value = ref()
const Depth_value = ref()

const getFormData = () => {
    let formData = {
        material: material_kind.value,
        Frequency: Frequency_value.value,
        Resistivity: Resistivity_value.value,
        Permeability: Permeability_value.value,
        Depth: Depth_value.value
    }
    return formData
}
const setFormData = (formData) => {
    if (formData.Frequency !== undefined) {
        Frequency_value.value = formData.Frequency
    }
    if (formData.Resistivity !== undefined) {
        Resistivity_value.value = formData.Resistivity
    }
    if (formData.Permeability !== undefined) {
        Permeability_value.value = formData.Permeability
    }
    if (formData.Depth !== undefined) {
        Depth_value.value = formData.Depth
    }
}
const handleMaterial = () => {
    console.log(material_kind.value)
}

const handleCompute = () => {
    let formData = getFormData()
    if (formData.Frequency !== undefined && formData.Frequency !== '') {
        console.log(formData)
        setFormData(skinED(formData))
    } else {
        ElMessage('请输入频率')
    }
}
const handleClear = () => {
    Frequency_value.value = 1
    Resistivity_value.value = ''
    Permeability_value.value = ''
    Depth_value.value = ''
}

</script>

<style src="@/style/compute.scss" lang="scss"></style>
<style src="@/style/rf/transmissionLine.scss" lang="scss"></style>
<style lang="scss"></style>
  