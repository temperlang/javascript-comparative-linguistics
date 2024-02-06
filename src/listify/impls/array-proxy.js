import { bad } from "../bad.js";

export const immutableArrayProxy = {
    set(obj, key, value) {
        throw TypeError(`cannot set ${key} on List`);
    },

    get(obj, key) {
        if (key in bad) {
            return bad[key](obj);
        } else {
            return obj[key];
        }
    },
};

export const listifyArrayProxy = (...args) => {
    return new Proxy(args, immutableArrayProxy);
};

listifyArrayProxy(1, 2, 3).map(x => x);
