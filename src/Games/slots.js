// crypto lib for hash function
const crypto = require('crypto');

export function handleSlots(serverSeed, clientSeed, nonce) {
    let hash = crypto.createHash('sha512').update(serverSeed + clientSeed + nonce).digest('hex');
    let index = 0;
    let lucky = '';
    do {
        lucky = parseInt(hash.substr(index, 5), 16);
        index += 5;
    } while (lucky >= 1e6);
    return lucky;
}
