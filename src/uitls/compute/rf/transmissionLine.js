const PI = 3.141592659;
const E0 = 8.854;   //单位：pF/m
const U0 = PI * 400;   //单位：nH/m

// 取有效数字
// const formatter = new Intl.NumberFormat('en-US', {
//     maximumFractionDigits: 5,
//  });

//  console.log(formatter.format(2.005));
//  console.log(formatter.format(1.345));

// slit line
function slitAnalyze(formData) {
    let obj = {}
    let e0 = eval(formData.er);
    let h0 = eval(formData.h);
    let f0 = eval(formData.f);
    let w0 = eval(formData.W);
    if (e0 < 2.2 || formData.er === "" || formData.er == undefined) {
        e0 = 2.2;
        obj.er = e0
    }
    if (e0 > 20 || formData.er === "" || formData.er == undefined) {
        e0 = 20;
        obj.er = e0
    }
    if (h0 <= 0 || formData.h === "" || formData.h == undefined) {
        h0 = 1;
        obj.h = h0
    }
    if (f0 <= 0 || formData.f === "" || formData.f == undefined) {
        f0 = 1000;
        obj.f = f0
    }
    if (w0 <= 0 || formData.W === "" || formData.W == undefined) {
        w0 = 0.1;
        obj.W = w0
    }
    let r0 = 30e10 / (f0 * 1e6);
    let k1 = w0 / h0;
    let kx = w0 / r0;
    let k2 = Math.log(e0);
    let k3 = null
    let z = null
    if (e0 < 3.8 && kx <= 0.075) {
        let k3a = 1.045 - 0.365 * k2 + 6.4 * k1 * Math.pow(e0, 0.945) / (238.64 + 100 * k1);
        let k3b = (0.148 - 8.81 * (e0 + 0.95) / (100 * e0)) * Math.log(h0 / r0);
        k3 = k3a - k3b;
        let k4 = 60.0 + 3.69 * Math.sin((e0 - 2.22) * PI / 2.36) + 133.5 * Math.log(10 * e0) * Math.sqrt(kx);
        let k5 = 2.81 * (1 - 0.011 * e0 * (4.48 + k2)) * k1 * Math.log(h0 / r0 * 100);
        let k6 = 131.1 * (1.028 - k2) * Math.sqrt(h0 / r0);
        let k7 = 12.48 * (1.0 + 0.18 * k2) * k1 / (Math.sqrt(e0 - 2.06 + 0.85 * k1 * k1));
        z = k4 + k5 + k6 + k7
    }
    if (e0 < 3.8 && kx > 0.075) {
        let k3a = 1.194 - 0.24 * k2 - 0.621 * Math.pow(e0, 0.835) * Math.pow(kx, 0.48) / (1.344 + k1);
        let k3b = 0.0617 * (1.91 - (e0 + 2.0) / e0) * Math.log(h0 / r0);
        k3 = k3a - k3b;
        let k4 = 133.0 + 10.34 * Math.pow((e0 - 1), 2) + 2.87 * (2.96 + Math.pow((e0 - 1.582), 2));
        let k5 = (k1 + 2.32 * e0 - 0.56) * ((32.5 - 6.67 * e0) * Math.pow((100 * h0 / r0), 2) - 1);
        let k6 = (684.45 * h0 / r0) * Math.pow((e0 + 1.35), 2);
        let k7 = 13.23 * Math.pow(((e0 - 1.722) * kx), 2);
        z = k4 + Math.sqrt(k5) + k6 + k7
    }
    if (e0 >= 3.8 && e0 < 9.7 && kx <= 0.075) {
        let k3a = 0.9217 - 0.277 * k2 + 0.032 * k1 * Math.sqrt(e0 / (k1 + 0.435));
        let k3b = 0.01 * Math.log(h0 / r0) * (4.6 - 3.65 / (e0 * e0 * Math.sqrt(kx) * (9.06 - 100 * kx)));
        k3 = k3a - k3b;
        let k4 = 73.6 - 2.15 * e0 + (638.9 - 31.37 * e0) * Math.pow(kx, 0.6);
        let k5 = (36.23 * Math.sqrt(e0 * e0 + 41) - 225) * k1 / (k1 + 0.876 * e0 - 2);
        let k6 = 0.51 * (e0 + 2.12) * k1 * Math.log(100 * h0 / r0);
        let k7 = 0.753 * e0 * h0 / r0 / Math.sqrt(kx);
        z = k4 + k5 + k6 - k7
    }
    if (e0 >= 3.8 && e0 < 9.7 && kx > 0.075) {
        let k3a = 1.05 - 0.04 * e0 + 0.01411 * (e0 - 1.421) * Math.log(k1 - 2.012 * (1 - 0.146 * e0));
        let k3b = 0.111 * (1 - 0.366 * e0) * Math.sqrt(kx) + 0.139 * (1 + 0.52 * e0 * Math.log(14.7 - e0) * h0 / r0 * Math.log(h0 / r0));
        k3 = k3a + k3b;
        let k4 = 120.75 - 3.74 * e0 + 50 * (Math.atan(2 * e0) - 0.8);
        let k5 = Math.pow(k1, (1.11 + (0.132 * (e0 - 27.7) / (100 * h0 / r0 + 5))));
        let k6 = Math.log(100 * h0 / r0 + Math.sqrt(Math.pow((100 * h0 / r0), 2) + 1));
        let k7 = 14.21 * (1 - 0.458 * e0) * (100 * h0 / r0 + 5.1 * k2 - 13.1) * Math.pow((kx + 0.33), 2);
        let z = k4 * k5 * k6 + k7
    }
    if (e0 >= 9.7 && k1 <= 0.2) {
        k3 = 0.923 - 0.195 * k2 + 0.2 * k1 - (0.126 * k1 + 0.02) * Math.log(h0 / r0 * 100);
        let k4 = 72.62 - 15.283 * k2 + 50 * (k1 - 0.02) * (k1 - 0.1) / k1;
        let k5 = Math.log(k1 * 100) * (19.23 - 3.693 * k2);
        let k6 = 0.139 * k2 - 0.11 + k1 * (0.465 * k2 + 1.44);
        let k7 = Math.pow((11.4 - 2.636 * k2 - h0 / r0 * 100), 2);
        z = k4 + k5 - k6 * k7
    }
    if (e0 >= 9.7 && k1 > 0.2) {
        k3 = 0.987 - 0.21 * k2 + (0.111 - 0.0022 * e0) * k1 - (0.053 + 0.041 * k1 - 0.0014 * e0) * Math.log(h0 / r0 * 100);
        let k4 = 113.19 - 23.257 * k2 + 1.25 * k1 * (114.59 - 22.531 * k2);
        let k5 = 20 * (k1 - 0.2) * (1 - k1);
        let k6 = 0.15 + 0.1 * k2 + k1 * (-0.79 + 0.899 * k2);
        let k7 = Math.pow((10.25 - 2.171 * k2 + k1 * (2.1 - 0.617 * k2) - h0 / r0 * 100), 2);
        z = k4 + k5 - k6 * k7
    }
    let ef = Math.pow(k3, -2);
    let k = 1 / Math.sqrt(ef);
    obj.Zo = z;
    obj.ef = ef;
    obj.k = k;
    let l4 = 30 * 1e10 * k / (f0 * 1e6 * 4);
    obj.l4 = l4
    return obj
}
function slitSvnthesis(formData) {
    let obj = {}
    let e0 = eval(formData.er);
    let h0 = eval(formData.h);
    let f0 = eval(formData.f);
    let z0 = eval(formData.Z);
    let w0 = 0.6;
    let ww = 0.3;
    let ee = 1;
    let n = 0;
    if (e0 <= 0 || formData.er === "" || formData.er == undefined) {
        e0 = 10;
        obj.er = e0
    }
    if (h0 <= 0 || formData.h === "" || formData.h == undefined) {
        h0 = 1;
        obj.h = h0
    }
    if (f0 <= 0 || formData.f === "" || formData.f == undefined) {
        f0 = 1000;
        obj.f = f0
    }
    if (z0 <= 0 || formData.Z === "" || formData.Z == undefined) {
        z0 = 100;
        obj.Z = z0
    }
    let r0 = 30e10 / (f0 * 1e6);
    let k2 = Math.log(e0);
    let k3 = null
    let z = null
    let frg = 0
    while (ee > 0.001) {
        let k1 = w0 / h0;
        let kx = w0 / r0;
        if (e0 < 3.8 && kx <= 0.075) {
            let k3a = 1.045 - 0.365 * k2 + 6.4 * k1 * Math.pow(e0, 0.945) / (238.64 + 100 * k1);
            let k3b = (0.148 - 8.81 * (e0 + 0.95) / (100 * e0)) * Math.log(h0 / r0);
            k3 = k3a - k3b;
            let k4 = 60.0 + 3.69 * Math.sin((e0 - 2.22) * PI / 2.36) + 133.5 * Math.log(10 * e0) * Math.sqrt(kx);
            let k5 = 2.81 * (1 - 0.011 * e0 * (4.48 + k2)) * k1 * Math.log(h0 / r0 * 100);
            let k6 = 131.1 * (1.028 - k2) * Math.sqrt(h0 / r0);
            let k7 = 12.48 * (1.0 + 0.18 * k2) * k1 / (Math.sqrt(e0 - 2.06 + 0.85 * k1 * k1));
            z = k4 + k5 + k6 + k7
        }
        if (e0 < 3.8 && kx > 0.075) {
            let k3a = 1.194 - 0.24 * k2 - 0.621 * Math.pow(e0, 0.835) * Math.pow(kx, 0.48) / (1.344 + k1);
            let k3b = 0.0617 * (1.91 - (e0 + 2.0) / e0) * Math.log(h0 / r0);
            k3 = k3a - k3b;
            let k4 = 133.0 + 10.34 * Math.pow((e0 - 1), 2) + 2.87 * (2.96 + Math.pow((e0 - 1.582), 2));
            let k5 = (k1 + 2.32 * e0 - 0.56) * ((32.5 - 6.67 * e0) * Math.pow((100 * h0 / r0), 2) - 1);
            let k6 = (684.45 * h0 / r0) * Math.pow((e0 + 1.35), 2);
            let k7 = 13.23 * Math.pow(((e0 - 1.722) * kx), 2);
            z = k4 + Math.sqrt(k5) + k6 + k7
        }
        if (e0 >= 3.8 && e0 < 9.7 && kx <= 0.075) {
            let k3a = 0.9217 - 0.277 * k2 + 0.032 * k1 * Math.sqrt(e0 / (k1 + 0.435));
            let k3b = 0.01 * Math.log(h0 / r0) * (4.6 - 3.65 / (e0 * e0 * Math.sqrt(kx) * (9.06 - 100 * kx)));
            k3 = k3a - k3b;
            let k4 = 73.6 - 2.15 * e0 + (638.9 - 31.37 * e0) * Math.pow(kx, 0.6);
            let k5 = (36.23 * Math.sqrt(e0 * e0 + 41) - 225) * k1 / (k1 + 0.876 * e0 - 2);
            let k6 = 0.51 * (e0 + 2.12) * k1 * Math.log(100 * h0 / r0);
            let k7 = 0.753 * e0 * h0 / r0 / Math.sqrt(kx);
            z = k4 + k5 + k6 - k7
        }
        if (e0 >= 3.8 && e0 < 9.7 && kx > 0.075) {
            let k3a = 1.05 - 0.04 * e0 + 0.01411 * (e0 - 1.421) * Math.log(k1 - 2.012 * (1 - 0.146 * e0));
            let k3b = 0.111 * (1 - 0.366 * e0) * Math.sqrt(kx) + 0.139 * (1 + 0.52 * e0 * Math.log(14.7 - e0) * h0 / r0 * Math.log(h0 / r0));
            k3 = k3a + k3b;
            let k4 = 120.75 - 3.74 * e0 + 50 * (Math.atan(2 * e0) - 0.8);
            let k5 = Math.pow(k1, (1.11 + (0.132 * (e0 - 27.7) / (100 * h0 / r0 + 5))));
            let k6 = Math.log(100 * h0 / r0 + Math.sqrt(Math.pow((100 * h0 / r0), 2) + 1));
            let k7 = 14.21 * (1 - 0.458 * e0) * (100 * h0 / r0 + 5.1 * k2 - 13.1) * Math.pow((kx + 0.33), 2);
            z = k4 * k5 * k6 + k7
        }
        if (e0 >= 9.7 && k1 <= 0.2) {
            k3 = 0.923 - 0.195 * k2 + 0.2 * k1 - (0.126 * k1 + 0.02) * Math.log(h0 / r0 * 100);
            let k4 = 72.62 - 15.283 * k2 + 50 * (k1 - 0.02) * (k1 - 0.1) / k1;
            let k5 = Math.log(k1 * 100) * (19.23 - 3.693 * k2);
            let k6 = 0.139 * k2 - 0.11 + k1 * (0.465 * k2 + 1.44);
            let k7 = Math.pow((11.4 - 2.636 * k2 - h0 / r0 * 100), 2);
            z = k4 + k5 - k6 * k7
        }
        if (e0 >= 9.7 && k1 > 0.2) {
            k3 = 0.987 - 0.21 * k2 + (0.111 - 0.0022 * e0) * k1 - (0.053 + 0.041 * k1 - 0.0014 * e0) * Math.log(h0 / r0 * 100);
            let k4 = 113.19 - 23.257 * k2 + 1.25 * k1 * (114.59 - 22.531 * k2);
            let k5 = 20 * (k1 - 0.2) * (1 - k1);
            let k6 = 0.15 + 0.1 * k2 + k1 * (-0.79 + 0.899 * k2);
            let k7 = Math.pow((10.25 - 2.171 * k2 + k1 * (2.1 - 0.617 * k2) - h0 / r0 * 100), 2);
            z = k4 + k5 - k6 * k7
        }
        let err = z - z0;
        ee = Math.abs(err);
        if (n == 0) {
            n = 1;
            if (err < 0) {
                frg = 1
            } else {
                frg = 0
            }
        }
        if (err > 0) {
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
    let ef = Math.pow(k3, -2);
    let k = 1 / Math.sqrt(ef);
    obj.ef = ef;
    obj.k = k;
    let l4 = 30 * 1e10 * k / (f0 * 1e6 * 4);
    obj.l4 = l4
    return obj
}

// Coplanar strips
function CoplanarAnalyze(formData) {
    let obj = {}
    let e0 = eval(formData.er);
    let s0 = eval(formData.s);
    let w0 = eval(formData.W);
    let h0 = eval(formData.h);
    let f0 = eval(formData.f);
    if (e0 <= 0 || formData.er === "" || formData.er == undefined) {
        e0 = 2.6;
        obj.er = e0
    }
    if (s0 <= 0 || formData.s === "" || formData.s == undefined) {
        s0 = 1;
        obj.s = s0
    }
    if (w0 <= 0 || formData.W === "" || formData.W == undefined) {
        w0 = 0.5;
        obj.W = w0
    }
    if (h0 <= 0 || formData.h === "" || formData.h == undefined) {
        h0 = 0.6;
        obj.h = h0
    }
    if (f0 <= 0 || formData.f === "" || formData.f == undefined) {
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
    obj.ef = ef;
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
    if (e0 <= 0 || formData.er === "" || formData.er == undefined) {
        e0 = 2.6;
        obj.er = e0
    }
    if (s0 <= 0 || formData.s === "" || formData.s == undefined) {
        s0 = 1;
        obj.s = s0
    }
    if (h0 <= 0 || formData.h === "" || formData.h == undefined) {
        h0 = 0.6;
        obj.h = h0
    }
    if (f0 <= 0 || formData.f === "" || formData.f == undefined) {
        f0 = 1000;
        obj.f = f0
    }
    if (z0 <= 0 || formData.Z === "" || formData.Z == undefined) {
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
    obj.WW = w0;
    obj.ef = ef;
    let k = 1 / Math.sqrt(ef);
    obj.k = k;
    let l4 = 30 * 1e10 * k / (f0 * 1e6 * 4);
    obj.l4 = l4
    return obj;
}

// strip line
function stripAnalyze(formData) {
    let obj = {}
    let e0 = eval(formData.er);
    let b0 = eval(formData.b);
    let t0 = eval(formData.t) * 1e-3;
    let f0 = eval(formData.f);
    let w0 = eval(formData.W);
    if (e0 <= 0 || formData.er === "" || formData.er == undefined) {
        e0 = 4.5;
        obj.er = e0
    }
    if (b0 <= 0 || formData.b === "" || formData.b == undefined) {
        b0 = 1;
        obj.b = b0
    }
    if (t0 <= 0 || formData.t === "" || formData.t == undefined) {
        t0 = 18;
        obj.t = t0;
        t0 = t0 * 1e-3
    }
    if (f0 <= 0 || formData.f === "" || formData.f == undefined) {
        f0 = 1000;
        obj.f = f0
    }
    if (w0 <= 0 || formData.W === "" || formData.W == undefined) {
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
    if (e0 <= 0 || formData.er === "" || formData.er == undefined) {
        e0 = 4.5;
        obj.er = e0
    }
    if (b0 <= 0 || formData.b === "" || formData.b == undefined) {
        b0 = 1;
        obj.b = b0
    }
    if (t0 <= 0 || formData.t === "" || formData.t == undefined) {
        t0 = 18;
        obj.t = t0;
        t0 = t0 * 1e-3
    }
    if (f0 <= 0 || formData.f === "" || formData.f == undefined) {
        f0 = 1000;
        obj.f = f0
    }
    if (z0 <= 0 || formData.Z === "" || formData.Z == undefined) {
        z0 = 50;
        obj.Z = z0
    }
    let k9 = null
    let frg = 0
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

// microstrip line
function microstripAnalyze(formData) {
    let obj = {}
    let e0 = eval(formData.er);
    let h0 = eval(formData.h);
    let t0 = eval(formData.t) * 1e-3;
    let f0 = eval(formData.f);
    let w0 = eval(formData.W);
    if (e0 <= 0 || formData.er === "" || formData.er == undefined) {
        e0 = 4.5;
        obj.er = e0
    }
    if (h0 <= 0 || formData.h === "" || formData.h == undefined) {
        h0 = 1;
        obj.h = h0
    }
    if (t0 <= 0 || formData.t === "" || formData.t == undefined) {
        t0 = 18;
        obj.t = t0;
        t0 = t0 * 1e-3
    }
    if (f0 <= 0 || formData.f === "" || formData.f == undefined) {
        f0 = 1000;
        obj.f = f0
    }
    if (w0 <= 0 || formData.W === "" || formData.W == undefined) {
        w0 = 1.85192;
        obj.W = w0
    }
    console.log(e0, h0, t0, f0, w0)
    let a = (1 + 1 / e0) / 2;
    let k1 = Math.pow((t0 / h0), 2);
    let k2 = Math.pow((PI * (w0 / t0 + 1.1)), 2);
    let k3 = Math.sqrt(k1 + 1 / k2);
    let k4 = Math.log(4 / k3);
    let dw = t0 * (1 + k4) / PI;
    let w1 = w0 + a * dw;
    let k5 = 4 * h0 / w1;
    let b = ((14 + 8 / e0) / 11) * k5;
    let k6 = Math.pow(b, 2);
    let k7 = Math.pow(PI, 2);
    let k8 = Math.sqrt(k6 + a * k7);
    let k9 = Math.log(1 + k5 * (b + k8));
    let k10 = Math.sqrt(e0 + 1);
    let z = 42.4 / k10 * k9;
    let ao = 1;
    let wo = w0 + ao * dw;
    let k11 = 4 * h0 / wo;
    let bo = 2 * k11;
    let k12 = Math.pow(bo, 2);
    let k13 = Math.sqrt(k12 + ao * k7);
    let k14 = Math.log(1 + k11 * (bo + k13));
    let k15 = Math.sqrt(2);
    let zo = 42.4 / k15 * k14;
    let ef0 = Math.pow((zo / z), 2);
    let fp = z / (0.8 * PI * h0);
    let g = 0.6 + 0.009 * z;
    let k16 = Math.pow((f0 / fp / 1e3), 2);
    let ef = e0 - (e0 - ef0) / (1 + g * k16);
    let k17 = Math.sqrt(ef0 / ef);
    let zz = z * k17;
    obj.Zo = zz;
    obj.ef = ef;
    let k = Math.sqrt(1 / ef)
    obj.k = k;
    let l4 = 30 * 1e10 * k / (f0 * 1e6 * 4);
    obj.l4 = l4
    return obj
}
function microstripSvnthesis(formData) {
    let obj = {}
    let e0 = eval(formData.er);
    let h0 = eval(formData.h);
    let t0 = eval(formData.t) * 1e-3;
    let f0 = eval(formData.f);
    let z0 = eval(formData.Z);
    let w0 = 1;
    let ww = 0.5;
    let ee = 1;
    let n = 0;
    if (e0 <= 0 || formData.er === "" || formData.er == undefined) {
        e0 = 4.5;
        obj.er = e0
    }
    if (h0 <= 0 || formData.h === "" || formData.h == undefined) {
        h0 = 1;
        obj.h = h0
    }
    if (t0 <= 0 || formData.t === "" || formData.t == undefined) {
        t0 = 18;
        obj.t = t0;
        t0 = t0 * 1e-3
    }
    if (f0 <= 0 || formData.f === "" || formData.f == undefined) {
        f0 = 1000;
        obj.f = f0
    }
    if (z0 <= 0 || formData.Z === "" || formData.Z == undefined) {
        z0 = 50;
        obj.Z = z0
    }
    let ef = null
    let frg = 0
    while (ee > 0.001) {
        let a = (1 + 1 / e0) / 2;
        let k1 = Math.pow((t0 / h0), 2);
        let k2 = Math.pow((PI * (w0 / t0 + 1.1)), 2);
        let k3 = Math.sqrt(k1 + 1 / k2);
        let k4 = Math.log(4 / k3);
        let dw = t0 * (1 + k4) / PI;
        let w1 = w0 + a * dw;
        let k5 = 4 * h0 / w1;
        let b = ((14 + 8 / e0) / 11) * k5;
        let k6 = Math.pow(b, 2);
        let k7 = Math.pow(PI, 2);
        let k8 = Math.sqrt(k6 + a * k7);
        let k9 = Math.log(1 + k5 * (b + k8));
        let k10 = Math.sqrt(e0 + 1);
        let z = 42.4 / k10 * k9;
        let ao = 1;
        let wo = w0 + ao * dw;
        let k11 = 4 * h0 / wo;
        let bo = 2 * k11;
        let k12 = Math.pow(bo, 2);
        let k13 = Math.sqrt(k12 + ao * k7);
        let k14 = Math.log(1 + k11 * (bo + k13));
        let k15 = Math.sqrt(2);
        let zo = 42.4 / k15 * k14;
        let ef0 = Math.pow((zo / z), 2);
        let fp = z / (0.8 * PI * h0);
        let g = 0.6 + 0.009 * z;
        let k16 = Math.pow((f0 / fp / 1e3), 2);
        ef = e0 - (e0 - ef0) / (1 + g * k16);
        let k17 = Math.sqrt(ef0 / ef);
        let zz = z * k17;
        let err = zz - z0;
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
    obj.WW = w0;
    obj.ef = ef;
    let k = Math.sqrt(1 / ef)
    obj.k = k;
    let l4 = 30 * 1e10 * k / (f0 * 1e6 * 4);
    obj.l4 = l4
    return obj
}

// microstrip line characteristic impedance
function microstripCI(formData) {
    let obj = {}
    // Call maths.pow function 
    function pwr(x, y) {
        return Math.pow(x, y)
    }

    // Round the answer
    function rnd(Num, Places) {
        if (Places > 0) {
            if ((Num.toString().length - Num.toString().lastIndexOf('.')) > (Places + 1)) {
                var Rounder = pwr(10, Places);
                return Math.round(Num * Rounder) / Rounder;
            } else {
                return Num;
            }
        } else {
            return Math.round(Num);
        }
    }

    // Load the text input data into variables as floating point decimals
    var Er = parseFloat(formData.RelativeDielectricConstant)
    var W = parseFloat(formData.TrackWidth)
    var t = parseFloat(formData.TrackThickness)
    var h = parseFloat(formData.DielectricThickness)

    // Calculate the Effective Dielectric Constant
    if ((W / h) < 1) {
        formData.Eeff = (Er + 1) / 2 + (Er - 1) / 2 * ((1 / pwr((1 + (12 * h) / W), 0.5)) + 0.04 * pwr((1 - (W / h)), 2))
    } else {
        formData.Eeff = (Er + 1) / 2 + (Er - 1) / 2 * (1 / pwr((1 + (12 * h) / W), 0.5))
    }

    // Calculate delta W
    var e = 2.7182818284
    var PI = 3.1415926535897932
    var dW = (t / PI) * Math.log((4 * e) / (pwr((t / h), 2) + pwr((1 / PI) / ((W / t) + 1.1), 2)))

    // Calculate delta W' 
    var dWe = dW * ((1 + (1 / formData.Eeff)) / 2)

    // Calculate We 
    var We = W + dWe

    // Calculate A
    var A = ((14 + (8 / formData.Eeff)) / 11) * (4 * h / We)

    // Calculate B
    var B = pwr((pwr(A, 2) + ((1 + (1 / formData.Eeff)) / 2 * pwr(PI, 2))), 0.5)

    // Calculate the Characteristic Impedance to two decimal places
    {
        obj.Impedance = rnd(((120 * PI) / (2 * pwr(2, 0.5) * PI * pwr((Er + 1), 0.5))) * Math.log(1 + ((4 * h / We) * (A + B))), 2)

        // Round the Eeff to three decimal places
        obj.Eeff = rnd(formData.Eeff, 3)
    }
    return obj
}

// skin effect depth
function skinED(formData) {
    let obj = {}
    // Call maths.pow function 
    function pwr(x, y) {
        return Math.pow(x, y)
    }

    // Round the answer
    function rnd(Num, Places) {
        if (Places > 0) {
            if ((Num.toString().length - Num.toString().lastIndexOf('.')) > (Places + 1)) {
                var Rounder = pwr(10, Places);
                return Math.round(Num * Rounder) / Rounder;
            } else {
                return Num;
            }
        } else {
            return Math.round(Num);
        }
    }

    {
        // Load the selected conductor data into the variables p & u
        var ConductorType = formData.material;

        var p = 0;
        var u = 0;

        if (ConductorType == "Aluminium") {
            p = 2.6548;
            u = 1.00002;
        } else if (ConductorType == "Copper") {
            p = 1.678;
            u = 0.999991;
        } else if (ConductorType == "Gold") {
            p = 2.24;
            u = 1.0;
        } else if (ConductorType == "Nickel") {
            p = 6.84;
            u = 600;
        } else if (ConductorType == "Silver") {
            p = 1.586;
            u = 0.99998;
        }
    }

    // Load the text input data into variables as floating point decimals
    {
        var f = parseFloat(formData.Frequency)

        if (isNaN(f)) {
            alert("Please enter a valid frequency in MHz")
            return
        }
    }

    // Calculate the result to three decimal places
    {
        var PI = 3.1415926535897932
        var uo = 4 * 0.00000031415926535897932

        obj.Resistivity = p
        obj.Permeability = u

        obj.Depth = rnd(pwr(p * 0.00000001 / (PI * f * u * uo), 0.5) * 1000, 4)
    }
    return obj
}

// coaxial line
function coaxialAnalyze(formData) {
    let obj = {}
    let e0 = eval(formData.er);
    let a0 = eval(formData.a);
    let b0 = eval(formData.b);
    if (e0 <= 0 || formData.er === "" || formData.er == undefined) {
        e0 = 2;
        obj.er = e0
    }
    if (a0 <= 0 || formData.a === "" || formData.a == undefined) {
        a0 = 1;
        obj.a = a0
    }
    if (b0 <= 0 || formData.b === "" || formData.b == undefined) {
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
    obj.Zo = z;
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
    if (e0 <= 0 || formData.er === "" || formData.er == undefined) {
        e0 = 2;
        obj.er = e0
    }
    if (a0 <= 0 || formData.a === "" || formData.a == undefined) {
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
    if (e0 <= 0 || formData.er === "" || formData.er == undefined) {
        e0 = 2;
        obj.er = e0
    }
    if (b0 <= 0 || formData.b === "" || formData.b == undefined) {
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
function coaxialResistance(formData) {
    let obj = {}
    let f0 = eval(formData.f);  //Hz
    let u0 = eval(formData.ur);  //H/m
    let p0 = eval(formData.p);  //Ω·m
    let d1 = eval(formData.d1);  //m
    let D1 = eval(formData.D1);  //m
    if (f0 <= 0 || formData.f === "" || formData.f == undefined) {
        f0 = 1;
        obj.f = f0
    }
    if (u0 <= 0 || formData.ur === "" || formData.ur == undefined) {
        u0 = 1;
        obj.ur = u0
    }
    if (p0 <= 0 || formData.p === "" || formData.p == undefined) {
        p0 = 1.75e-8;
        obj.p = p0
    }
    if (d1 <= 0 || formData.d1 === "" || formData.d1 == undefined) {
        d1 = 1;
        obj.d1 = d1
    }
    if (D1 <= 0 || formData.D1 === "" || formData.D1 == undefined) {
        D1 = 2;
        obj.D1 = D1
    }
    if (D1 < d1) {
        D1 = d1 * 2;
        obj.b = D1
    }
    let u = u0 * U0 * 1e-9;
    let k1 = f0 * u * p0;
    let k2 = k1 / PI
    let k3 = Math.sqrt(k2)
    let k4 = 1 / (2 * d1)
    let k5 = 1 / (2 * D1)
    let k6 = k3 * (k4 + k5)
    obj.R = k6.toPrecision(5);
    return obj
}

// Parallel lines
function parallelCalc(formData) {
    let obj = {}
    let e0 = eval(formData.er);
    let u0 = eval(formData.ur);
    let a0 = eval(formData.a);
    let d0 = eval(formData.d);
    if (e0 <= 0 || formData.er === "" || formData.er == undefined) {
        e0 = 1;
        obj.er = e0
    }
    if (u0 <= 0 || formData.ur === "" || formData.ur == undefined) {
        u0 = 1;
        obj.ur = u0
    }
    if (a0 <= 0 || formData.a === "" || formData.a == undefined) {
        a0 = 1;
        obj.a = a0
    }
    if (d0 <= 0 || formData.d === "" || formData.d == undefined) {
        d0 = 2;
        obj.d = d0
    }
    if (d0 < a0) {
        d0 = a0 * 2;
        obj.d = d0
    }
    let k1 = d0 / a0;
    let k2 = Math.log(k1)
    let k3 = PI * E0 * e0
    let c = k3 / k2
    obj.C = c.toPrecision(5)
    let k4 = U0 * u0
    let k5 = k4 / PI
    let l = k5 * k2
    obj.L = l.toPrecision(5)
    let k6 = l / c
    let zo = Math.sqrt(k6 * 1000)
    obj.Zo = zo.toPrecision(5)
    return obj
}

//Elliptic cylinder lines
function EllipticcylinderCalc(formData) {
    let obj = {}
    let e0 = eval(formData.er);
    let u0 = eval(formData.ur);
    let a1 = eval(formData.a1);
    let a2 = eval(formData.a2);
    let b1 = eval(formData.b1);
    let b2 = eval(formData.b2);
    if (e0 <= 0 || formData.er === "" || formData.er == undefined) {
        e0 = 1;
        obj.er = e0
    }
    if (u0 <= 0 || formData.ur === "" || formData.ur == undefined) {
        u0 = 1;
        obj.ur = u0
    }
    if (a1 <= 0 || formData.a1 === "" || formData.a1 == undefined) {
        a1 = 2;
        obj.a1 = a1
    }
    if (a2 <= 0 || formData.a2 === "" || formData.a2 == undefined) {
        a2 = 4;
        obj.a2 = a2
    }
    if (a2 < a1) {
        a2 = a1 * 2;
        obj.a2 = a2
    }
    if (b1 <= 0 || formData.b1 === "" || formData.b1 == undefined) {
        b1 = 1;
        obj.b1 = b1
    }
    if (b2 <= 0 || formData.b2 === "" || formData.b2 == undefined) {
        b2 = 2;
        obj.b2 = b2
    }
    if (b2 < b1) {
        b2 = b1 * 2;
        obj.b2 = b2
    }
    let k1 = (a2 + b2) / (a1 + b1)
    let k2 = Math.log(k1)
    let k3 = 2 * PI * E0 * e0
    let c = k3 / k2
    obj.C = c.toPrecision(5)
    let k4 = U0 * u0
    let k5 = 2 * PI
    let k6 = k4 / k5
    let l = k6 * k2
    obj.L = l.toPrecision(5)
    let k7 = l / c
    let zo = Math.sqrt(k7 * 1000)
    obj.Zo = zo.toPrecision(5)
    return obj
}

//Square column lines
function SquarecolumnCalc(formData) {
    let obj = {}
    let e0 = eval(formData.er);
    let u0 = eval(formData.ur);
    let a0 = eval(formData.a);
    let b0 = eval(formData.b);
    if (e0 <= 0 || formData.er === "" || formData.er == undefined) {
        e0 = 1;
        obj.er = e0
    }
    if (u0 <= 0 || formData.ur === "" || formData.ur == undefined) {
        u0 = 1;
        obj.ur = u0
    }
    if (a0 <= 0 || formData.a === "" || formData.a == undefined) {
        a0 = 1;
        obj.a = a0
    }
    if (b0 <= 0 || formData.b === "" || formData.b == undefined) {
        b0 = 2;
        obj.b = b0
    }
    if (b0 < a0) {
        b0 = a0 * 2;
        obj.b = b0
    }
    let k1 = b0 / a0
    let k2 = Math.log(k1)
    let k3 = 8 * E0 * e0
    let c = k3 / k2
    obj.C = c.toPrecision(5)
    let k4 = U0 * u0 / 8
    let l = k4 * k2
    obj.L = l.toPrecision(5)
    let k5 = l / c
    let zo = Math.sqrt(k5 * 1000)
    obj.Zo = zo.toPrecision(5)
    return obj
}

export {
    slitAnalyze,
    slitSvnthesis,
    CoplanarAnalyze,
    CoplanarSvnthesis,
    stripAnalyze,
    stripSvnthesis,
    microstripAnalyze,
    microstripSvnthesis,
    microstripCI,
    skinED,
    coaxialAnalyze,
    coaxialSvnthesis1,
    coaxialSvnthesis2,
    coaxialResistance,
    parallelCalc,
    EllipticcylinderCalc,
    SquarecolumnCalc,
}