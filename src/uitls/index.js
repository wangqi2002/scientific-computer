const exportFormula = () => {
    const formulaList = [{
        title: '射频工具',
        name: 'rf',
        content: '射频工具',
        children: [{
            title: '单位换算',
            name: 'unitConversion',
            content: '单位换算',
            children: [{
                title: '驻波系数、dBm、dBμV、dBmW、V换算表',
                name: 'dBm-dBμV-dBmW-V',
                content: '驻波系数、dBm、dBμV、dBmW、V换算表',
            }, {
                title: 'V, dBV 和 dBuV转换在线计算器',
                name: 'V-dBV-dBuV',
                content: 'V, dBV 和 dBuV转换在线计算器',
            }, {
                title: 'W, dBW 和 dBm转换在线计算器',
                name: 'W-dDW-dBm',
                content: 'W, dBW 和 dBm转换在线计算器',
            }, {
                title: 'Z-S-Y-A参数转换计算器',
                name: 'Z-S-Y-A',
                content: 'Z-S-Y-A参数转换计算器',
            },]
        }, {
            title: '传输线工具',
            name: 'transmissionLine',
            content: '传输线工具',
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