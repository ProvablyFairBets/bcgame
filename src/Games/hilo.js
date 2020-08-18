// crypto lib for hash function
const crypto = require('crypto');

function bytes(data) {
    let result = '';
    result = crypto.createHash('sha256').update(data).digest('hex');
    console.log('result hash', result);
    return result;
};

function bytes_to_num_array(bytes) {
    let totals = [];
    for (let i = 0; i * 8 < bytes.length; i++) {
        totals.push(bytes_to_number(bytes.substr(i * 8), 8) * 52);
        console.log(bytes_to_number(bytes.substr(i * 8), 8) * 52);
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

function nums_to_card_array(nums) {
    const cards = ['ace_of_spades', '4_of_hearts', '7_of_clubs', '10_of_diamonds',
        '2_of_spades', 'king_of_clubs', '5_of_hearts', '8_of_clubs',
        'jack_of_diamonds', '3_of_spades', '6_of_hearts', 'queen_of_diamonds',
        '9_of_clubs', 'ace_of_hearts', '4_of_clubs', '7_of_diamonds',
        '10_of_spades', '2_of_hearts', 'king_of_diamonds', '5_of_clubs',
        '8_of_diamonds', 'jack_of_spades', '3_of_hearts', '6_of_clubs',
        'queen_of_spades', '9_of_diamonds', 'ace_of_clubs', '4_of_diamonds',
        '7_of_spades', '10_of_hearts', '2_of_clubs', 'king_of_spades', '5_of_diamonds',
        '8_of_spades', 'jack_of_hearts', '3_of_clubs', '6_of_diamonds', 'queen_of_hearts',
        '9_of_spades', 'ace_of_diamonds', '4_of_spades', '7_of_hearts', '10_of_clubs',
        '2_of_diamonds', 'king_of_hearts', '5_of_spades', '8_of_hearts', 'jack_of_clubs',
        '3_of_diamonds', '6_of_spades', 'queen_of_clubs', '9_of_hearts',


    ];
    nums = nums.map((num) => {
        return cards[Math.floor(num)];
    });
    return nums;
};

export function handleHilo(server_seed, client_seed, nonce, round) {

    let totalNums = [];
    for (let round = 0; round < 24; round++) {
        let nums = [];
        for (const [index, value] of bytes_to_num_array(bytes(`${server_seed}:${client_seed}:${nonce}:${round}`)).entries()) {
            nums.push(value);
        }
        totalNums.push(nums[0]);
    }

    totalNums = nums_to_card_array(totalNums);
    console.log("Hilo : ", totalNums);

    return totalNums;
}


