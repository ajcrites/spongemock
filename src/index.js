import isString from "lodash.isstring";
import random from "lodash.random";

const isLetterRegExp = new RegExp("^[a-zA-Z]$");
export const upper = Symbol("upper");
export const lower = Symbol("lower");

export const spongeMock = str => {
    if (!isString(str)) {
        return str;
    }

    let emit = "";
    let prevLetter;
    let prev2Letter;
    let ansiCheck = false;
    let isAnsi = false;
    for (let ctr = 0; ctr < str.length; ctr++) {
        if (isLetter(str[ctr])) {
            prev2Letter = prevLetter;
            // Do not capitalize the 'm' in ANSI escape sequences
            if (isAnsi && 'm' === str[ctr]) {
                prevLetter = str[ctr];
                isAnsi = false;
                ansiCheck = false;
            }
            else {
                prevLetter = decideCase(str[ctr], prevLetter, prev2Letter);
            }
            emit += prevLetter;
        }
        else {
            if (ansiCheck) {
                if (/\d/.test(str[ctr])) {
                    isAnsi = true;
                }
                else {
                    ansiCheck = false;
                }
            }
            // This may be part of an ANSI escape sequence. Check that all
            // following characters are numbers
            if ('[' === str[ctr]) {
                ansiCheck = true;
            }

            emit += str[ctr];
        }
    }

    return emit;
}

export function decideCase(curr, prev, prev2) {
    const odds = random(0, 99);

    const currCase = getCase(curr);
    const swapCaseFn = currCase === upper ? "toLowerCase": "toUpperCase";

    // This is the first character, so we swap it 50% of the time.
    if (!prev && !prev2) {
        if (odds > 50) {
            return curr[swapCaseFn]();
        }
        else {
            return curr;
        }
    }

    // Previous character does not match case, so there is a 15% chance to
    // swap and match case. Prev2 does not impact this.
    if (getCase(prev) !== currCase) {
        if (odds >= 85) {
            return curr[swapCaseFn]();
        }
    }
    // Else, there is a 85% chance to swap if prev2 does not match case
    else if (!prev2 || getCase(prev2) !== currCase) {
        if (odds < 85) {
            return curr[swapCaseFn]();
        }
        else {
            return curr;
        }
    }
    // Prev2 *also* matches case, so there is a 98% chance to swap
    else if (odds < 98) {
        return curr[swapCaseFn]();
    }

    return curr;
}

export function isLetter(char) {
    return isLetterRegExp.test(char);
}

export function getCase(char) {
    return char === char.toUpperCase() ? upper : lower;
}

export const sPoNgEmOCk = spongeMock;
