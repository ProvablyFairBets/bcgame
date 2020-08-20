// crypto lib for hash function
const crypto = require('crypto');

function bytes(data) {
    let result = '';
    result = crypto.createHash('sha512').update(data).digest('hex');
    console.log('result hash', result);
    return result;
};

function bytes_to_num_array(bytes) {
    let totals = [];
    for (let i = 0; i * 8 < bytes.length; i++) {
        totals.push(bytes_to_number(bytes.substr(i * 8), 8));
    }
    return totals;
};

/**
 * Returns a number in the range [0, 1)
 * @param {string} bytes - The 8 character (4 byte) hex string to convert to a number
 * @returns {number} A number in the range [0, 1)
 */
function bytes_to_number(bytes) {
    let total = 0;
    for (let i = 0; i < 4; i++) {
        total += parseInt(bytes.substr(i * 2, 2), 16) / Math.pow(256, i + 1);
    }
    return total;
};

export function handlePlinko(server_seed, client_seed, nonce) {
    let nums = [];

    bytes_to_num_array(bytes(`${server_seed}${client_seed}${nonce}`)).map((value, index) => {
        let direction = Math.floor(value * 2) ? 'right' : 'left';
        return nums.push(direction + ', ');
    })
    console.log("Plinko -- ", nums);
    return nums;
}


