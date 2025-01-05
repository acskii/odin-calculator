import { OPERATORS } from './calc.js';
import * as process from './process.js';

// Helps differentiate btwn number and operator
let ram = [];

function getOperator(event) {
    const dataValue = event.target.getAttribute('data-op');
    const intValue = parseInt(dataValue);
    return (intValue ? intValue : dataValue);
}

function pushMem(a) {
    // If a is a number
    // Memory must be either empty, after a floating point, after an operator or a number
    const lastEntry = ram.at(-1);
    if (Number.isInteger(a)) {
        if (
            OPERATORS.includes(lastEntry) ||
            ram.length == 0
        ) {
            ram.push(a);    // Add to memory
        } else if (lastEntry == 0 || typeof(lastEntry) == 'number') {
            ram.pop();
            ram.push(parseFloat(`${lastEntry}${a}`));
        } else if (lastEntry == '.') {
            const lastNumber = ram.at(-2);
            ram.splice(-2, 2);
            ram.push(parseFloat(`${lastNumber}.${a}`));
        }
    }
    else if (OPERATORS.includes(a)) {
        // if a is an operator
        // Memory must be after a number ONLY

        if (lastEntry == 0 || typeof(lastEntry) == 'number') ram.push(a)
    } else if (a == '.') {
        // if a is a floating point
        // after a number ONLY
        if (Number.isInteger(lastEntry)) {
            ram.push(a);
        }
    }
}

function resetMem() {
    ram.length = 0;       // Clear original memory array
}

function appendOnto(a, b) {
    if (typeof(a) == 'string' && typeof(b) == 'string') {
        if (b != '.') {
            return `${a}${b}`;
        } else {
            return (a.match(/[0-9]+\.[0-9]+/)) ? a : `${a}.`;
        }
    }
    return null;    
}

function writeDisplay(msg) {
    const currentDisplayText = document.querySelector('.display .current span');
    currentDisplayText.textContent = msg;
}


function updateDisplay() {
    let msg = ''
    for (const c of ram) {
        if (Number.isInteger(c) || c == '.') {
            // Numbers are concatenated together
            // .. with floating points
            msg += `${c}`;
        } else {
            // Operators are spaced between numbers
            msg += ` ${c} `;
        }
    }

    writeDisplay(msg);
}

function updateHistory(msg, mode=0) {
    const currentDisplayText = document.querySelector('.display .history span');
    if (mode) {
        currentDisplayText.textContent += '\n' + msg;
    } else {
        currentDisplayText.textContent = msg;
    }
}

function clearMem() {
    resetMem();
    writeDisplay('');
}

function backspaceMem() {
    const lastEntry = ram.at(-1);

    if (OPERATORS.includes(lastEntry) || lastEntry == '.') {
        ram.pop()
    } else if (Number.isInteger(lastEntry)) {
        // Normal integer
        ram.pop();
        if (lastEntry >= 10) {
            ram.push(parseInt(`${lastEntry}`.slice(0,-1)));
        }
    } else {
        // Float
        const modified = `${lastEntry}`.slice(0,-1);
        if (modified.at(-1) == '.') {
            ram.pop();
            ram.push(parseInt(modified.slice(0,-1)), '.');
        } else {
            ram.pop();
            ram.push(parseFloat(modified));
        }
    }
    updateDisplay();
}

function operate(array) {
    console.log("Starting calculation process...");
    console.log("MEM: ", array);
    const resultArray = process.processModulo(
        process.processSubtractAdd(
        process.processDivideMultiply(array)
    ));
    resetMem();
    ram = resultArray.slice(0);
    updateDisplay();
}

function registerInput(btn) {
    const operator = getOperator(btn);

    if (Number.isInteger(operator)) {
        pushMem(operator);
    } else {
        if (operator == 'C') {
            clearMem();
        } else if (operator == '-b') {
            // Delete last entered 
            backspaceMem();
        } else if (operator == '=') {
            operate(ram);
        } else if (operator == 'z') {
            pushMem(0);
        } else {
            pushMem(operator);
        }
    }
    updateDisplay();
}

const inputButtons = document.querySelectorAll('.input .btn');

inputButtons.forEach((btn) => btn.addEventListener('click', registerInput));