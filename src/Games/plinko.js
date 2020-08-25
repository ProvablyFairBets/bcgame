// crypto lib for hash function
const crypto = require('crypto');
const payout = [
  { rows:8, risk:'Low', payouts: [5.6, 2.1, 1.1, 1.0, 0.5, 1.0, 1.1, 2.1, 5.6] },
  { rows:8, risk:'Medium', payouts: [13, 3.0, 1.3, 0.7, 0.4, 0.7, 1.3, 3.0, 13] },
  { rows:8, risk:'High', payouts: [29, 4, 1.5, 0.3, 0.2, 0.3, 1.5, 4, 29] },
  { rows:9, risk:'Low', payouts: [5.6, 2.0, 1.6, 1.0, 0.7, 0.7, 1.0, 1.6, 2.0, 5.6] },
  { rows:9, risk:'Medium', payouts: [18, 4.0, 1.7, 0.9, 0.5, 0.5, 0.9, 1.7, 4.0, 18] },
  { rows:9, risk:'High', payouts: [43, 7.0, 2.0, 0.6, 0.2, 0.2, 0.6, 2.0, 7.0, 43] },
];

export function final_payout(risk, rows) {
    return payout.find(item => {
        return (item.rows === Number(rows) && item.risk === risk)
    }).payouts
}

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

export function handlePlinko(server_seed, client_seed, nonce, rows, risk) {
    let nums = [];
    let payoutIndex = final_payout(risk, rows).length;
    bytes_to_num_array(bytes(`${server_seed}${client_seed}${nonce}`)).map((value, index) => {
        let direction = Math.floor(value * 2) ? payoutIndex++ : payoutIndex--;
        return nums.push(direction);
    })
    return Math.floor(nums[rows]/2);
}
