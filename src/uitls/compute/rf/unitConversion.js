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

//  W-dBW-dBm
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

// Voltage-standing-wave-ratio
function perRound(num, precision) {
    var precision = 3;
    precision = parseInt(precision);
    var result1 = num * Math.pow(10, precision);
    var result2 = Math.round(result1);
    var result3 = result2 / Math.pow(10, precision);
    return zerosPad(result3, precision)
}
function zerosPad(rndVal, decPlaces) {
    var valStrg = rndVal.toString();
    var decLoc = valStrg.indexOf(".");
    if (decLoc == -1) {
        decPartLen = 0;
        valStrg += decPlaces > 0 ? "." : ""
    } else {
        decPartLen = valStrg.length - decLoc - 1
    }
    var totalPad = decPlaces - decPartLen;
    if (totalPad > 0) {
        for (var cntrVal = 1; cntrVal <= totalPad; cntrVal++) valStrg += "0"
    }
    return valStrg
}
function vswr_main(formData) {
    let obj = {
        LOSSPCT: '',
        LOSSDB: '',
        PowerRef: '',
        PowerRefW: '',
        PowerOut: '',
        PowerOutW: ''
    }
    var PowerIn, PowerRef, PowerOut
    obj.LOSSPCT = formatvalue(LOSSPCT(formData.VSWR), 5);
    obj.LOSSDB = formatvalue(LOSSDB(formData.VSWR), 5);
    PowerIn = 1 * formData.PowerInW;
    PowerOut = 10 * log10(Output_Power(formData.VSWR, formData.PowerInW));
    PowerRef = PowerIn - Output_Power(formData.VSWR, formData.PowerInW);
    obj.PowerRef = formatvalue(10 * log10(PowerRef) + 30, 5);
    obj.PowerOut = formatvalue(PowerOut + 30, 5);
    obj.PowerRefW = formatvalue(PowerRef, 5);
    obj.PowerOutW = formatvalue(Output_Power(formData.VSWR, formData.PowerInW), 5)
    return obj
}
function ChangePowerOut(formData) {
    let obj = {
        VSWR: '',
        LOSSPCT: '',
        LOSSDB: '',
        PowerRef: '',
        PowerRefW: '',
        PowerOut: '',
    }
    var PowerIn, PowerOut, PowerRef, vswr
    PowerIn = 1 * formData.PowerInW;
    PowerOut = 1 * formData.PowerOutW;
    obj.PowerOut = formatvalue(10 * log10(PowerOut) + 30, 5);
    PowerRef = PowerIn - PowerOut;
    obj.PowerRefW = formatvalue(PowerRef, 5);
    obj.PowerRef = formatvalue((10 * log10(PowerRef) + 30), 5);
    vswr = (1 + Math.sqrt(PowerRef / PowerOut)) / (1 - Math.sqrt(PowerRef / PowerOut));
    obj.VSWR = formatvalue(vswr, 5);
    obj.LOSSPCT = formatvalue(LOSSPCT(formData.VSWR), 5);
    obj.LOSSDB = formatvalue(LOSSDB(formData.VSWR), 5)
    return obj
}
function ChangePowerRef(formData) {
    let obj = {
        VSWR: '',
        LOSSPCT: '',
        LOSSDB: '',
        PowerRef: '',
        PowerOut: '',
        PowerOutW: ''
    }
    var PowerIn, PowerOut, vswr
    PowerIn = 1 * formData.PowerInW;
    PowerRef = 1 * formData.PowerRefW;
    PowerOut = PowerIn - PowerRef;
    obj.PowerOutW = formatvalue(PowerOut, 5);
    obj.PowerOut = formatvalue(((10 * log10(PowerOut)) + 30), 5);
    obj.PowerRef = formatvalue((10 * log10(PowerRef) + 30), 5);
    vswr = (1 + Math.sqrt(PowerRef / PowerOut)) / (1 - Math.sqrt(PowerRef / PowerOut));
    obj.VSWR = formatvalue(vswr, 5);
    obj.LossVSWR.LOSSPCT = formatvalue(LOSSPCT(formData.VSWR), 5);
    obj.LossVSWR.LOSSDB = formatvalue(LOSSDB(formData.VSWR), 5)
    return obj
}
function PowerRefdBm(formData) {
    let obj = {
        PowerRefW: ''
    }
    var PowerRefdBm, PowerRef
    PowerRefdBm = 1 * formData.PowerRef;
    PowerRef = Math.pow(10, ((PowerRefdBm - 30) / 10));
    obj.PowerRefW = formatvalue(PowerRef, 5)
    return obj
}
function PowerOutdBm(formData) {
    let obj = {
        PowerOutW: ''
    }
    var PowerOutdBm, PowerOut
    PowerOutdBm = 1 * formData.PowerOut;
    PowerOut = Math.pow(10, ((PowerOutdBm - 30) / 10));
    obj.PowerOutW = formatvalue(PowerOut, 5)
    return obj
}
function ChangeLossdB(formData) {
    let obj = {
        VSWR: ''
    }
    var vswr, LOSSDB, LOSSPCT, factor
    LOSSDB = 1 * formData.LOSSDB;
    LOSSPCT = 100 * (1 - Math.pow(10, (-LOSSDB / 10)));
    factor = Math.sqrt(LOSSPCT / 100);
    vswr = (factor + 1) / (1 - factor);
    obj.VSWR = formatvalue(vswr, 5)
    return obj
}
function ChangeLossPercent(formData) {
    let obj = {
        VSWR: ''
    }
    var vswr, LOSSDB, LOSSPCT, factor
    LOSSPCT = 1 * formData.LOSSPCT;
    factor = Math.sqrt(LOSSPCT / 100);
    vswr = (factor + 1) / (1 - factor);
    obj.VSWR = formatvalue(vswr, 5)
    return obj
}
function LOSSPCT(form_VSWR) {
    var vswr, loss
    vswr = 1 * form_VSWR;
    loss = 100 * Math.pow(((vswr - 1) / (vswr + 1)), 2);
    return (loss)
}
function Output_Power(form_VSWR, form_PowerInW) {
    var vswr, VSWRfactor, PowerIn
    vswr = 1 * form_VSWR;
    VSWRfactor = Math.pow(((vswr - 1) / (vswr + 1)), 2);
    PowerIn = 1 * form_PowerInW;
    return (PowerIn / (1 + VSWRfactor))
}
function LOSSDB(form_VSWR) {
    return (-10 * log10(1 - (LOSSPCT(form_VSWR) / 100)))
}
function To_Watt(Power) {
    return (Math.pow(10, (Power / 10)))
}
function Convert_To_dBm(formData) {
    let obj = {
        PowerIn: '',
        PowerRef: '',
        PowerOut: '',
    }
    var PowerRef, PowerIn, PowerOut
    PowerIn = 1 * formData.PowerInW;
    PowerOut = 1 * formData.PowerRefW;
    PowerRef = 1 * formData.PowerRefW;
    obj.PowerIn = formatvalue((10 * log10(PowerIn) + 30), 5);
    obj.PowerRef = formatvalue((10 * log10(PowerRef) + 30), 5);
    obj.PowerOut = formatvalue((10 * log10(PowerOut) + 30), 5)
    return obj
}
function Convert_To_Watt(formData) {
    let obj = {
        PowerInW: ''
    }
    var PowerIn, PowerInW
    PowerIn = 1 * formData.PowerIn;
    PowerInW = To_Watt(PowerIn - 30);
    obj.PowerInW = formatvalue((PowerInW), 5)
    return obj
}
function formatvalue(input, rsize) {
    var invalid = "**************************";
    var nines = "999999999999999999999999";
    var strin = "" + input;
    var fltin = parseFloat(strin);
    if (strin.length <= rsize) {
        return strin;
    }
    if (strin.indexOf("e") != -1 || fltin > parseFloat(nines.substring(0, rsize) + ".4")) {
        return invalid.substring(0, rsize);
    }
    var rounded = "" + (fltin + (fltin - parseFloat(strin.substring(0, rsize))));
    return rounded.substring(0, rsize)
}

// vpp-w
function VppToWdbm(formData) {
    let obj = {};
    let vpp = formData.vpp1;
    let R = formData.R;
    if (vpp < 0 || formData.vpp1 == "" || formData.vpp1 == undefined) {
        vpp = 1;
        obj.vpp1 = vpp
    }
    if (R < 0 || formData.R == "" || formData.R == undefined) {
        R = 50;
        obj.R = R
    }
    let k1 = vpp / (2 * Math.sqrt(2))
    let k2 = k1 * k1
    let w = k2 / R
    obj.w1 = w
    let k3 = log10(w)
    let d = 10 * k3 + 30
    obj.d1 = d
    return obj
}
function dBmToVppW(formData) {
    let obj = {};
    let d = formData.d2;
    let R = formData.R;
    if (d < 0 || formData.d2 == "" || formData.d2 == undefined) {
        d = 1;
        obj.d2 = d
    }
    if (R < 0 || formData.R == "" || formData.R == undefined) {
        R = 50;
        obj.R = R
    }
    let k1 = d / 10
    let k2 = 10 ** k1
    let w = k2 * 0.001
    obj.w2 = w
    let k3 = w * R
    let k4 = Math.sqrt(k3)
    let vpp = k4 * (2 * Math.sqrt(2))
    obj.vpp2 = vpp
    return obj
}
function WTodBmVpp(formData) {
    let obj = {};
    let w = formData.w3;
    let R = formData.R;
    if (w < 0 || formData.w3 == "" || formData.w3 == undefined) {
        w = 1;
        obj.w3 = w
    }
    if (R < 0 || formData.R == "" || formData.R == undefined) {
        R = 50;
        obj.R = R
    }
    let k1 = w * R
    let k2 = Math.sqrt(k1)
    let vpp = k2 * (2 * Math.sqrt(2))
    obj.vpp3 = vpp
    let k3 = log10(w)
    let d = 10 * k3 + 30
    obj.d3 = d
    return obj
}


export {
    dBW_to_dBmW,
    dBm_to_dBWW,
    W_to_dBWdBm,
    vswr_main,
    ChangePowerOut,
    ChangePowerRef,
    PowerRefdBm,
    PowerOutdBm,
    ChangeLossdB,
    ChangeLossPercent,
    Convert_To_dBm,
    Convert_To_Watt,
    VppToWdbm,
    dBmToVppW,
    WTodBmVpp,
}