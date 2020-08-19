const CryptoJS = require("crypto-js");

let payout = [
    { segment: 10, risk: 'Low', payouts: [1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0] },
    { segment: 20, risk: 'Low', payouts: [1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0, 1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0] },
    { segment: 30, risk: 'Low', payouts: [1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0, 1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0, 1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0] },
    { segment: 40, risk: 'Low', payouts: [1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0, 1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0, 1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0, 1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0] },
    { segment: 50, risk: 'Low', payouts: [1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0, 1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0, 1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0, 1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0, 1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0] },
    { segment: 10, risk: 'Medium', payouts: [0, 1.9, 0, 1.5, 0, 2, 0, 1.5, 0, 3] },
    { segment: 20, risk: 'Medium', payouts: [1.5, 0, 2, 0, 2, 0, 2, 0, 1.5, 0, 3, 0, 1.8, 0, 2, 0, 2, 0, 2, 0] },
    { segment: 30, risk: 'Medium', payouts: [1.5, 0, 1.5, 0, 2, 0, 1.5, 0, 2, 0, 2, 0, 1.5, 0, 3, 0, 1.5, 0, 2, 0, 2, 0, 1.7, 0, 4, 0, 1.5, 0, 2, 0] },
    { segment: 40, risk: 'Medium', payouts: [2, 0, 3, 0, 2, 0, 1.5, 0, 3, 0, 1.5, 0, 1.5, 0, 2, 0, 1.5, 0, 3, 0, 1.5, 0, 2, 0, 2, 0, 1.6, 0, 2, 0, 1.5, 0, 3, 0, 1.5, 0, 2, 0, 1.5, 0] },
    { segment: 50, risk: 'Medium', payouts: [2, 0, 1.5, 0, 2, 0, 1.5, 0, 3, 0, 1.5, 0, 1.5, 0, 2, 0, 1.5, 0, 3, 0, 1.5, 0, 2, 0, 1.5, 0, 2, 0, 2, 0, 1.5, 0, 3, 0, 1.5, 0, 2, 0, 1.5, 0, 1.5, 0, 5, 0, 1.5, 0, 2, 0, 1.5, 0] },
    { segment: 10, risk: 'High', payouts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 9.9] },
    { segment: 20, risk: 'High', payouts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19.8] },
    { segment: 30, risk: 'High', payouts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 29.7] },
    { segment: 40, risk: 'High', payouts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 39.6] },
    { segment: 50, risk: 'High', payouts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 49.5] }
]

let result_hash_list;

function final_result(risk, segments) {
    return payout.find(item => {
        return (item.segment === Number(segments) && item.risk === risk)
    }).payouts
}
function results(result_hash_list) {
    let res = {
        dec: [],
        hex: []
    }
    for (let i = 0; i < result_hash_list.length; i += 2) {
        let dext = result_hash_list[i] + result_hash_list[i + 1]
        let hext = parseInt(dext, 16)
        res.dec.push(dext)
        res.hex.push(hext)
    }
    return res
}

function numResult(result_hash_list) {
    let num = 0
    let list = results(result_hash_list).hex
    for (let i = 0; i < 4; i++) {
        num += list[i] / Math.pow(256, (i + 1))
    }
    return num.toFixed(9)
}

function sha256(value) {
    return CryptoJS.SHA256(CryptoJS.enc.Utf8.parse(value));
}

export function handleWheel(server_seed, client_seed, nonce, risk, segments) {

    result_hash_list = sha256(server_seed + client_seed + nonce).toString()

    return final_result(risk, segments)[parseInt(numResult(result_hash_list) * 50)];
}
