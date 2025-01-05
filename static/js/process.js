import * as calc from "./calc.js";
import { OPERATORS } from "./calc.js";

function startProcess(array, lookup, func) {
    let processedArray = array.slice(0);
    let group = false;

    while (true) {
        let found = false;
        processedArray.forEach(element => {
            if (OPERATORS.includes(element)) {
                const operatorIndex = processedArray.indexOf(element);
                if (element == lookup) {
                    found = true;
                    if (!group) {
                        group = true;
                        console.group(`proccess[${lookup}]`);
                    }
                    const result = func(
                        processedArray.at(operatorIndex-1),
                        processedArray.at(operatorIndex+1)
                    );
                    if (result) {
                        processedArray.splice(operatorIndex-1, 3, result); 
                        console.log(processedArray);
                    } else {
                        console.warn("error occured when calculating..");
                        processedArray = [];
                        found = false;
                    }
                }
            }
        });
        if (!found) {
            if (group) console.groupEnd(`proc-${lookup}`);
            break;
        }
    }
    return processedArray;
}

export function processDivideMultiply(array) {
    // Takes an array populated with numbers and string operators
    // extracts the divide and multiply operators
    // processes them and places them back in the array
    // returns: array void of '/' and '*'
    let processedArray = array.slice(0);     // New array copy

    processedArray = startProcess(
        startProcess(processedArray, '/', calc.divide),
        '*', 
        calc.multiply
    );

    return processedArray;
}

export function processSubtractAdd(array) {
    // Takes an array populated with numbers and string operators
    // extracts the add and subtract operators
    // processes them and places them back in the array
    // returns: array void of '-' and '+'
    let processedArray = array.slice(0);     // New array copy

    processedArray = startProcess(
        startProcess(processedArray, '+', calc.add),
        '-', 
        calc.subtract
    );

    return processedArray;
}

export function processModulo(array) {
    // Takes an array populated with numbers and string operators
    // extracts the divide and multiply operators
    // processes them and places them back in the array
    // returns: array void of '/' and '*'
    let processedArray = array.slice(0);     // New array copy

    processedArray = startProcess(processedArray, '%', calc.modulo);

    return processedArray;
}