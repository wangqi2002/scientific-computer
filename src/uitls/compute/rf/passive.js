function coaxialAnalyze(formData) {
    let obj = {}
    let e0 = eval(formData.er);
    let a0 = eval(formData.a);
    let b0 = eval(formData.b);
    if (e0 <= 0 || formData.er == "") {
        e0 = 2;
        obj.er = e0
    }
    if (a0 <= 0 || formData.a == "") {
        a0 = 1;
        obj.a = a0
    }
    if (b0 <= 0 || formData.b == "") {
        b0 = 4;
        obj.b = b0
    }
    if (b0 < a0) {
        b0 = a0 * 2;
        obj.b = b0
    }
    let k1 = Math.log(b0 / a0);
    let k2 = Math.sqrt(e0);
    let c = 55.556 * e0 / k1;
    let l = 200 * k1;
    let z = 60 * k1 / k2;
    let v = 3e5 / k2;
    let t = 3.33 * k2;
    obj.Z0 = z;
    obj.Cap = c;
    obj.Ind = l;
    obj.Vp = v;
    obj.Td = t
    return obj
}

function coaxialSvnthesis1(formData) {
    let obj = {}
    let e0 = eval(formData.er);
    let a0 = eval(formData.a);
    let z0 = eval(formData.z);
    if (e0 <= 0 || formData.er == "") {
        e0 = 2;
        obj.er = e0
    }
    if (a0 <= 0 || formData.a == "") {
        a0 = 1;
        obj.a = a0
    }
    let k2 = Math.sqrt(e0);
    let k3 = z0 * k2 / 60;
    let b0 = a0 * Math.pow(2.718281828, k3);
    let k1 = Math.log(b0 / a0);
    let c = 55.556 * e0 / k1;
    let l = 200 * k1;
    let v = 3e5 / k2;
    let t = 3.33 * k2;
    obj.b = b0;
    obj.Cap = c;
    obj.Ind = l;
    obj.Vp = v;
    obj.Td = t
    return obj
}

function coaxialSvnthesis2(formData) {
    let obj = {}
    let e0 = eval(formData.er);
    let b0 = eval(formData.b);
    let z0 = eval(formData.z);
    if (e0 <= 0 || formData.er == "") {
        e0 = 2;
        obj.er = e0
    }
    if (b0 <= 0 || formData.b == "") {
        b0 = 4;
        obj.b = b0
    }
    let k2 = Math.sqrt(e0);
    let k3 = z0 * k2 / 60;
    let a0 = b0 / Math.pow(2.718281828, k3);
    let k1 = Math.log(b0 / a0);
    let c = 55.556 * e0 / k1;
    let l = 200 * k1;
    let v = 3e5 / k2;
    let t = 3.33 * k2;
    obj.a = a0;
    obj.Cap = c;
    obj.Ind = l;
    obj.Vp = v;
    obj.Td = t
    return obj
}