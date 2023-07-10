const exportFormula = () => {
    const formulaList = [
        {
            title: 'welcome',
            name: 'welcome',
            content: '写一些简介或者放些图片进行装饰',
        }, {
            title: '射频工具',
            name: 'rf',
            content: '射频工具',
            children: [
                {
                    title: '单位换算',
                    name: 'unitConversion',
                    content: '单位换算',
                    children: [
                        {
                            title: '驻波系数、dBm、dBμV、dBmW、V换算表',
                            name: 'dBm-dBμV-dBmW',
                            content: '驻波系数、dBm、dBμV、dBmW、V换算表',
                        }, {
                            title: 'W, dBW 和 dBm转换在线计算器',
                            name: 'W-dBW-dBm',
                            content: 'W, dBW 和 dBm转换在线计算器',
                        }, {
                            title: '电压驻波比计算器',
                            name: 'Voltage-standing-wave-ratio',
                            content: '电压驻波比计算器',
                        },]
                }, {
                    title: '传输线工具',
                    name: 'transmissionLine',
                    content: '传输线工具',
                    children: [
                        {
                            title: '缝隙线计算工具 | Slot Line Calculator',
                            name: 'Slit-line',
                            content: '缝隙线计算工具 | Slot Line Calculator',
                        },
                        {
                            title: '带状线计算工具 | Strip Line Calculator',
                            name: 'Strip-line',
                            content: '带状线计算工具 | Strip Line Calculator',
                        },
                        {
                            title: '微带线特征阻抗计算器',
                            name: 'Microstrip_line_characteristic_impedance',
                            content: '微带线特征阻抗计算器',
                        },
                        {
                            title: '微带线计算工具 | Microstrip Line Calculator',
                            name: 'Microstrip-line',
                            content: '微带线计算工具 | Microstrip Line Calculator',
                        },
                        {
                            title: '趋肤效应的深度计算工具 | Skin Effect Depth',
                            name: 'Skin-effect-depth',
                            content: '趋肤效应的深度计算工具 | Skin Effect Depth',
                        },]
                }, {
                    title: '无源工具',
                    name: 'passive',
                    content: '无源工具',
                },]
        },
        {
            title: '电路工具',
            name: 'circuit',
            content: '电路工具',
            children: [
                {
                    title: '电阻',
                    name: 'resistance',
                    content: '电阻',
                }, {
                    title: '电容',
                    name: 'capacitance',
                    content: '电容',
                }, {
                    title: '电感',
                    name: 'inductance',
                    content: '电感',
                    children: [{
                        title: '螺旋线圈电感计算',
                        name: 'helical-inductance',
                        content: '螺旋线圈电感计算',
                    }, /* {
                        title: '空芯电感线圈电感量及Q值在线计算器',
                        name: 'hollow-inductance',
                        content: '空芯电感线圈电感量及Q值在线计算器',
                    }, {
                        title: '多层线圈电感值设计计算器',
                        name: 'multilayer-inductance',
                        content: '多层线圈电感值设计计算器',
                    }, */]
                },]
        },
        {
            title: '数学工具',
            name: 'math',
            content: '数学工具',
        },
        {
            title: '航天航空',
            name: 'aviation',
            content: '航天航空',
        },
        {
            title: '其他工具',
            name: 'other',
            content: '其他工具',
        }]
    return formulaList
}

export {
    exportFormula
}