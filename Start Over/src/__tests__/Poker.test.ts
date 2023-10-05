
import {DetectStraightFlush, DetectHighCard, DetectStraight, DetectTwoPair, DetectFullHouse, DetectFlush, DetectFourOfAKind, DetectThreeOfAKind, Hand, DetectPair, Suit, Card, GetFace, GetSuit, GetCard, GetHand, ParseError } from "../Poker.ts";;


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

    expect(GetHand('XH TS 9C AS 7D')).toBe(ParseError.InvalidFace)

    expect(GetHand('2H TS 9C AP 7D')).toBe(ParseError.InvalidSuit)

    expect(GetHand('2H TS 9C LP 7D')).toBe(ParseError.InvalidCard)
    expect(GetHand('2 TS')).toBe(ParseError.InvalidCard)
})

test('detect high card', () => {
    expect(DetectHighCard('2H 3S 4C 5S 6D')).toEqual([6,5,4,3,2]);
    expect(DetectHighCard('TH JC KS QH AS')).toEqual([14,13,12,11,10]);
    expect(DetectHighCard('AH 1H 3D 4H 5H')).toEqual([]);
    expect(DetectHighCard('6H 6S 9H 9S 9C')).toEqual([9,9,9,6,6]);
})

// test('count the faces), () => {
// }

// test('detect of kind), () => {
// }


test('detect pair', () => {
    expect(DetectPair(GetHand('2H 8S 9C AS 7D') as Hand)).toBe(false);
    expect(DetectPair(GetHand('2H 2S 9C AS 7D') as Hand)).toBe(true);
    expect(DetectPair(GetHand('7H 7S 9C AS 7D') as Hand)).toBe(false);
})

test('detect two pair', () => {
    expect(DetectTwoPair('2H 8S 9C AS 7D')).toBe(false);
    expect(DetectTwoPair('6H 6C 2S 3H 3S')).toBe(true);
    expect(DetectTwoPair('6H zH 9H 3H 2H')).toBe(false);
    expect(DetectTwoPair('6H 6S 9H 9S 9C')).toBe(false);
})

test('detect three of a kind', () => {
    expect(DetectThreeOfAKind(GetHand('2H 8S 9C AS 7D') as Hand)).toBe(false);
    expect(DetectThreeOfAKind(GetHand('2H 8S 9C 8S 8D') as Hand)).toBe(true);
})

test('detect straight', () => {
    expect(DetectStraight('2H 3S 4C 5S 6D')).toBe(true);
    expect(DetectStraight('TH JC KS QH AS')).toBe(true);
    expect(DetectStraight('AH 2H 3D 4H 5H')).toBe(true);
    expect(DetectStraight('6H 6S 9H 9S 9C')).toBe(false);
})

test('detect flush', () => {
    expect(DetectFlush('2H 8S 9C AS 7D')).toBe(false);
    expect(DetectFlush('6H 8H 9H 3H 2H')).toBe(true);
    expect(DetectFlush('6H zH 9H 3H 2H')).toBe(false);
})

test('detect full house', () => {
    expect(DetectFullHouse('2H 8S 9C AS 7D')).toBe(false);
    expect(DetectFullHouse('6H 6C 6S 3H 3S')).toBe(true);
    expect(DetectFullHouse('6H zH 9H 3H 2H')).toBe(false);
})

test('detect four of a kind', () => {
    expect(DetectFourOfAKind(GetHand('2H 8S 9C AS 7D') as Hand)).toBe(false);
    expect(DetectFourOfAKind(GetHand('8H 8S 9C 8S 8D') as Hand)).toBe(true);
})

test('detect straight flush', () => {
    expect(DetectStraightFlush('2H 3S 4C 5S 6D')).toBe(false);
    expect(DetectStraightFlush('TH JH KH QH AH')).toBe(true);
    expect(DetectStraightFlush('7H 2H 3H 4H 5H')).toBe(false);
    expect(DetectStraightFlush('2S 4S 3S AS 5S')).toBe(true);
})













// // straight