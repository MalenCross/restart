import { Card, CountFace, DetectFlush, DetectFourOfAKind, DetectFullHouse, DetectHand, DetectHighCard, DetectOfAKind, DetectPair, DetectStraight, DetectStraightFlush, DetectThreeOfAKind, DetectTwoPair, GetCard, GetFace,GetHand,GetSuit,Hand,HandType,JudgeWinner,ParseError, PlayGame, PrintWinner, Suit } from "../newPoker"

test('Get face value a playing card', () => {
    expect(GetFace('TH')).toBe(10)
    expect(GetFace('JH')).toBe(11)
    expect(GetFace('QH')).toBe(12)
    expect(GetFace('KH')).toBe(13)
    expect(GetFace('AH')).toBe(14)
    expect(GetFace('2H')).toBe(2)
    expect(GetFace('3H')).toBe(3)
    expect(GetFace('4H')).toBe(4)
    expect(GetFace('5H')).toBe(5)
    expect(GetFace('6H')).toBe(6)
    expect(GetFace('7H')).toBe(7)
    expect(GetFace('9H')).toBe(9)
    expect(GetFace('PH')).toBe(ParseError.InvalidFace)
})

test('get the suit from a playing card', () => {
    expect(GetSuit('AS')).toBe(Suit.Spades)
    expect(GetSuit('8H')).toBe(Suit.Hearts)
    expect(GetSuit('2D')).toBe(Suit.Diamonds)
    expect(GetSuit('TC')).toBe(Suit.Clubs)
    expect(GetSuit('KP')).toBe(ParseError.InvalidSuit)
})

test('get the card from a poker card string', () => {

    let cardA: Card | string = GetCard('2H')
    if (typeof cardA === 'object' && cardA !== null) {
        expect(cardA.face).toBe(2)
        expect(cardA.suit).toBe(Suit.Hearts)
    }
    let cardB: Card | string = GetCard('7C')
    if (typeof cardB === 'object' && cardB !== null) {
        expect(cardB.face).toBe(7)
        expect(cardB.suit).toBe(Suit.Clubs)
    }
    let card1: Card | string = GetCard('AH')
    if (typeof card1 === 'object' && card1 !== null) {
        expect(card1.face).toBe(14)
        expect(card1.suit).toBe(Suit.Hearts)
    }
    let card2: Card | string = GetCard('RD')
    expect(card2).toBe(ParseError.InvalidFace)

    let card3: Card | string = GetCard('TW')
    expect(card3).toBe(ParseError.InvalidSuit)

    let card4: Card | string = GetCard('WL')
    expect(card4).toBe(ParseError.InvalidCard)

})

test('get the card from a poker card string', () => {
    expect(GetHand('2H TS 9C AS 7D')).toEqual([{
        face: 2,
        suit: 'Hearts'
    }, {
        face: 10,
        suit: 'Spades'
    }, {
        face: 9,
        suit: 'Clubs'
    }, {
        face: 14,
        suit: 'Spades'
    }, {
        face: 7,
        suit: 'Diamonds'
    }
    ])

    expect(GetHand('XH TS 9C AS 7D')).toBe("Not a Valid Face in card XH")
    expect(GetHand('2H TS 9C AP 7D')).toBe("Not a Valid Suit in card AP")
    expect(GetHand('2H TS 9C LP 7D')).toBe("Not a Valid Face and Suit in card LP")
    expect(GetHand('2 TS')).toBe("Not a Valid Suit in card 2")
})

test('count how manny times a face appers', () => {
    expect(CountFace(GetHand('2H 3S 4C 5S 6D') as Hand)).toEqual({"2": 1, "3": 1, "4": 1, "5": 1, "6": 1});
    expect(CountFace(GetHand('TH JC KS QH AS') as Hand)).toEqual({"10": 1, "11": 1, "12": 1, "13": 1, "14": 1});
    expect(CountFace(GetHand('AH 2H 3D 4H 5H') as Hand)).toEqual({"14": 1, "2": 1, "3": 1, "4": 1, "5": 1});
    expect(CountFace(GetHand('6H 6S 9H 9S 9C') as Hand)).toEqual({"6": 2, "9": 3});
})

test('function to setect how many instances of a face card exist', () => {
    expect(DetectOfAKind(2,(GetHand('2H 8S 9C AS 7D') as Hand))).toBe(false);
    expect(DetectOfAKind(2,(GetHand('2H 8S 9C 2S 7D') as Hand))).toBe(true);
    expect(DetectOfAKind(3,(GetHand('5H 8S 9C 5S 5D') as Hand))).toBe(true);
})

test('detect high card', () => {
    expect(DetectHighCard(GetHand('2H 3S 4C 5S 6D') as Hand)).toEqual([6, 5, 4, 3, 2]);
    expect(DetectHighCard(GetHand('TH JC KS QH AS') as Hand)).toEqual([14, 13, 12, 11, 10]);
    expect(DetectHighCard(GetHand('AH 5H 3D 4H 5H') as Hand)).toEqual([14, 5, 5, 4, 3]);
    expect(DetectHighCard(GetHand('6H 5S 9H 9S 9C') as Hand)).toEqual([9, 9, 9, 6, 5]);
})

test('detect pair', () => {
    expect(DetectPair(GetHand('2H 8S 9C AS 7D') as Hand)).toBe(false);
    expect(DetectPair(GetHand('2H 2S 9C AS 7D') as Hand)).toBe(true);
    expect(DetectPair(GetHand('7H 7S 9C AS 7D') as Hand)).toBe(false);
})

test('detect two pair', () => {
    expect(DetectTwoPair(GetHand('2H 8S 9C AS 7D') as Hand)).toBe(false);
    expect(DetectTwoPair(GetHand('6H 6C 2S 3H 3S') as Hand)).toBe(true);
    expect(DetectTwoPair(GetHand('6H zH 9H 3H 2H') as Hand)).toBe(false);
    expect(DetectTwoPair(GetHand('6H 6S 9H 9S 9C') as Hand)).toBe(false);
})

test('detect three of a kind', () => {
    expect(DetectThreeOfAKind(GetHand('2H 8S 9C AS 7D') as Hand)).toBe(false);
    expect(DetectThreeOfAKind(GetHand('2H 8S 9C 8S 8D') as Hand)).toBe(true);
})

test('detect straight', () => {
    expect(DetectStraight(GetHand('2H 3S 4C 5S 6D') as Hand)).toBe(true);
    expect(DetectStraight(GetHand('TH JC KS QH AS') as Hand)).toBe(true);
    expect(DetectStraight(GetHand('AH 2H 3D 4H 5H') as Hand)).toBe(true);
    expect(DetectStraight(GetHand('7H 2S 3H 4S 5C') as Hand)).toBe(false);
})

test('detect flush', () => {
    expect(DetectFlush(GetHand('2H 8S 9C AS 7D') as Hand)).toBe(false);
    expect(DetectFlush(GetHand('6H 8H 9H 3H 2H') as Hand)).toBe(true);
    
})

test('detect full house', () => {
    expect(DetectFullHouse(GetHand('2H 8S 9C AS 7D') as Hand)).toBe(false);
    expect(DetectFullHouse(GetHand('6H 6C 6S 3H 3S') as Hand)).toBe(true);
    expect(DetectFullHouse(GetHand('6H zH 9H 3H 2H') as Hand)).toBe(false);
})

test('detect four of a kind', () => {
    expect(DetectFourOfAKind(GetHand('2H 8S 9C AS 7D') as Hand)).toBe(false);
    expect(DetectFourOfAKind(GetHand('8H 8S 9C 8S 8D') as Hand)).toBe(true);
})

test('detect straight flush', () => {
    expect(DetectStraightFlush(GetHand('2H 3S 4C 5S 6D') as Hand)).toBe(false);
    expect(DetectStraightFlush(GetHand('TH JH KH QH AH') as Hand)).toBe(true);
    expect(DetectStraightFlush(GetHand('7H 2H 3H 4H 5H') as Hand)).toBe(false);
    expect(DetectStraightFlush(GetHand('2S 4S 3S AS 5S') as Hand)).toBe(true);
})

test('detect hand', () => {
    expect(DetectHand(GetHand('2H 8S 9C AS 7D') as Hand)).toBe(HandType.HighCard);
    expect(DetectHand(GetHand('8H 8S 9C AS 7D') as Hand)).toBe(HandType.Pair);
    expect(DetectHand(GetHand('8H 8S 8C AS 2D') as Hand)).toBe(HandType.ThreeOfAKind);
})
test('judging winner', () => {
    expect(JudgeWinner(HandType.Pair, HandType.HighCard)).toBe(1);
    expect(JudgeWinner(HandType.HighCard, HandType.Pair)).toBe(2);
});

test('print winner', () => {
    expect(PrintWinner(1)).toBe("Player 1 Wins");
    expect(PrintWinner(2)).toBe("Player 2 Wins");
});


test('play game', () => {
    expect(PlayGame("2H TS AC AS 7D - 2H TS 9C AD 7D")).toBe("Player 1 Wins");
});