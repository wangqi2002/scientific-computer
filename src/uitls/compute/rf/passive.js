const PI = 3.141592659;
const E0 = 8.854e-12;
const U0 = PI * 4e-7;   //单位：H/m


function coaxialResistance(formData) {
    let obj = {}
    let f0 = eval(formData.f);  //Hz
    let u0 = eval(formData.ur);  //H/m
    let p0 = eval(formData.p);  //Ω·m
    let d1 = eval(formData.d1);  //m
    let D1 = eval(formData.D1);  //m
    if (f0 <= 0 || formData.f == "" || formData.f == undefined) {
        f0 = 1;
        obj.f = f0
    }
    if (u0 <= 0 || formData.ur == "" || formData.ur == undefined) {
        u0 = 1;
        obj.ur = u0
    }
    if (p0 <= 0 || formData.p == "" || formData.p == undefined) {
        p0 = 1.75e-8;
        obj.p = p0
    }
    if (d1 <= 0 || formData.d1 == "" || formData.d1 == undefined) {
        d1 = 1;
        obj.d1 = d1
    }
    if (D1 <= 0 || formData.D1 == "" || formData.D1 == undefined) {
        D1 = 2;
        obj.D1 = D1
    }
    if (D1 < d1) {
        D1 = d1 * 2;
        obj.b = D1
    }
    let u = u0 * U0;
    let k1 = f0 * u * p0;
    let k2 = k1 / PI
    let k3 = Math.sqrt(k2)
    let k4 = 1 / (2 * d1)
    let k5 = 1 / (2 * D1)
    let k6 = k3 * (k4 + k5)
    obj.R = k6;
    return obj
}

console.log(coaxialResistance({}))