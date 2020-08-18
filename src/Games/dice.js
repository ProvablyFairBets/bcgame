// crypto lib for hash function
const crypto = require('crypto');

export function roll(data) {
    // create hash using server seed as key and client seed as message
    const hash = crypto.createHash('sha256').update(data).digest('hex');
    console.log('result hash', hash);


    let index = 0;
    let lucky = '';
    let compute = 0;
    while (index < 4) {
        lucky = parseInt(hash.substring(index * 2, index * 2 + 2), 16);
        lucky = lucky / (Math.pow(256, index + 1));
        compute = compute + lucky;
        index++;
    }

    compute = compute * 10001 / 100;
    compute = compute.toString();
    compute = compute.split('.');
    compute[1] = compute[1].slice(0, 2);
    compute = compute[0] + '.' + compute[1];
    return compute;
};
