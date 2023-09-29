import {Card, GetFace, GetSuit, GetCard} from "../Poker.ts";;


test('Get face value a playing card', () => {
    expect (GetFace('TH')).toBe(10)
    expect (GetFace('JH')).toBe(11)
    expect (GetFace('QH')).toBe(12)
    expect (GetFace('KH')).toBe(13)
    expect (GetFace('AH')).toBe(14)
    expect (GetFace('2H')).toBe(2)
    expect (GetFace('3H')).toBe(3)
    expect (GetFace('4H')).toBe(4)
    expect (GetFace('5H')).toBe(5)
    expect (GetFace('6H')).toBe(6)
    expect (GetFace('7H')).toBe(7)
    expect (GetFace('9H')).toBe(9)
    expect (GetFace('PH')).toBe('not a valid face value')
})


test('get the suit from a playing card', () => {
    expect(GetSuit('AS')).toBe('Spades')
    expect(GetSuit('8H')).toBe('Hearts')
    expect(GetSuit('2D')).toBe('Diamonds')
    expect(GetSuit('TC')).toBe('Clubs')
    expect(GetSuit('KP')).toBe('not a valid suit')
})

test('get the card from a poker card string', () => {

    let cardA : Card = GetCard('2H')
    expect (cardA.face).toBe(2)
    expect (cardA.suit).toBe('Hearts')

    let cardB : Card = GetCard('7C')
    expect (cardB.face).toBe(7)
    expect (cardB.suit).toBe('Clubs')

    let card1 : Card = GetCard('KH')
    expect (card1.face).toBe(13)
    expect (card1.suit).toBe('Hearts')

    let card2 : Card = GetCard('AS')
    expect (card2.face).toBe(14)
    expect (card2.suit).toBe('Spades')

})