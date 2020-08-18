
const CryptoJS = require("crypto-js");

const salt = '00000000000000000005bcf4bcfe3a699dd7833839e593127885e2b1e80ceb10';
const getValue = (str) => {
    let v = parseInt(str, 16);
    if (v >= 3700) {
        return -1;
    }
    return Math.floor(v / 100);
}
const gameResult = (seed, salt) => {
    if (salt) {
        const hmac = CryptoJS.HmacSHA256(CryptoJS.enc.Hex.parse(seed), salt);
        seed = hmac.toString(CryptoJS.enc.Hex);
    }
    let beginIndex = 0;
    let value = -1;

    while (value < 0 && beginIndex < 63) {
        value = getValue(seed.substring(beginIndex, beginIndex + 3));
        beginIndex += 3;
    }
    if (value === -1) {
        value = parseInt(seed.charAt(63), 16);
    }

    return value;
};

export function handleRoulette(seed) {
    return gameResult(seed, salt);
}
