// Source: https://gist.github.com/kottenator/9d936eb3e4e3c3e02598
function pagination(c, m) {
    var current = c,
        last = m,
        delta = 2,
        left = current - delta,
        right = current + delta + 1,
        range = [],
        rangeWithDots = [],
        l;

    for (var i = 1; i <= last; i++) {
        if (i == 1 || i == last || (i >= left && i < right)) {
            range.push(i);
        }
    }

    for (
        var arr = range,
            isArray = Array.isArray(arr),
            i = 0,
            arr = isArray ? arr : arr[Symbol.iterator]();
        ;

    ) {
        var ref;

        if (isArray) {
            if (i >= arr.length) break;
            ref = arr[i++];
        } else {
            i = arr.next();
            if (i.done) break;
            ref = i.value;
        }

        var n = ref;

        if (l) {
            if (n - l === 2) {
                rangeWithDots.push(l + 1);
            } else if (n - l !== 1) {
                rangeWithDots.push("...");
            }
        }
        rangeWithDots.push(n);
        l = n;
    }
    return rangeWithDots;
}
