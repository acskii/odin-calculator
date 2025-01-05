export const OPERATORS = [
    '+',
    '-',
    '/',
    '*',
    '%'
];

export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

export function multiply(a, b) {
    return a * b;
}

export function divide(a, b) {
    if (b != 0) {
        return a / b;
    }
    return NaN;
}

export function modulo(a, b) {
    return a % b;
}