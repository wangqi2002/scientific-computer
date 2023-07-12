const PI = 3.141592659;

function ana(f) {
    e0 = eval(f.er.value);
    h0 = eval(f.h.value);
    f0 = eval(f.f.value);
    w0 = eval(f.w.value);
    if (e0 < 2.2 || f.er.value == "") {
        e0 = 2.2;
        f.er.value = e0
    }
    if (e0 > 20 || f.er.value == "") {
        e0 = 20;
        f.er.value = e0
    }
    if (h0 <= 0 || f.h.value == "") {
        h0 = 1;
        f.h.value = h0
    }
    if (f0 <= 0 || f.f.value == "") {
        f0 = 1000;
        f.f.value = f0
    }
    if (w0 <= 0 || f.w.value == "") {
        w0 = 0.1;
        f.w.value = w0
    }
    r0 = 30e10 / (f0 * 1e6);
    k1 = w0 / h0;
    kx = w0 / r0;
    k2 = Math.log(e0);
    if (e0 < 3.8 && kx <= 0.075) {
        k3a = 1.045 - 0.365 * k2 + 6.4 * k1 * Math.pow(e0, 0.945) / (238.64 + 100 * k1);
        k3b = (0.148 - 8.81 * (e0 + 0.95) / (100 * e0)) * Math.log(h0 / r0);
        k3 = k3a - k3b;
        k4 = 60.0 + 3.69 * Math.sin((e0 - 2.22) * PI / 2.36) + 133.5 * Math.log(10 * e0) * Math.sqrt(kx);
        k5 = 2.81 * (1 - 0.011 * e0 * (4.48 + k2)) * k1 * Math.log(h0 / r0 * 100);
        k6 = 131.1 * (1.028 - k2) * Math.sqrt(h0 / r0);
        k7 = 12.48 * (1.0 + 0.18 * k2) * k1 / (Math.sqrt(e0 - 2.06 + 0.85 * k1 * k1));
        z = k4 + k5 + k6 + k7
    }
    if (e0 < 3.8 && kx > 0.075) {
        k3a = 1.194 - 0.24 * k2 - 0.621 * Math.pow(e0, 0.835) * Math.pow(kx, 0.48) / (1.344 + k1);
        k3b = 0.0617 * (1.91 - (e0 + 2.0) / e0) * Math.log(h0 / r0);
        k3 = k3a - k3b;
        k4 = 133.0 + 10.34 * Math.pow((e0 - 1), 2) + 2.87 * (2.96 + Math.pow((e0 - 1.582), 2));
        k5 = (k1 + 2.32 * e0 - 0.56) * ((32.5 - 6.67 * e0) * Math.pow((100 * h0 / r0), 2) - 1);
        k6 = (684.45 * h0 / r0) * Math.pow((e0 + 1.35), 2);
        k7 = 13.23 * Math.pow(((e0 - 1.722) * kx), 2);
        z = k4 + Math.sqrt(k5) + k6 + k7
    }
    if (e0 >= 3.8 && e0 < 9.7 && kx <= 0.075) {
        k3a = 0.9217 - 0.277 * k2 + 0.032 * k1 * Math.sqrt(e0 / (k1 + 0.435));
        k3b = 0.01 * Math.log(h0 / r0) * (4.6 - 3.65 / (e0 * e0 * Math.sqrt(kx) * (9.06 - 100 * kx)));
        k3 = k3a - k3b;
        k4 = 73.6 - 2.15 * e0 + (638.9 - 31.37 * e0) * Math.pow(kx, 0.6);
        k5 = (36.23 * Math.sqrt(e0 * e0 + 41) - 225) * k1 / (k1 + 0.876 * e0 - 2);
        k6 = 0.51 * (e0 + 2.12) * k1 * Math.log(100 * h0 / r0);
        k7 = 0.753 * e0 * h0 / r0 / Math.sqrt(kx);
        z = k4 + k5 + k6 - k7
    }
    if (e0 >= 3.8 && e0 < 9.7 && kx > 0.075) {
        k3a = 1.05 - 0.04 * e0 + 0.01411 * (e0 - 1.421) * Math.log(k1 - 2.012 * (1 - 0.146 * e0));
        k3b = 0.111 * (1 - 0.366 * e0) * Math.sqrt(kx) + 0.139 * (1 + 0.52 * e0 * Math.log(14.7 - e0) * h0 / r0 * Math.log(h0 / r0));
        k3 = k3a + k3b;
        k4 = 120.75 - 3.74 * e0 + 50 * (Math.atan(2 * e0) - 0.8);
        k5 = Math.pow(k1, (1.11 + (0.132 * (e0 - 27.7) / (100 * h0 / r0 + 5))));
        k6 = Math.log(100 * h0 / r0 + Math.sqrt(Math.pow((100 * h0 / r0), 2) + 1));
        k7 = 14.21 * (1 - 0.458 * e0) * (100 * h0 / r0 + 5.1 * k2 - 13.1) * Math.pow((kx + 0.33), 2);
        z = k4 * k5 * k6 + k7
    }
    if (e0 >= 9.7 && k1 <= 0.2) {
        k3 = 0.923 - 0.195 * k2 + 0.2 * k1 - (0.126 * k1 + 0.02) * Math.log(h0 / r0 * 100);
        k4 = 72.62 - 15.283 * k2 + 50 * (k1 - 0.02) * (k1 - 0.1) / k1;
        k5 = Math.log(k1 * 100) * (19.23 - 3.693 * k2);
        k6 = 0.139 * k2 - 0.11 + k1 * (0.465 * k2 + 1.44);
        k7 = Math.pow((11.4 - 2.636 * k2 - h0 / r0 * 100), 2);
        z = k4 + k5 - k6 * k7
    }
    if (e0 >= 9.7 && k1 > 0.2) {
        k3 = 0.987 - 0.21 * k2 + (0.111 - 0.0022 * e0) * k1 - (0.053 + 0.041 * k1 - 0.0014 * e0) * Math.log(h0 / r0 * 100);
        k4 = 113.19 - 23.257 * k2 + 1.25 * k1 * (114.59 - 22.531 * k2);
        k5 = 20 * (k1 - 0.2) * (1 - k1);
        k6 = 0.15 + 0.1 * k2 + k1 * (-0.79 + 0.899 * k2);
        k7 = Math.pow((10.25 - 2.171 * k2 + k1 * (2.1 - 0.617 * k2) - h0 / r0 * 100), 2);
        z = k4 + k5 - k6 * k7
    }
    ef = Math.pow(k3, -2);
    k = 1 / Math.sqrt(ef);
    f.Z0.value = z;
    f.ef.value = ef;
    f.k.value = k;
    l4 = 30 * 1e10 * k / (f0 * 1e6 * 4);
    f.l4.value = l4
}

function syn(f) {
    e0 = eval(f.er.value);
    h0 = eval(f.h.value);
    f0 = eval(f.f.value);
    z0 = eval(f.z.value);
    w0 = 0.6;
    ww = 0.3;
    ee = 1;
    n = 0;
    if (e0 <= 0 || f.er.value == "") {
        e0 = 10;
        f.er.value = e0
    }
    if (h0 <= 0 || f.h.value == "") {
        h0 = 1;
        f.h.value = h0
    }
    if (f0 <= 0 || f.f.value == "") {
        f0 = 1000;
        f.f.value = f0
    }
    if (z0 <= 0 || f.z.value == "") {
        z0 = 100;
        f.z.value = z0
    }
    r0 = 30e10 / (f0 * 1e6);
    k2 = Math.log(e0);
    while (ee > 0.001) {
        k1 = w0 / h0;
        kx = w0 / r0;
        if (e0 < 3.8 && kx <= 0.075) {
            k3a = 1.045 - 0.365 * k2 + 6.4 * k1 * Math.pow(e0, 0.945) / (238.64 + 100 * k1);
            k3b = (0.148 - 8.81 * (e0 + 0.95) / (100 * e0)) * Math.log(h0 / r0);
            k3 = k3a - k3b;
            k4 = 60.0 + 3.69 * Math.sin((e0 - 2.22) * PI / 2.36) + 133.5 * Math.log(10 * e0) * Math.sqrt(kx);
            k5 = 2.81 * (1 - 0.011 * e0 * (4.48 + k2)) * k1 * Math.log(h0 / r0 * 100);
            k6 = 131.1 * (1.028 - k2) * Math.sqrt(h0 / r0);
            k7 = 12.48 * (1.0 + 0.18 * k2) * k1 / (Math.sqrt(e0 - 2.06 + 0.85 * k1 * k1));
            z = k4 + k5 + k6 + k7
        }
        if (e0 < 3.8 && kx > 0.075) {
            k3a = 1.194 - 0.24 * k2 - 0.621 * Math.pow(e0, 0.835) * Math.pow(kx, 0.48) / (1.344 + k1);
            k3b = 0.0617 * (1.91 - (e0 + 2.0) / e0) * Math.log(h0 / r0);
            k3 = k3a - k3b;
            k4 = 133.0 + 10.34 * Math.pow((e0 - 1), 2) + 2.87 * (2.96 + Math.pow((e0 - 1.582), 2));
            k5 = (k1 + 2.32 * e0 - 0.56) * ((32.5 - 6.67 * e0) * Math.pow((100 * h0 / r0), 2) - 1);
            k6 = (684.45 * h0 / r0) * Math.pow((e0 + 1.35), 2);
            k7 = 13.23 * Math.pow(((e0 - 1.722) * kx), 2);
            z = k4 + Math.sqrt(k5) + k6 + k7
        }
        if (e0 >= 3.8 && e0 < 9.7 && kx <= 0.075) {
            k3a = 0.9217 - 0.277 * k2 + 0.032 * k1 * Math.sqrt(e0 / (k1 + 0.435));
            k3b = 0.01 * Math.log(h0 / r0) * (4.6 - 3.65 / (e0 * e0 * Math.sqrt(kx) * (9.06 - 100 * kx)));
            k3 = k3a - k3b;
            k4 = 73.6 - 2.15 * e0 + (638.9 - 31.37 * e0) * Math.pow(kx, 0.6);
            k5 = (36.23 * Math.sqrt(e0 * e0 + 41) - 225) * k1 / (k1 + 0.876 * e0 - 2);
            k6 = 0.51 * (e0 + 2.12) * k1 * Math.log(100 * h0 / r0);
            k7 = 0.753 * e0 * h0 / r0 / Math.sqrt(kx);
            z = k4 + k5 + k6 - k7
        }
        if (e0 >= 3.8 && e0 < 9.7 && kx > 0.075) {
            k3a = 1.05 - 0.04 * e0 + 0.01411 * (e0 - 1.421) * Math.log(k1 - 2.012 * (1 - 0.146 * e0));
            k3b = 0.111 * (1 - 0.366 * e0) * Math.sqrt(kx) + 0.139 * (1 + 0.52 * e0 * Math.log(14.7 - e0) * h0 / r0 * Math.log(h0 / r0));
            k3 = k3a + k3b;
            k4 = 120.75 - 3.74 * e0 + 50 * (Math.atan(2 * e0) - 0.8);
            k5 = Math.pow(k1, (1.11 + (0.132 * (e0 - 27.7) / (100 * h0 / r0 + 5))));
            k6 = Math.log(100 * h0 / r0 + Math.sqrt(Math.pow((100 * h0 / r0), 2) + 1));
            k7 = 14.21 * (1 - 0.458 * e0) * (100 * h0 / r0 + 5.1 * k2 - 13.1) * Math.pow((kx + 0.33), 2);
            z = k4 * k5 * k6 + k7
        }
        if (e0 >= 9.7 && k1 <= 0.2) {
            k3 = 0.923 - 0.195 * k2 + 0.2 * k1 - (0.126 * k1 + 0.02) * Math.log(h0 / r0 * 100);
            k4 = 72.62 - 15.283 * k2 + 50 * (k1 - 0.02) * (k1 - 0.1) / k1;
            k5 = Math.log(k1 * 100) * (19.23 - 3.693 * k2);
            k6 = 0.139 * k2 - 0.11 + k1 * (0.465 * k2 + 1.44);
            k7 = Math.pow((11.4 - 2.636 * k2 - h0 / r0 * 100), 2);
            z = k4 + k5 - k6 * k7
        }
        if (e0 >= 9.7 && k1 > 0.2) {
            k3 = 0.987 - 0.21 * k2 + (0.111 - 0.0022 * e0) * k1 - (0.053 + 0.041 * k1 - 0.0014 * e0) * Math.log(h0 / r0 * 100);
            k4 = 113.19 - 23.257 * k2 + 1.25 * k1 * (114.59 - 22.531 * k2);
            k5 = 20 * (k1 - 0.2) * (1 - k1);
            k6 = 0.15 + 0.1 * k2 + k1 * (-0.79 + 0.899 * k2);
            k7 = Math.pow((10.25 - 2.171 * k2 + k1 * (2.1 - 0.617 * k2) - h0 / r0 * 100), 2);
            z = k4 + k5 - k6 * k7
        }
        err = z - z0;
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
    f.WW.value = w0;
    ef = Math.pow(k3, -2);
    k = 1 / Math.sqrt(ef);
    f.ef.value = ef;
    f.k.value = k;
    l4 = 30 * 1e10 * k / (f0 * 1e6 * 4);
    f.l4.value = l4
}