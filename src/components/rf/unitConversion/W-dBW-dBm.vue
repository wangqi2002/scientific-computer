<template>
    <div class="compute_box">
        <div class="compute_title">{{ title }}</div>
        <div class="compute_content">
            <div class="w_dbw_dbm">
                <div class="top">
                    <div class="left">
                        <img src="@/assets/rf-unitConversion/dbmchart.gif" />
                    </div>
                    <div class="right">
                        <img src="@/assets/rf-unitConversion/dbpower.gif" />
                        <img src="@/assets/rf-unitConversion/dbpowerref.gif" />
                    </div>
                </div>
                <div class="bottom">
                    <div class="box_left">
                        Power：
                    </div>
                    <div class="box_right">
                        <div class="item">
                            <div class="item_top">
                                p&nbsp;&nbsp;=&nbsp;&nbsp;
                                <input class="convert_input" v-model="dBW_value" @input="dBW_change" />
                                <span class="convert_unit">dBW</span>
                                <button class="convert_btn" @click="handledBW">Convert</button>
                            </div>
                            <div class="item_bottom">
                                {{ dBWValidate }}
                            </div>
                        </div>
                        <div class="item">
                            <div class="item_top">
                                p&nbsp;&nbsp;=&nbsp;&nbsp;
                                <input class="convert_input" v-model="dBm_value" @input="dBm_change" />
                                <span class="convert_unit">dBm</span>
                                <button class="convert_btn" @click="handledBm">Convert</button>
                            </div>
                            <div class="item_bottom">
                                {{ dBmValidate }}
                            </div>
                        </div>
                        <div class="item">
                            <div class="item_top">
                                p&nbsp;&nbsp;=&nbsp;&nbsp;
                                <input class="convert_input" v-model="W_value" @input="W_change" />
                                <span class="convert_unit">W</span>
                                <button class="convert_btn" @click="handleW">Convert</button>
                            </div>
                            <div class="item_bottom">
                                {{ WValidate }}
                            </div>
                        </div>
                    </div>
                    <div class="convert_clear">
                        <button class="clear_btn" @click="handleClear">清空</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
import { ref } from "vue";

import {
    dBW_to_dBmW,
    dBm_to_dBWW,
    W_to_dBWdBm,
} from "@/uitls/compute/rf/unitConversion"

const title = ref("W, dBW 和 dBm转换在线计算器");

const dBW_value = ref("")
const dBm_value = ref("")
const W_value = ref("")

const dBWValidate = ref("")
const dBmValidate = ref("")
const WValidate = ref("")

const dBW_change = (e) => {
    let reg = /^(\-|\+)?\d+(\.\d+)?$/
    if (reg.test(e.target.value)) {
        dBWValidate.value = ''
    } else {
        dBWValidate.value = "数据格式不正确"
    }
}
const handledBW = () => {
    let formData = dBW_to_dBmW(dBW_value.value)
    console.log(formData)
    dBW_value.value = formData.dBW
    dBm_value.value = formData.dBm
    W_value.value = formData.W
}

const dBm_change = (e) => {
    let reg = /^(\-|\+)?\d+(\.\d+)?$/
    if (reg.test(e.target.value)) {
        dBmValidate.value = ''
    } else {
        dBmValidate.value = "数据格式不正确"
    }
}
const handledBm = () => {
    let formData = dBm_to_dBWW(dBm_value.value)
    console.log(formData)
    dBW_value.value = formData.dBW
    dBm_value.value = formData.dBm
    W_value.value = formData.W
}

const W_change = (e) => {
    let reg = /^(\+)?\d+(\.\d+)?$/
    if (reg.test(e.target.value)) {
        WValidate.value = ''
    } else {
        WValidate.value = "数据格式不正确"
    }
}
const handleW = () => {
    let formData = W_to_dBWdBm(W_value.value)
    console.log(formData)
    dBW_value.value = formData.dBW
    dBm_value.value = formData.dBm
    W_value.value = formData.W
}

const handleClear = () => {
    dBW_value.value = ""
    dBm_value.value = ""
    W_value.value = ""
}

</script>

<style src="@/style/compute.scss" lang="scss"></style>
<style src="@/style/rf/unitConversion.scss" lang="scss"></style>
<style lang="scss"></style>
  