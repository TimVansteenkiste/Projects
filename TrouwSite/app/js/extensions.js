(function() {
    'use strict';

    if (!Array.prototype.find) {
        Array.prototype.find = function (predicate) {
            if (this === null) {
                throw new TypeError('Array.prototype.find called on null or undefined');
            }
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            var list = Object(this);
            var length = list.length >>> 0;
            var thisArg = arguments[1];
            var value;

            for (var i = 0; i < length; i++) {
                value = list[i];
                if (predicate.call(thisArg, value, i, list)) {
                    return value;
                }
            }
            return undefined;
        };
    }

    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (d, e) {
            var a;
            if (null == this) throw new TypeError('"this" is null or not defined');
            var c = Object(this),
                b = c.length >>> 0;
            if (0 === b) return -1;
            a = +e || 0;
            Infinity === Math.abs(a) && (a = 0);
            if (a >= b) return -1;
            for (a = Math.max(0 <= a ? a : b - Math.abs(a), 0) ; a < b;) {
                if (a in c && c[a] === d) return a;
                a++
            }
            return -1
        };
    }
})();