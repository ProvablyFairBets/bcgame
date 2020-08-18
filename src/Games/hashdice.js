// crypto lib for hash function
const crypto = require('crypto');

export function getRoll(data) {

    // create hash using server seed as key and client seed as message
    const hash = crypto.createHash('sha512').update(data).digest('hex');
    console.log('result hash', hash);

    var index = 0;

    do {

        var lucky = parseInt(hash.substr(index, 5), 16);

        index += 5;

    } while (lucky >= 1000000);

    return lucky % 100000;

}
