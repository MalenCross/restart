import {
  Card,
  DetectFlush,
  DetectFourOfAKind,
  DetectFullHouse,
  DetectHand,
  DetectHighCard,
  DetectPair,
  DetectStraight,
  DetectStraightFlush,
  DetectThreeOfAKind,
  DetectTwoPair,
  Face,
  GetCard,
  GetFace,
  GetHand,
  GetSuit,
  Hand,
  JudgeWinner,
  PlayGame,
  Suit,
} from "../newNewPoker";
import { HandType } from "../newPoker";

// tests for GetFace
it.each([
  ["TH", 10 as Face],
  ["JH", 11],
  ["QH", 12],
  ["KH", 13],
  ["2H", 2],
  ["3H", 3],
  ["4H", 4],
  ["5H", 5],
  ["6H", 6],
  ["7H", 7],
  ["9H", 9],
])("GetFace(%p) expecting (%p)", (input: string, result: number) => {
  expect(GetFace(input)).toBe(result);
});
test("throws error for invalid Face", () => {
  let runGetFaceFn = () => GetFace("rP");
  expect(runGetFaceFn).toThrow("Not a Valid Face");
});

// Tests for GetCard
it.each([
  ["AS", Suit.Spades],
  ["AH", Suit.Hearts],
  ["AD", Suit.Diamonds],
  ["AC", Suit.Clubs],
])("getSuit(%p) expecting (%p)", (input: string, result: Suit) => {
  expect(GetSuit(input)).toBe(result);
});
test("throws error for invalid suit", () => {
  let runGetSuitFn = () => GetSuit("AP");
  expect(runGetSuitFn).toThrow("Invalid suit");
});

// Tests for GetSuit
it.each([
  ["TS", { face: 10 as Face, suit: Suit.Spades }],
  ["JH", { face: 11 as Face, suit: Suit.Hearts }],
  ["QD", { face: 12 as Face, suit: Suit.Diamonds }],
  ["KC", { face: 13 as Face, suit: Suit.Clubs }],
  ["2H", { face: 2 as Face, suit: Suit.Hearts }],
  ["3S", { face: 3 as Face, suit: Suit.Spades }],
  ["4D", { face: 4 as Face, suit: Suit.Diamonds }],
  ["5H", { face: 5 as Face, suit: Suit.Hearts }],
  ["6H", { face: 6 as Face, suit: Suit.Hearts }],
  ["7H", { face: 7 as Face, suit: Suit.Hearts }],
  ["9H", { face: 9 as Face, suit: Suit.Hearts }],
])("GetCard(%p) expecting %p", (input: string, result: Card) => {
  expect(GetCard(input)).toEqual(result);
});

it.each([
  [
    "TS JH QD 2H 4D",
    [
      { face: 10 as Face, suit: Suit.Spades },
      { face: 11 as Face, suit: Suit.Hearts },
      { face: 12 as Face, suit: Suit.Diamonds },
      { face: 2 as Face, suit: Suit.Hearts },
      { face: 4 as Face, suit: Suit.Diamonds },
    ],
  ],
])("GetHand (%p) expecting (%p)", (input: string, result: Hand) => {
  expect(GetHand(input)).toEqual(result);
});

it.each([
  ["TH 3C 9D JS 3C", [11, 10, 9, 3, 3]],
  ["3H 7C QD 5S 2C", [12, 7, 5, 3, 2]],
])("DetectHighCard(%p) expecting (%p)", (input: string, result: number[]) => {
  expect(DetectHighCard(GetHand(input) as Hand)).toStrictEqual(result);
});

it.each([["TH 3C 9D JS 3C", true]])(
  "DetectPair(%p) expecting (%p)",
  (input: string, result: boolean) => {
    expect(DetectPair(GetHand(input) as Hand)).toEqual(result);
  }
);

it.each([["TH 3C 9D 9S 3C", true]])(
  "DetectTwoPair%p) expecting (%p)",
  (input: string, result: boolean) => {
    expect(DetectTwoPair(GetHand(input) as Hand)).toEqual(result);
  }
);

it.each([["TH 9C 9D 9S 3C", true]])(
  "DetectThreeOfAKind(%p) expecting (%p)",
  (input: string, result: boolean) => {
    expect(DetectThreeOfAKind(GetHand(input) as Hand)).toEqual(result);
  }
);

it.each([
  ["2H 3C 5D 4S 6C", true],
  ["5H 2D AS 4C 3D", true],
  ["TH 3C 9D 9S 3C", false],
])("DetectStraight(%p) expecting (%p)", (input: string, result: boolean) => {
  expect(DetectStraight(GetHand(input) as Hand)).toEqual(result);
});

it.each([
  ["2H 3H 5H 4H 6H", true],
  ["5S 2S AS 4S 3S", true],
  ["TH 3C 9D 9S 3C", false],
])("DetectFlush(%p) expecting (%p)", (input: string, result: boolean) => {
  expect(DetectFlush(GetHand(input) as Hand)).toEqual(result);
});

it.each([
    ["2H 3H 5H 4S 6S", true],
    ["5S 2C AC 4S 3S", true],
    ["TH 3C 9D 9S 3C", false],
  ])("DetectFullHouse(%p) expecting (%p)", (input: string, result: boolean) => {
    expect(DetectFullHouse(GetHand(input) as Hand)).toEqual(result);
  });

  it.each([
    ["2H 2H 2H 2S 6S", true],
    ["AS AC AC 4S AS", true],
    ["TH 3C 9D 9S 3C", false],
  ])("DetectFourOfAKind(%p) expecting (%p)", (input: string, result: boolean) => {
    expect(DetectFourOfAKind(GetHand(input) as Hand)).toEqual(result);
  });

  it.each([
    ["2H 3H 4H 5H 6H", true],
    ["AS 3S 2S 5S 4S", true],
    ["TH 3C 9D 9S 3C", false],
  ])("DetectStraightFlush(%p) expecting (%p)", (input: string, result: boolean) => {
    expect(DetectStraightFlush(GetHand(input) as Hand)).toEqual(result);
  });

  it.each([
    ["2H 3H 4H 5H 6H", 9],
    ["AS 3S 2S 5S 4S", 9],
    ["TH 3C 9D 9S 3C", HandType.TwoPair],
  ])("DetectHand(%p) expecting (%p)", (input: string, result: HandType) => {
    expect(DetectHand(GetHand(input) as Hand)).toEqual(result);
  });

  it.each([
    [HandType.FourOfAKind,HandType.Pair, 1],
    [HandType.HighCard, HandType.HighCard, 0],
    [HandType.TwoPair, HandType.StraightFlush, 2]
    
  ])("JudgeWinner((%p),(%p)) expecting (%p)", (input1: HandType, input2: HandType, result: number) => {
    expect(JudgeWinner(input1,input2)).toEqual(result);
  });

  
  it.each([
    ["2H 3H 4H 5H 6H - TH 3C 9D 9S 3C", 'Player 1 Wins'],
    ["TH 3C 9D 9S 3C - 2H 3H 5H 4S 6S", 'Player 2 Wins'],
    ['AS 3H 8C KD TH - KD 4C 8D 2S JH', 'Tie']
   
  ])("DetectFourOfAKind(%p) expecting (%p)", (input: string, result: string) => {
    expect(PlayGame(input)).toEqual(result);
  });
