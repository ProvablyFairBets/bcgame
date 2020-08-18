
const crypto = require('crypto');

export const handleLimbo = function (data) {
    // create HMAC using server hash as key and client hash as message
    let hash = crypto.createHash('sha256').update(data).digest('hex');
    console.log('result hash', hash);

    const nBits = 52;
    hash = hash.slice(0, nBits / 4);
    const r = parseInt(hash, 16);
    let X = r / Math.pow(2, nBits);
    X = 99 / (1 - X);
    const result = Math.floor(X);
    return hash ? Math.max(1, result / 100) : '';
}


