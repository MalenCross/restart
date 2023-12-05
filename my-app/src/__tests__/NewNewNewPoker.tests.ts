import { equal } from "assert";
import {
  Face,
  GetCard,
  GetFace,
  GetSuit,
  Suit,
  Card,
  Hand,
  GetHand,
  DetectHighCard,
  DetectTwoOfAKind,
  DetectHand,
  DetectWin,
  DetectTwoPair,
  DetectOfAKind,
  DetectThreeOfAKind,
  DetectStraight,
  DetectFlush,
  DetectFullHouse,
  DetectFourOfAKind,
  DetectStraightFlush,
} from "../NewNewNewPoker";

it.each([
  ["4D", 4 as Face],
  ["TH", 10 as Face],
])(
  "GetFace input (%p) is expecting (%p) as a result",
  (input: string, result: Face) => {
    expect(GetFace(input)).toEqual(result);
  }
);
it.each([
  ["at", "Not a Valid Face"],
  ["r4,", "Not a Valid Face"],
])("", (input: string, result: string) => {
  let runGetFace = () => GetFace(input);
  expect(runGetFace).toThrow(result);
});

it.each([
  ["4S", Suit.Spades],
  ["2H", Suit.Hearts],
])("", (input: string, result: Suit) => {
  expect(GetSuit(input)).toEqual(result);
});
it.each([["ss", "Not a Valid Suit"]])("", (input: string, result: string) => {
  let runGetSuit = () => GetSuit(input);
  expect(runGetSuit).toThrow(result);
});
it.each([
  ["TH", { face: 10 as Face, suit: Suit.Hearts }],
  ["AS", { face: 14 as Face, suit: Suit.Spades }],
])("", (input: string, result: Card) => {
  expect(GetCard(input)).toEqual(result);
});

it.each([
  [
    "2H TS QC AD 3H",
    [
      { face: 2 as Face, suit: Suit.Hearts },
      { face: 10 as Face, suit: Suit.Spades },
      { face: 12 as Face, suit: Suit.Clubs },
      { face: 14 as Face, suit: Suit.Diamonds },
      { face: 3 as Face, suit: Suit.Hearts },
    ],
  ],
])("", (input: string, result: Hand) => {
  expect(GetHand(input)).toEqual(result);
});

it.each([
  ["2H TS QC AD 3H", [14, 12, 10, 3, 2]],
  ["AS 5D 2C QS 9H", [14, 12, 9, 5, 2]],
])("", (input: string, result: number[]) => {
  expect(DetectHighCard(GetHand(input))).toEqual(result);
});

it.each([
  [
    "2H 2S QC AD AH",
    2,
    [
      ["2", 2],
      ["14", 2],
    ],
  ],
  ["2H 2S 2C 2D AH", 4, [["2", 4]]],
])("", (input1: string, input2: number, result: any) => {
  expect(DetectOfAKind(GetHand(input1), input2)).toEqual(result);
});

it.each([
  ["2H QS QC AD AH", [false]],
  ["2H 2S QC AD 4H", [true, 2] as [boolean, Face | null]],
])("", (input: string, result: any) => {
  expect(DetectTwoOfAKind(GetHand(input))).toEqual(result);
});

it.each([["2H 2S QC AD AH", [true, 2, 14]]])("", (input: string, result) => {
  expect(DetectTwoPair(GetHand(input))).toEqual(result);
});

it.each([
  ["2H 2S QC AD AH", [false]],
  ["2H 2S 2C 3D AH", [true, 2]],
])("", (input: string, result) => {
  expect(DetectThreeOfAKind(GetHand(input))).toEqual(result);
});

it.each([
  ["2H 2S QC AD AH", [false, 1]],
  ["2H 3S 4C 5D 6H", [true, 1]],
  ["AH 2S 3C 4D 5H", [true, 0]],
])("", (input: string, result: any) => {
  expect(DetectStraight(GetHand(input))).toEqual(result);
});

it.each([
  ["2H 2S QC AD AH", [false]],
  ["2H 3H 4H 5H 6H", [true]],
  ["AS 2S 3S 4S 5S", [true]],
])("", (input: string, result: any) => {
  expect(DetectFlush(GetHand(input))).toEqual(result);
});

it.each([
  ["2H 2S QC AD AH", [false]],
  ["2H 2H 2H 3H 3H", [true, 2, 3]],
  ["3S 3S 3S 2S 2S", [true, 3, 2]],
])("", (input: string, result: any) => {
  expect(DetectFullHouse(GetHand(input))).toEqual(result);
});

it.each([
  ["2H 2S QC AD AH", [false]],
  ["2H 2H 2H 2H 3H", [true, 2]],
  ["3S 3S 3S 3S 2S", [true, 3]],
])("", (input: string, result: any) => {
  expect(DetectFourOfAKind(GetHand(input))).toEqual(result);
});

it.each([
  ["2H 2H QH AH AH", [false, 1]],
  ["9H JH QS TH AH", [false, 1]],
  ["3S 4S 5S 6S 7S", [true, 1]],
  ["AS 2S 3S 4S 5S", [true, 0]],
])("", (input: string, result: any) => {
  expect(DetectStraightFlush(GetHand(input))).toEqual(result);
});

it.each([
  ["2H 3S QC AD AH", [2, 14]],
  ["2H 3S 3C QD AH", [2, 3]],
  ["2H 3S 4C QD AH", [1]],
])("", (input: string, result: number[]) => {
  expect(DetectHand(GetHand(input))).toEqual(result);
});

it.each([
  //   high card Player 1
  ["2H 3S QC KD 5H - 2H 3S 4C QD 5H", "player 1 Wins"],
  ["2H 3S QC 4D AH - 2H 3S 4C AD AH", "player 2 Wins"],
  ["2H 3S QC QD AH - 2H 3S 4C TD TH", "player 1 Wins"],
  ["2H 3S 5C AD AH - 2H 3S 6C AD AH", "player 2 Wins"],
  ["2H 5S 5C AD AH - 2H 3S 6C AD AH", "player 1 Wins"],
  ["5H 5S 3C 3D AH - 7H 5S 5C KD KH", "player 2 Wins"],
  ["5H 5S 3C 3D AH - 5H 5S 5C KD KH", "player 2 Wins"],
  ["6H 6S 6C 3D AH - 5H 5S 5C 3D KH", "player 1 Wins"],
  ["6H 6S 6C 3D AH - 5H 5S 5C 3D KH", "player 1 Wins"],
  ["2H 3S 4C 5D 6H - 5H 5S 5C 3D KH", "player 1 Wins"],
  ["2H 3S 4C 5D 6H - AH 2S 3C 4D 5H", "player 1 Wins"],
  ["2H 3S 4C 5D 6H - AH 2H 3H 4H 5H", "player 2 Wins"],
  ["2S 3S 4S 5S QS - 2H AH 3H 4H 5H", "player 2 Wins"],
  ["2S 3S 4S 5S QS - 2H 2H 2H 3H 3H", "player 2 Wins"],
  ["3S 3S 3S 2S 2S - 2H 2H 2H 3H 3H", "player 1 Wins"],
  ["2H 3S 4S 5S 6S - 2H 2H 2H 3H 3H", "player 2 Wins"],
  ["5H 5S 5S 5S 6S - 2H 2H 2H 3H 3H", "player 1 Wins"],
  ["5H 5S 5S 5S 6S - AH AH AH AH 3H", "player 2 Wins"],
  ["5H 5S 5S 5S 6S - AH 2H 3H 4H 5H", "player 2 Wins"],
  ["2S 3S 4S 5S 6S - AH 2H 3H 4H 5H", "player 1 Wins"],
  ["AS 2S 3S 4S 5S - AH 2H 3H 4H 5H", "tie"],
])("Detect Win input (%p) to equal (%p)", (input: string, result) => {
  expect(DetectWin(input)).toEqual(result);
});
