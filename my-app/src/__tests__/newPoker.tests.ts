import { GetFace,GetSuit,ParseError, Suit } from "../newPoker"

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