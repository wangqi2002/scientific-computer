<template>
    <div class="compute_box">
        <div class="compute_title">{{ title }}</div>
        <div class="compute_content">
            <div class="Voltage_s_w_r">
                <div class="top">
                    <p>
                        VSWR(电压驻波比，有时也称作垂直驻波比)，用来衡量无线信号通过功率源、传输线、最终进入负载(例如，功率放大器输出通过传输线，最终到达天线)的有效传输功率。对于一个理想系统，传输能量为100%，需要源阻抗、传输线及其它连接器的特征阻抗、负载阻抗之间精确匹配。由于理想的传输过程不存在干扰，信号的交流电压在两端保持相同。实际系统中，由于阻抗失配将会导致部分功率向信号源方向反射(如同一个回波)。反射引起相消干扰，沿着传输线在不同时间、距离产生电压波峰、波谷。
                    </p>

                    <p>
                        VSWR用于度量电压的变化，是传输线上最高电压与最低电压之比。由于理想系统中电压保持不变，所以，对应的VSWR是1:1。产生反射时，电压发生变化，VSWR增大 -- 例如：1.2:1或2:1。</p>

                    <p style="line-height: 2em;"><b>电压驻波比计算公式：</b></p>
                    <p>VSWR是传输线上的电压比：
                        <b>VSWR = |V(max)|/|V(min)|</b>
                        <br> 其中，V(max)是传输线上信号电压的最大值，V(min)是传输线上信号电压的最小值。
                    </p>
                    <p>利用阻抗计算：
                        <b>VSWR = (1+Γ)/(1-Γ)</b>
                        <br>其中，Γ是靠近负载端的电压反射系数，由负载阻抗(ZL)和源阻抗(Zo)确定：
                        <b>Γ = (ZL-Zo)/(ZL+Zo)</b>
                        如果负载与传输线完全匹配，Γ = 0，VSWR = 1:1
                    </p>
                </div>
                <div class="bottom">
                    <table class="compute_table" border="2px" cellspacing="1">
                        <col width="150px">
                        <col width="140px">
                        <col width="120px">
                        <tr>
                            <td colspan="3">
                                电压驻波比输入
                            </td>
                        </tr>
                        <tr>
                            <td>电压驻波比(VSWR)</td>
                            <td colspan="2">
                                <input class="big_input" type="number" v-model="VSWR_value" @change="handleMain" />
                                : 1
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                计算结果(输出各参数可更改)
                            </td>
                        </tr>
                        <tr>
                            <td>损耗( % )</td>
                            <td colspan="2">
                                <input class="big_input" type="number" v-model="LOSSPCT_value" @change="handleLossper" />
                            </td>
                        </tr>
                        <tr>
                            <td>损耗( dB )</td>
                            <td colspan="2">
                                <input class="big_input" type="number" v-model="LOSSDB_value" @change="handleLossdB" />
                            </td>
                        </tr>
                        <tr>
                            <td>输入功率</td>
                            <td>
                                <input class="small_input" type="number" v-model="PowerIn_value"
                                    @change="handlePowerIndBm" />dBm
                            </td>
                            <td>
                                <input class="small_input" type="number" v-model="PowerInW_value"
                                    @change="handlePowerInW" />W
                            </td>
                        </tr>
                        <tr>
                            <td>反射功率</td>
                            <td>
                                <input class="small_input" type="number" v-model="PowerRef_value"
                                    @change="handlePowerRefdBm" />dBm
                            </td>
                            <td>
                                <input class="small_input" type="number" v-model="PowerRefW_value"
                                    @change="handlePowerRefW" />W
                            </td>
                        </tr>
                        <tr>
                            <td>输出功率</td>
                            <td>
                                <input class="small_input" type="number" v-model="PowerOut_value"
                                    @change="handlePowerOutdBm" />dBm
                            </td>
                            <td>
                                <input class="small_input" type="number" v-model="PowerOutW_value"
                                    @change="handlePowerOutW" />W
                            </td>
                        </tr>
                        <tr style="text-align: center;">
                            <td colspan="3">
                                <button class="btn" @click="handleClear">复位</button>
                                <button class="btn" @click="handleMain">计算</button>
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
    vswr_main,
    ChangePowerOut,
    ChangePowerRef,
    PowerRefdBm,
    PowerOutdBm,
    ChangeLossdB,
    ChangeLossPercent,
    Convert_To_dBm,
    Convert_To_Watt
} from "@/uitls/compute/rf/unitConversion"

const title = ref("电压驻波比计算器");

const VSWR_value = ref(1.5)
const LOSSPCT_value = ref()
const LOSSDB_value = ref()
const PowerIn_value = ref(50)
const PowerInW_value = ref(100)
const PowerRef_value = ref()
const PowerRefW_value = ref()
const PowerOut_value = ref()
const PowerOutW_value = ref()

const getFormData = () => {
    let formData = {
        VSWR: VSWR_value.value,
        LOSSPCT: LOSSPCT_value.value,
        LOSSDB: LOSSDB_value.value,
        PowerIn: PowerIn_value.value,
        PowerInW: PowerInW_value.value,
        PowerRef: PowerRef_value.value,
        PowerRefW: PowerRefW_value.value,
        PowerOut: PowerOut_value.value,
        PowerOutW: PowerOutW_value.value
    }
    return formData
}
const setFormData = (formData) => {
    if (formData.VSWR !== undefined) {
        VSWR_value.value = formData.VSWR
    }
    if (formData.LOSSPCT !== undefined) {
        LOSSPCT_value.value = formData.LOSSPCT
    }
    if (formData.LOSSDB !== undefined) {
        LOSSDB_value.value = formData.LOSSDB
    }
    if (formData.PowerIn !== undefined) {
        PowerIn_value.value = formData.PowerIn
    }
    if (formData.PowerInW !== undefined) {
        PowerInW_value.value = formData.PowerInW
    }
    if (formData.PowerRef !== undefined) {
        PowerRef_value.value = formData.PowerRef
    }
    if (formData.PowerRefW !== undefined) {
        PowerRefW_value.value = formData.PowerRefW
    }
    if (formData.PowerOut !== undefined) {
        PowerOut_value.value = formData.PowerOut
    }
    if (formData.PowerOutW !== undefined) {
        PowerOutW_value.value = formData.PowerOutW
    }
}

const handleMain = () => {
    let formData = getFormData()
    setFormData(vswr_main(formData))
}
const handleLossper = () => {
    let formData = getFormData()
    setFormData(ChangeLossPercent(formData))
    formData = getFormData()
    setFormData(vswr_main(formData))
}
const handleLossdB = () => {
    let formData = getFormData()
    setFormData(ChangeLossdB(formData))
    formData = getFormData()
    setFormData(vswr_main(formData))
}
const handlePowerIndBm = () => {
    let formData = getFormData()
    setFormData(Convert_To_Watt(formData))
    formData = getFormData()
    setFormData(vswr_main(formData))
}
const handlePowerInW = () => {
    let formData = getFormData()
    setFormData(Convert_To_dBm(formData))
    formData = getFormData()
    setFormData(vswr_main(formData))
}
const handlePowerRefdBm = () => {
    let formData = getFormData()
    setFormData(PowerRefdBm(formData))
    formData = getFormData()
    setFormData(ChangePowerRef(formData))
}
const handlePowerRefW = () => {
    let formData = getFormData()
    setFormData(ChangePowerRef(formData))
}
const handlePowerOutdBm = () => {
    let formData = getFormData()
    setFormData(PowerOutdBm(formData))
    formData = getFormData()
    setFormData(ChangePowerOut(formData))
}
const handlePowerOutW = () => {
    let formData = getFormData()
    setFormData(ChangePowerOut(formData))
}

const handleClear = () => {
    VSWR_value.value = 1.5
    LOSSPCT_value.value = ''
    LOSSDB_value.value = ''
    PowerIn_value.value = 50
    PowerInW_value.value = 100
    PowerRef_value.value = ''
    PowerRefW_value.value = ''
    PowerOut_value.value = ''
    PowerOutW_value.value = ''
}

</script>
<style src="@/style/compute.scss" lang="scss"></style>
<style src="@/style/rf/unitConversion.scss" lang="scss"></style>
<style lang="scss"></style>
  