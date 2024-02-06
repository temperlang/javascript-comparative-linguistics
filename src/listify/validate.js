
const doesThrow = (func) => {
    try {
        func();
        return false;
    } catch {
        return true;
    }
};

const doesNotThrow = (func) => {
    return !doesThrow(func);
};

const isImmutable = (obj) => {
    const len = obj.length;
    const ret = [];
    ret.push([' is an object', typeof obj === 'object']);
    ret.push([' is an array', Array.isArray(obj)]);
    ret.push(['.concat works', obj.concat([1, 2, 3]).length == obj.length + 3]);
    ret.push([`.push() throws`,  doesThrow(() => obj.push())]);
    ret.push([`.push(1) throws`,  doesThrow(() => obj.push(1))]);
    ret.push([`.length const`,  obj.length == len]);
    ret.push([`.pop() throws`,  doesThrow(() => obj.pop())]);
    ret.push([`.length const`,  obj.length == len]);
    ret.push(['.copyWithin(0, 0, 0) does not throw', doesNotThrow(() => obj.copyWithin(0, 0, 0))]);
    ret.push(['.copyWithin(0, 1, 1) does not throw', doesNotThrow(() => obj.copyWithin(0, 1, 1))]);
    ret.push(['.copyWithin(0, $.length)', doesNotThrow(() => obj.copyWithin(0, obj.length))])
    ret.push(['.copyWithin(0, $.length, $.length + 1)', doesNotThrow(() => obj.copyWithin(0, obj.length, obj.length + 1))])
    if (len > 0) {
        ret.push(['.copyWithin(0, -1)', doesThrow(() => obj.copyWithin(0, -1))])
    }
    if (len > 1) {
        ret.push(['.copyWithin(1)', doesThrow(() => obj.copyWithin(1))])
    }
    if (len > 0) {
        ret.push([`.fill(1) throws`,  doesThrow(() => obj.fill(1))]);
    } else {
        ret.push([`.fill(1) does not throw`,  doesNotThrow(() => obj.fill(1))]);
    }
    if (len > 1) {
        ret.push([`.reverse() throws`,  doesThrow(() => obj.reverse())]);
    } else {
        ret.push([`.reverse() does not throw`,  doesNotThrow(() => obj.reverse())]);
    }
    ret.push([`.shift() throws`,  doesThrow(() => obj.shift())]);
    if (len > 1) {
        ret.push([`.sort((x, y) => y - x) throws`,  doesThrow(() => obj.sort((x, y) => y - x))]);
    } else {
        ret.push([`.sort((x, y) => y - x) does not throw`,  doesNotThrow(() => obj.sort((x, y) => y - x))]);
    }
    if (len > 1) {
        ret.push([`.sort((x, y) => x - y) throws`,  doesThrow(() => obj.sort((x, y) => x - y))]);
    } else {
        ret.push([`.sort((x, y) => x - y) does not throw`,  doesNotThrow(() => obj.sort((x, y) => x - y))]);
    }
    ret.push([`.splice(0, 0) throws`,  doesThrow(() => obj.splice(0, 0))]);
    ret.push([`.splice(0, 0, 1) throws`,  doesThrow(() => obj.splice(0, 0, 1))]);
    ret.push([`.unshift(1) throws`,  doesThrow(() => obj.unshift(1))]);
    ret.push([`.length const`,  obj.length == len]);
    ret.push(['.at(0) works', Object.is(obj.at(0), obj[0])]);
    ret.push(['.at($.length) works', Object.is(obj.at(obj.length), obj[obj.length])]);
    ret.push(['.at(-1) works', Object.is(obj.at(-1), obj[obj.length-1])]);
    ret.push([`[0] does not throw`,  doesNotThrow(() => obj[0])]);
    ret.push([`[${obj.length}] does not throw`,  doesNotThrow(() => obj[obj.length])]);
    return ret;
};

const runOnce = (func) => {
    return [
        ["()", isImmutable(func())],
        ["(1)", isImmutable(func(1))],
        ["(1, 2)", isImmutable(func(1, 2))],
        ["(0, 0, 0)", isImmutable(func(0, 0, 0))],
        ["(1, 2, 1)", isImmutable(func(1, 2, 3, 4))],
    ];
};

const check = (path, obj) => {
    if (Array.isArray(obj)) {
        for (const prop of obj) {
            check(`${path}${prop[0]}`, prop[1]);
        }
    } else {
        if (!obj) {
            console.log(`false: ${path}`);
        }
    }
}

export const validate = (...funcs) => {
    for (const func of funcs) {
        check(`${func.name}`, runOnce(func))
    }
}
