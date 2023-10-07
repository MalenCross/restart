import { Suit, Card, GetFace, GetSuit, GetCard, GetHand, ParseError } from "../PokerParsing.ts";

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

