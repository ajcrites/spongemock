const isString = require("lodash.isstring");
const random = require("lodash.random");

const isLetterRegExp = new RegExp("^[a-zA-Z]$");
const upper = Symbol("upper");
const lower = Symbol("lower");

exports.spongeMock = str => {
    if (!isString(str)) {
        return str;
    }

    let emit = "";
    let prevLetter;
    let prev2Letter;
    for (let ctr = 0; ctr < str.length; ctr++) {
        if (isLetter(str[ctr])) {
            prev2Letter = prevLetter;
            prevLetter = decideCase(str[ctr], prevLetter, prev2Letter);
            emit += prevLetter;
        }
        else {
            emit += str[ctr];
        }
    }

    return emit;
}


function decideCase(curr, prev, prev2) {
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

function isLetter(char) {
    return isLetterRegExp.test(char);
}

function getCase(char) {
    return char === char.toUpperCase() ? upper : lower;
}

exports.decideCase = decideCase;
exports.isLetter = isLetter;
exports.getCase = getCase;

exports.upper = upper;
exports.lower = lower;

exports.sPoNgEmOCk = exports.spongeMock;
