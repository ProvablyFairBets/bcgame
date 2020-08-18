// crypto lib for hash function
const crypto = require('crypto');

let flower_list = ["spades", "hearts", "clubs", "diamonds"],
    cards = " ,ace,2,3,4,5,6,7,8,9,10,jack,queen,king".split(","),
    allCards = [161, 180, 199, 218, 162, 205, 181, 200, 219, 163, 182, 220, 201, 177, 196, 215, 170, 178, 221, 197, 216, 171, 179, 198, 172, 217, 193, 212, 167, 186, 194, 173, 213, 168, 187, 195, 214, 188, 169, 209, 164, 183, 202, 210, 189, 165, 184, 203, 211, 166, 204, 185]

function sha512(data) {
    return crypto.createHash('sha512').update(data).digest('hex');
};

function createCards(hash, times, cards, hashList) {
    hashList.push(hash);
    if (times <= 0) return
    let h = hash;
    allCards.forEach((c) => {
        cards.push({ card: c, hash: h });
        h = h.substring(1) + h.charAt(0);
    });

    hash = String(sha512(hash));
    times--;
    createCards(hash, times, cards, hashList);
};
function init(hash, times) {
    times = times || 1;
    let cards = [];
    let hashList = [];
    createCards(hash, times, cards, hashList);
    cards.sort(function (o1, o2) {
        if (o1.hash < o2.hash) {
            return -1;
        } else if (o1.hash == o2.hash) {
            return 0;
        } else {
            return 1;
        }
    })
    return cards;
}

function cardPoint(card) {
    let point = cards[card % 16];
    return point
};

function cardFlower(card) {
    let flowerIndex = (card & 240) / 16 - 10;
    let flower = flower_list[flowerIndex];
    return flower
};

export function handleVideoPoker(data) {
    let result_hash = sha512(data);
    let card = init(result_hash);
    console.log(card.length);
    let selectedCard = [];
    for (let i = 0; i < 52; i++)
        selectedCard.push(cardPoint(card[i].card) + '_of_' + cardFlower(card[i].card))
    console.log(selectedCard);
    return selectedCard;
}


