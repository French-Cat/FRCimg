var sizes = ["Bytes", "kB", "MB", "GB", "TB", "PB", "EB"];
module.exports = function (size, nospace, one, places, numOnly) {
    if (typeof nospace === "object") {
        var opts = nospace;
        nospace = opts.nospace;
        one = opts.one;
        places = opts.places || 1;
        numOnly = opts.numOnly;
    } else {
        places = places || 1;
    }
    var mysize;
    for (var id = 0; id < sizes.length; id += 1) {
        var unit = sizes[id];
        if (one) {
            unit = unit.slice(0, 1);
        }
        var s = Math.pow(1024, id);
        var fixed;
        if (size >= s) {
            fixed = String((size / s).toFixed(places));
            if (fixed.indexOf(".0") === fixed.length - 2) {
                fixed = fixed.slice(0, -2);
            }
            mysize = fixed + (nospace ? "" : " ") + unit;
        }
    }
    if (!mysize) {
        var _unit = one ? sizes[0].slice(0, 1) : sizes[0];
        mysize = "0" + (nospace ? "" : " ") + _unit;
    }
    if (numOnly) {
        mysize = Number.parseFloat(mysize);
    }
    return mysize;
};
// npm/prettysize