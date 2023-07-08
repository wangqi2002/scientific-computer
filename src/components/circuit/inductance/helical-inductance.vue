<template>
    <div class="compute_box">
        <div class="compute_title">{{ title }}</div>
        <div class="compute_content">
            <div class="helical_inductance">
                <div class="top">
                    <img class="lxq" src="@/assets/circuit/luoxuanxianquan01.png" style="margin-right:10px" />
                    <img class="lxq" src="@/assets/circuit/luoxuanxianquan02.png" style="margin-left:10px" />
                </div>
                <div class="bottom">
                    <div class="form">
                        <div class="item">
                            <span class="item_name">直径D [毫米]</span>
                            <input class="item_input" v-model="d_value" @input="d_change" />
                            <span class="tip">{{ d_tip }}</span>
                        </div>
                        <div class="item">
                            <span class="item_name">直径w [毫米]</span>
                            <input class="item_input" v-model="w_value" @input="w_change" />
                            <span class="tip">{{ w_tip }}</span>
                        </div>
                        <div class="item">
                            <span class="item_name">间距 s [毫米]</span>
                            <input class="item_input" v-model="s_value" @input="s_change" />
                            <span class="tip">{{ s_tip }}</span>
                        </div>
                        <div class="item">
                            <span class="item_name">圈数 n</span>
                            <input class="item_input" v-model="n_value" @input="n_change" />
                            <span class="tip">{{ n_tip }}</span>
                        </div>
                        <div class="item">
                            <span class="item_name">电感量L [uH]</span>
                            <input class="item_input" disabled v-model="l_value" />
                        </div>
                        <div class="item">
                            <span class="item_name">高度 H [毫米]</span>
                            <input class="item_input" disabled v-model="h_value" />
                        </div>
                    </div>
                    <div class="operate">
                        <button class="btn" @click="handleClear">清空</button>
                        <button class="btn" @click="handleCompute">计算</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
import { ref } from "vue";

import {
    helical_inductance
} from "@/uitls/compute/circuit/inductance"

const title = ref("螺旋线圈电感量计算器 | 螺旋线圈电感计算 | 线圈电感计算器在线计算");

const d_value = ref("")
const w_value = ref("")
const s_value = ref("")
const n_value = ref("")
const l_value = ref("")
const h_value = ref("")

const d_tip = ref("")
const w_tip = ref("")
const s_tip = ref("")
const n_tip = ref("")

const d_change = (e) => {
    let reg = /^(\+)?\d+(\.\d+)?$/
    if (e.target.value !== '') {
        if (reg.test(e.target.value)) {
            d_tip.value = ''
        } else {
            d_tip.value = "数据格式不正确"
        }
    } else {
        d_tip.value = ''
    }
}
const w_change = (e) => {
    let reg = /^(\+)?\d+(\.\d+)?$/
    if (e.target.value !== '') {
        if (reg.test(e.target.value)) {
            w_tip.value = ''
        } else {
            w_tip.value = "数据格式不正确"
        }
    } else {
        w_tip.value = ''
    }
}
const s_change = (e) => {
    let reg = /^(\+)?\d+(\.\d+)?$/
    if (e.target.value !== '') {
        if (reg.test(e.target.value)) {
            s_tip.value = ''
        } else {
            s_tip.value = "数据格式不正确"
        }
    } else {
        s_tip.value = ''
    }
}
const n_change = (e) => {
    let reg = /^(\+)?\d+(\.\d+)?$/
    if (e.target.value !== '') {
        if (reg.test(e.target.value)) {
            n_tip.value = ''
        } else {
            n_tip.value = "数据格式不正确"
        }
    } else {
        n_tip.value = ''
    }
}

const handleClear = () => {
    d_value.value = ''
    w_value.value = ''
    s_value.value = ''
    n_value.value = ''
    l_value.value = ''
    h_value.value = ''
}
const handleCompute = () => {
    let formData = {
        D: d_value.value,
        w: w_value.value,
        s: s_value.value,
        n: n_value.value
    }
    // if (formData.D !== '' && formData.w !== '' && formData.s !== '' && formData.n !== '') {
    //     let result = helical_inductance(formData)
    //     l_value.value = result.ind
    //     h_value.value = result.h
    // }

    let result = helical_inductance(formData)
    l_value.value = result.ind
    h_value.value = result.h
}

</script>

<style src="@/style/compute.scss" lang="scss"></style>
<style src="@/style/circuit/inductance.scss" lang="scss"></style>
<style lang="scss"></style>
  