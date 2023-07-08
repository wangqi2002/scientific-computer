const pi = 3.141592653;

function helical_inductance(formData) {
    let result = {
        ind: '',
        h: ''
    }
    let D, w, s, n;

    w = formData.w * 1;
    n = formData.n * 1;
    D = formData.D * 1;
    s = formData.s * 1;

    D = D / 25.4;
    s = s / 25.4;
    w = w / 25.4;

    let h = n * (w + s);

    let ind = (D * D * n * n) / (18 * D + 40 * h);

    let r = D / 2;

    ind = Math.round(ind * 1000) / 1000;
    h = Math.round(h * 2540) / 100;

    result.ind = ind
    result.h = h

    return result
}

export {
    helical_inductance
}