<template>
    <div class="compute_box">
        <div class="compute_title">{{ title }}</div>
        <div class="compute_content">
            <div class="dBm_dBμV_dBmW">
                <div class="top">
                    <span class="top_title">阻抗匹配关系换算表：</span>
                    <div class="top_box">
                        <div class="top_left">
                            反射系数：
                            <img class="top_img" src="@/assets/rf/reflection_coefficient.gif">
                        </div>
                        <div class="top_right">
                            驻波系数：
                            <img class="top_img" src="@/assets/rf/standing_wave_coefficient.gif">
                        </div>
                    </div>
                    <span class="top_bottom">其中：Z0=Z时，ρ=0、VSWR=1、即完全匹配</span>
                </div>
                <div class="bottom">
                    <el-table :data="tableData" border style="width: 100%" :header-cell-style="{ 'text-align': 'center' }">
                        <el-table-column prop="ρ1" label="— ρ —" />
                        <el-table-column prop="v1" label="VSWR" />
                        <el-table-column prop="ρ2" label="— ρ —" />
                        <el-table-column prop="v2" label="VSWR" />
                        <el-table-column prop="ρ3" label="— ρ —" />
                        <el-table-column prop="v3" label="VSWR" />
                        <el-table-column prop="ρ4" label="— ρ —" />
                        <el-table-column prop="v4" label="VSWR" />
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
import { ref } from "vue";

const title = ref("驻波系数、dBm、dBμV、dBmW、V换算表");
const tableData = [
    {
        ρ1: 0.00,
        v1: 1.00,
        ρ2: 0.25,
        v2: 1.67,
        ρ3: 0.50,
        v3: 3.00,
        ρ4: 0.75,
        v4: 7.00
    },
    {
        ρ1: 0.01,
        v1: 1.02,
        ρ2: 0.26,
        v2: 1.70,
        ρ3: 0.51,
        v3: 3.08,
        ρ4: 0.76,
        v4: 7.33
    },
    {
        ρ1: 0.02,
        v1: 1.04,
        ρ2: 0.27,
        v2: 1.74,
        ρ3: 0.52,
        v3: 3.17,
        ρ4: 0.77,
        v4: 7.70
    },
    {
        ρ1: 0.03,
        v1: 1.06,
        ρ2: 0.28,
        v2: 1.78,
        ρ3: 0.53,
        v3: 3.26,
        ρ4: 0.78,
        v4: 8.09
    },
    {
        ρ1: 0.04,
        v1: 1.08,
        ρ2: 0.29,
        v2: 1.82,
        ρ3: 0.54,
        v3: 3.35,
        ρ4: 0.79,
        v4: 8.52
    },
    {
        ρ1: 0.05,
        v1: 1.11,
        ρ2: 0.30,
        v2: 1.86,
        ρ3: 0.55,
        v3: 3.44,
        ρ4: 0.80,
        v4: 9.00
    },
    {
        ρ1: 0.06,
        v1: 1.13,
        ρ2: 0.31,
        v2: 1.90,
        ρ3: 0.56,
        v3: 3.55,
        ρ4: 0.81,
        v4: 9.53
    },
    {
        ρ1: 0.07,
        v1: 1.15,
        ρ2: 0.32,
        v2: 1.94,
        ρ3: 0.57,
        v3: 3.65,
        ρ4: 0.82,
        v4: 10.11
    },
    {
        ρ1: 0.08,
        v1: 1.17,
        ρ2: 0.33,
        v2: 1.99,
        ρ3: 0.58,
        v3: 3.76,
        ρ4: 0.83,
        v4: 10.76
    },
    {
        ρ1: 0.09,
        v1: 1.20,
        ρ2: 0.34,
        v2: 2.03,
        ρ3: 0.59,
        v3: 3.88,
        ρ4: 0.84,
        v4: 11.50
    },
    {
        ρ1: 0.10,
        v1: 1.22,
        ρ2: 0.35,
        v2: 2.08,
        ρ3: 0.60,
        v3: 4.00,
        ρ4: 0.85,
        v4: 12.33
    },
    {
        ρ1: 0.11,
        v1: 1.25,
        ρ2: 0.36,
        v2: 2.13,
        ρ3: 0.61,
        v3: 4.13,
        ρ4: 0.86,
        v4: 13.29
    },
    {
        ρ1: 0.12,
        v1: 1.27,
        ρ2: 0.37,
        v2: 2.17,
        ρ3: 0.62,
        v3: 426.,
        ρ4: 0.87,
        v4: 14.38
    },
    {
        ρ1: 0.13,
        v1: 1.30,
        ρ2: 0.38,
        v2: 2.23,
        ρ3: 0.63,
        v3: 4.41,
        ρ4: 0.88,
        v4: 15.67
    },
    {
        ρ1: 0.14,
        v1: 1.33,
        ρ2: 0.39,
        v2: 2.28,
        ρ3: 0.64,
        v3: 4.56,
        ρ4: 0.89,
        v4: 17.18
    },
    {
        ρ1: 0.15,
        v1: 1.35,
        ρ2: 0.40,
        v2: 2.33,
        ρ3: 0.65,
        v3: 4.71,
        ρ4: 0.90,
        v4: 19.00
    },
    {
        ρ1: 0.16,
        v1: 1.38,
        ρ2: 0.41,
        v2: 2.39,
        ρ3: 0.66,
        v3: 4.88,
        ρ4: 0.91,
        v4: 21.22
    },
    {
        ρ1: 0.17,
        v1: 1.41,
        ρ2: 0.42,
        v2: 2.45,
        ρ3: 0.67,
        v3: 5.06,
        ρ4: 0.92,
        v4: 24.00
    },
    {
        ρ1: 0.18,
        v1: 1.44,
        ρ2: 0.43,
        v2: 2.51,
        ρ3: 0.68,
        v3: 5.25,
        ρ4: 0.93,
        v4: 27.57
    },
    {
        ρ1: 0.19,
        v1: 1.47,
        ρ2: 0.44,
        v2: 2.57,
        ρ3: 0.69,
        v3: 5.45,
        ρ4: 0.94,
        v4: 32.33
    },
    {
        ρ1: 0.20,
        v1: 1.50,
        ρ2: 0.45,
        v2: 2.64,
        ρ3: 0.70,
        v3: 5.67,
        ρ4: 0.95,
        v4: 39.00
    },
    {
        ρ1: 0.21,
        v1: 1.53,
        ρ2: 0.46,
        v2: 2.70,
        ρ3: 0.71,
        v3: 5.90,
        ρ4: 0.96,
        v4: 49.00
    },
    {
        ρ1: 0.22,
        v1: 1.56,
        ρ2: 0.47,
        v2: 2.77,
        ρ3: 0.72,
        v3: 6.14,
        ρ4: 0.97,
        v4: 65.57
    },
    {
        ρ1: 0.23,
        v1: 1.60,
        ρ2: 0.48,
        v2: 2.85,
        ρ3: 0.73,
        v3: 6.41,
        ρ4: 0.98,
        v4: 99
    },
    {
        ρ1: 0.24,
        v1: 1.63,
        ρ2: 0.49,
        v2: 2.92,
        ρ3: 0.74,
        v3: 6.69,
        ρ4: 0.99,
        v4: 199
    }
]

</script>

<style src="@/style/compute.scss" lang="scss"></style>
<style src="@/style/rf/unitConversion.scss" lang="scss"></style>
<style lang="scss"></style>
  