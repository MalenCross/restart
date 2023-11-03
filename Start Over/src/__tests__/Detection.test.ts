import { DetectStraightFlush, HandType, DetectHighCard, DetectStraight, DetectTwoPair, DetectFullHouse, DetectFlush, DetectFourOfAKind, DetectThreeOfAKind, DetectPair, DetectHand } from "../Detection.ts";;
import { Hand, Suit, GetHand } from "../PokerParsing.ts";;


test('detect high card', () => {
    expect(DetectHighCard(GetHand('2H 3S 4C 5S 6D') as Hand)).toEqual([6, 5, 4, 3, 2]);
    expect(DetectHighCard(GetHand('TH JC KS QH AS') as Hand)).toEqual([14, 13, 12, 11, 10]);
    expect(DetectHighCard(GetHand('AH 1H 3D 4H 5H') as Hand)).toEqual([]);
    expect(DetectHighCard(GetHand('6H 6S 9H 9S 9C') as Hand)).toEqual([9, 9, 9, 6, 6]);
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
    expect(DetectStraight(GetHand('6H 6S 9H 9S 9C') as Hand)).toBe(false);
})

test('detect flush', () => {
    expect(DetectFlush(GetHand('2H 8S 9C AS 7D') as Hand)).toBe(false);
    expect(DetectFlush(GetHand('6H 8H 9H 3H 2H') as Hand)).toBe(true);
    expect(DetectFlush(GetHand('6H zH 9H 3H 2H') as Hand)).toBe(false);
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


const FiveClubs = { face: 5, suit: Suit.Clubs };
const FiveSpades = { face: 5, suit: Suit.Spades };
const FiveDiamonds = { face: 5, suit: Suit.Diamonds };
const SevenClubs = { face: 7, suit: Suit.Clubs };
const TwoClubs = { face: 2, suit: Suit.Clubs };
const ThreeOfAKind_Hand = [
    FiveClubs,
    FiveSpades,
    FiveDiamonds,
    SevenClubs,
    TwoClubs];

test('detect hand', () => {
    expect(DetectHand(GetHand('2H 8S 9C AS 7D') as Hand)).toBe(HandType.HighCard);
    expect(DetectHand(GetHand('8H 8S 9C AS 7D') as Hand)).toBe(HandType.Pair);
    expect(DetectHand(GetHand('8H 8S 8C AS 2D') as Hand)).toBe(HandType.ThreeOfAKind);
    expect(DetectHand(ThreeOfAKind_Hand)).toBe(HandType.ThreeOfAKind);
    // expect(DetectHand(GetHand('8H 8S AC AS 7D') as Hand)).toBe(HandType.TwoPair);
    //...
})
