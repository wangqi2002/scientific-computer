function Run(formData) {
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
        Permeability = u

        obj.Depth = rnd(pwr(p * 0.00000001 / (PI * f * u * uo), 0.5) * 1000, 4)
    }
    return obj
}