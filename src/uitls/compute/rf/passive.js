
function CoplanarAnalyze(formData) {
    let obj = {}
    let e0 = eval(formData.er);
    let s0 = eval(formData.s);
    let w0 = eval(formData.W);
    let h0 = eval(formData.h);
    let f0 = eval(formData.f);
    if (e0 <= 0 || formData.er == "" || formData.er == undefined) {
        e0 = 2.6;
        obj.er = e0
    }
    if (s0 <= 0 || formData.s == "" || formData.s == undefined) {
        s0 = 1;
        obj.s = s0
    }
    if (w0 <= 0 || formData.W == "" || formData.W == undefined) {
        w0 = 0.5;
        obj.W = w0
    }
    if (h0 <= 0 || formData.h == "" || formData.h == undefined) {
        h0 = 0.6;
        obj.h = h0
    }
    if (f0 <= 0 || formData.f == "" || formData.f == undefined) {
        f0 = 1000;
        obj.f = f0
    }
    let a = s0 / 2;
    let b = a + w0;
    let k = a / b;
    let kd = Math.sqrt(1 - k * k);
    let sk = Math.sqrt(k);
    let skd = Math.sqrt(kd);
    let k1 = PI * a / (2 * h0);
    let k2 = PI * b / (2 * h0);
    let ex1 = Math.exp(k1);
    let ex2 = Math.exp(-k1);
    let ex3 = Math.exp(k2);
    let ex4 = Math.exp(-k2);
    let k1x = ((ex1 - ex2) / 2) / ((ex3 - ex4) / 2);
    let k1y = Math.sqrt(1 - k1x * k1x);
    let sk1 = Math.sqrt(k1x);
    let sk1d = Math.sqrt(k1y);
    let kk = 0
    let kk1 = 0
    if (k < 0.7) {
        kk = 1 / (Math.log(2 * (1 + skd) / (1 - skd)) / PI)
    } else {
        kk = Math.log(2 * (1 + sk) / (1 - sk)) / PI
    }
    if (k1x < 0.7) {
        kk1 = 1 / (Math.log(2 * (1 + sk1d) / (1 - sk1d)) / PI)
    } else {
        kk1 = Math.log(2 * (1 + sk1) / (1 - sk1)) / PI
    }
    let ef = 1 + (e0 - 1) / 2 * kk1 / kk;
    let z = 120 * PI * kk / Math.sqrt(ef);
    obj.Zo = z;
    obj.eff = ef;
    k = 1 / Math.sqrt(ef);
    obj.k = k;
    let l4 = 30 * 1e10 * k / (f0 * 1e6 * 4);
    obj.l4 = l4
    return obj;
}
function CoplanarSvnthesis(formData) {
    let obj = {}
    let e0 = eval(formData.er);
    let s0 = eval(formData.s);
    let h0 = eval(formData.h);
    let f0 = eval(formData.f);
    let z0 = eval(formData.Z);
    if (e0 <= 0 || f.er == "" || f.er == undefined) {
        e0 = 2.6;
        obj.er = e0
    }
    if (s0 <= 0 || formData.s == "" || formData.s == undefined) {
        s0 = 1;
        obj.s = s0
    }
    if (h0 <= 0 || formData.h == "" || formData.h == undefined) {
        h0 = 0.6;
        obj.h = h0
    }
    if (f0 <= 0 || formData.f == "" || formData.f == undefined) {
        f0 = 1000;
        obj.f = f0
    }
    if (z0 <= 0 || formData.Z == "" || formData.Z == undefined) {
        z0 = 50;
        obj.Z = z0
    }
    let w0 = s0;
    let ww = s0 * 0.5;
    if (z0 < 70) {
        ww = s0 * 10
    }
    let ee = 1;
    let n = 0;
    let ef = 0;
    let frg = 0
    while (ee > 0.001) {
        let a = s0 / 2;
        let b = a + w0;
        let k = a / b;
        let kd = Math.sqrt(1 - k * k);
        let sk = Math.sqrt(k);
        let skd = Math.sqrt(kd);
        let k1 = PI * a / (2 * h0);
        let k2 = PI * b / (2 * h0);
        let ex1 = Math.exp(k1);
        let ex2 = Math.exp(-k1);
        let ex3 = Math.exp(k2);
        let ex4 = Math.exp(-k2);
        let k1x = ((ex1 - ex2) / 2) / ((ex3 - ex4) / 2);
        let k1y = Math.sqrt(1 - k1x * k1x);
        let sk1 = Math.sqrt(k1x);
        let sk1d = Math.sqrt(k1y);
        let kk = 0
        let kk1 = 0
        if (k < 0.7) {
            kk = 1 / (Math.log(2 * (1 + skd) / (1 - skd)) / PI)
        } else {
            kk = Math.log(2 * (1 + sk) / (1 - sk)) / PI
        }
        if (k1x < 0.7) {
            kk1 = 1 / (Math.log(2 * (1 + sk1d) / (1 - sk1d)) / PI)
        } else {
            kk1 = Math.log(2 * (1 + sk1) / (1 - sk1)) / PI
        }
        ef = 1 + (e0 - 1) / 2 * kk1 / kk;
        let z = 120 * PI * kk / Math.sqrt(ef);
        let err = z - z0;
        ee = Math.abs(err);
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
    obj.ww = w0;
    obj.eff = ef;
    let k = 1 / Math.sqrt(ef);
    obj.k = k;
    let l4 = 30 * 1e10 * k / (f0 * 1e6 * 4);
    obj.l4 = l4
    return obj;
}