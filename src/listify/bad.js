
export class ListMutationTypeError extends TypeError {}

export const bad = {
    push: () => {
        throw new ListMutationTypeError(`type List has no .push(...), hint: for a copy with the elements appended, use .concat([...])`);
    },
    unshift: () => {
        throw new ListMutationTypeError(`type List has no .unshift(...), hint: for a copy with the elements prepended, use [...].concat(<the list>)`);
    },
    pop: () => {
        throw new ListMutationTypeError('type List has no .pop(), hint: for a copy without the last element, use .slice(0, -1)');
    },
    shift: () => {
        throw new ListMutationTypeError('type List has no .shift(), hint: for a copy without the first element, use .slice(1)');
    },
};
