const pi = 3.14159265359;   // Just pi [1].
const Z_0 = 120 * pi;         // Impedance of vacum [Ohm].
const c_0 = 3E8;            // Speed of light in vacum [m/s].

function log10(x) {
    var y;
    y = Math.log(x) / Math.log(10);   // log_a(x) = log_b(x) / log_b(a)
    return (y);
}
function exp10(x) {
    var y;
    y = Math.exp(x * Math.log(10));   // a^x = b^(x * log_b(a))
    return (y);
}

//----  W-dBW-dBm  ----
function dBW_to_dBmW(value) {
    let obj = {
        dBW: '',
        dBm: '',
        W: ''
    };
    obj.dBW = parseFloat(value);
    if (isNaN(obj.dBW)) {
        obj.dBW = "";
        return obj;
    }
    obj.W = exp10(obj.dBW / 10);
    obj.dBm = obj.dBW + 30;
    return obj;
}
function dBm_to_dBWW(value) {
    let obj = {
        dBW: '',
        dBm: '',
        W: ''
    };
    obj.dBm = parseFloat(value);
    if (isNaN(obj.dBm)) {
        obj.dBm = "";
        return obj;
    }
    obj.dBW = obj.dBm - 30;
    obj.W = exp10(obj.dBW / 10);
    return obj;
}
function W_to_dBWdBm(value) {
    let obj = {
        dBW: '',
        dBm: '',
        W: ''
    };
    obj.W = parseFloat(value);
    if (isNaN(obj.W) || (obj.W <= 0)) {
        obj.W = "";
        return obj;
    }
    obj.dBW = 10 * log10(obj.W);
    obj.dBm = obj.dBW + 30;
    return obj;
}

//----------------------------------------------------------
function cmd_convert_dBV2dBuVV(my_form) {
    var dBV, dBuV, V;
    dBV = parseFloat(my_form.amp_dBV.value);
    if (isNaN(dBV)) {
        my_form.amp_dBV.value = "";
        window.alert("Enter the amplitude in dBV.");
        return (0);
    }
    dBuV = dBV + 120;
    V = exp10(dBV / 20);
    my_form.amp_dBV.value = dBV;
    my_form.amp_dBuV.value = dBuV;
    my_form.amp_V.value = V;
    return (1);
}
function cmd_convert_dBuV2dBVV(my_form) {
    var dBV, dBuV, V;
    dBuV = parseFloat(my_form.amp_dBuV.value);
    if (isNaN(dBuV)) {
        my_form.amp_dBuV.value = "";
        window.alert("Enter the amplitude in dBuV.");
        return (0);
    }
    dBV = dBuV - 120;
    V = exp10(dBV / 20);
    my_form.amp_dBV.value = dBV;
    my_form.amp_dBuV.value = dBuV;
    my_form.amp_V.value = V;
    return (1);
}
function cmd_convert_V2dBVdBuV(my_form) {
    var dBV, dBuV, V;
    V = parseFloat(my_form.amp_V.value);
    if (isNaN(V) || (V <= 0)) {
        my_form.amp_V.value = "";
        window.alert("Enter the amplitude in V.");
        return (0);
    }
    dBV = 20 * log10(V);
    dBuV = dBV + 120;
    my_form.amp_dBV.value = dBV;
    my_form.amp_dBuV.value = dBuV;
    my_form.amp_V.value = V;
    return (1);
}

//----------------------------------------------------------
function cmd_convert_dBm2dBuV(my_form) {
    var Zc, dBm, dBuV, p, u;
    Zc = parseFloat(my_form.imp_Ohm.value);
    if (isNaN(Zc) || (Zc <= 0)) {
        my_form.imp_Ohm.value = "";
        window.alert("Enter the impedance in Ohm.");
        return (0);
    }
    dBm = parseFloat(my_form.pwr_dBm.value);
    if (isNaN(dBm)) {
        my_form.pwr_dBm.value = "";
        window.alert("Enter the power in dBm.");
        return (0);
    }
    p = exp10(dBm / 10) / 1000;
    u = Math.sqrt(p * Zc);
    dBuV = 20 * log10(u * 1000000);
    my_form.amp_dBuV.value = dBuV;
    return (1);
}
function cmd_convert_dBuV2dBm(my_form) {
    var Zc, dBm, dBuV, p, u;
    Zc = parseFloat(my_form.imp_Ohm.value);
    if (isNaN(Zc) || (Zc <= 0)) {
        my_form.imp_Ohm.value = "";
        window.alert("Enter the impedance in Ohm.");
        return (0);
    }
    dBuV = parseFloat(my_form.amp_dBuV.value);
    if (isNaN(dBuV)) {
        my_form.pwr_dBuV.value = "";
        window.alert("Enter the amplitude in dBuV.");
        return (0);
    }
    u = exp10(dBuV / 20) / 1000000;
    p = u * u / Zc;
    dBm = 10 * log10(p * 1000);
    my_form.pwr_dBm.value = dBm;
    return (1);
}

export {
    dBW_to_dBmW,
    dBm_to_dBWW,
    W_to_dBWdBm,
}