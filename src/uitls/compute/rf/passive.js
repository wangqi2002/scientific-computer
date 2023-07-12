function stripAnalyze(formData) {
    let obj = {}
    let e0 = eval(formData.er);
    let b0 = eval(formData.b);
    let t0 = eval(formData.t) * 1e-3;
    let f0 = eval(formData.f);
    let w0 = eval(formData.W);
    if (e0 <= 0 || formData.er == "") {
        e0 = 4.5;
        obj.er = e0
    }
    if (b0 <= 0 || formData.b == "") {
        b0 = 1;
        obj.b = b0
    }
    if (t0 <= 0 || formData.t == "") {
        t0 = 18;
        obj.t = t0;
        t0 = t0 * 1e-3
    }
    if (f0 <= 0 || formData.f == "") {
        f0 = 1000;
        obj.f = f0
    }
    if (w0 <= 0 || formData.W == "") {
        w0 = 0.41132;
        obj.W = w0
    }
    let z = null
    let x = t0 / b0;
    let m = 2 / (1 + 2 * x / 3 / (1 - x));
    let k1 = b0 - t0;
    let k2 = Math.pow((x / (2 - x)), 2);
    let k3 = Math.pow((0.0796 * x / (w0 / b0 + 1.1 * x)), m);
    let k4 = Math.log(k2 + k3);
    let dw = x / (PI * (1 - x)) * (1 - k4 / 2) * k1;
    let w1 = w0 + dw;
    let k5 = PI * w1;
    let k6 = Math.pow((8 * k1 / k5), 2);
    let k7 = Math.sqrt(k6 + 6.27);
    let k8 = Math.log(1 + 4 * k1 / k5 * (8 * k1 / k5 + k7));
    let k9 = Math.sqrt(e0);
    z = 30 * k8 / k9;
    obj.Zo = z;
    let k = 1 / k9;
    obj.k = k;
    let l4 = 30 * 1e10 * k / (f0 * 1e6 * 4);
    obj.l4 = l4
    return obj;
}

function stripSvnthesis(formData) {
    let obj = {}
    let e0 = eval(formData.er);
    let b0 = eval(formData.b);
    let t0 = eval(formData.t) * 1e-3;
    let f0 = eval(formData.f);
    let z0 = eval(formData.Z);
    let w0 = 1;
    let ww = 0.5;
    let ee = 1;
    let n = 0;
    if (e0 <= 0 || formData.er == "") {
        e0 = 4.5;
        obj.er = e0
    }
    if (b0 <= 0 || formData.b == "") {
        b0 = 1;
        obj.b = b0
    }
    if (t0 <= 0 || formData.t == "") {
        t0 = 18;
        obj.t = t0;
        t0 = t0 * 1e-3
    }
    if (f0 <= 0 || formData.f == "") {
        f0 = 1000;
        obj.f = f0
    }
    if (z0 <= 0 || formData.Z == "") {
        z0 = 50;
        obj.Z = z0
    }
    let k9 = null
    while (ee > 0.001) {
        let x = t0 / b0;
        let m = 2 / (1 + 2 * x / 3 / (1 - x));
        let k1 = b0 - t0;
        let k2 = Math.pow((x / (2 - x)), 2);
        let k3 = Math.pow((0.0796 * x / (w0 / b0 + 1.1 * x)), m);
        let k4 = Math.log(k2 + k3);
        let dw = x / (PI * (1 - x)) * (1 - k4 / 2) * k1;
        let w1 = w0 + dw;
        let k5 = PI * w1;
        let k6 = Math.pow((8 * k1 / k5), 2);
        let k7 = Math.sqrt(k6 + 6.27);
        let k8 = Math.log(1 + 4 * k1 / k5 * (8 * k1 / k5 + k7));
        k9 = Math.sqrt(e0);
        let z = 30 * k8 / k9;
        let err = z - z0;
        ee = Math.abs(err);
        let frg = null
        if (n == 0) {
            n = 1;
            if (err < 0) {
                frg = 0
            } else {
                frg = 1
            }
        }
        if (err < 0) {
            if (frg == 0) {
                w0 = w0 - ww
            } else {
                frg = 0;
                ww = ww / 2
            }
        } else {
            if (frg == 1) {
                w0 = w0 + ww
            } else {
                frg = 1;
                ww = ww / 2
            }
        }
    }
    obj.WW = w0;
    let k = 1 / k9;
    obj.k = k;
    let l4 = 30 * 1e10 * k / (f0 * 1e6 * 4);
    obj.l4 = l4
    return obj;
}