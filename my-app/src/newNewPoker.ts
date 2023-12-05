export type Face = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

export enum Suit {
  Spades = "Spades",
  Hearts = "Hearts",
  Diamonds = "Diamonds",
  Clubs = "Clubs",
}
const FaceLookup: { [key: string]: Face } = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};
export type Card = {
  face: Face;
  suit: Suit;
};
const SuitLookup: { [key: string]: Suit } = {
  S: Suit.Spades,
  H: Suit.Hearts,
  D: Suit.Diamonds,
  C: Suit.Clubs,
};

export type Hand = Card[];

export function GetFace(card: string): Face {
  if (FaceLookup[card[0]] !== undefined) {
    return FaceLookup[card[0]];
  }
  throw new Error("Not a Valid Face");
}

export function GetSuit(card: string): Suit {
  if (SuitLookup[card[1]] !== undefined) {
    return SuitLookup[card[1]];
  }
  throw new Error("Invalid suit");
}

export function GetCard(card: string): Card {
  return {
    face: GetFace(card),
    suit: GetSuit(card),
  };
}

export function GetHand(hand: string): Hand {
  return hand.split(" ").map((i) => GetCard(i));
}

// detection

export function DetectHighCard(hand: Hand): number[] {
  return hand.map((card) => card.face).sort((a, b) => b - a);
}
type Dictionary = { [key: string]: number };

function DictionaryOfAKind(hand: Hand): Dictionary {
  let dictionary: Dictionary = {};
  hand.forEach((card) => {
    if (dictionary[card.face] === undefined) {
      dictionary[card.face] = 1;
    } else {
      dictionary[card.face]++;
    }
  });
  return dictionary;
}

export function DetectPair(hand: Hand): boolean {
  return Object.values(DictionaryOfAKind(hand)).find((num) => num === 2) === 2;
}

export function DetectTwoPair(hand: Hand): boolean {
  let dictionary: Dictionary = {};

  (Object.values(DictionaryOfAKind(hand))).forEach((value) => {
    if (dictionary[value] === undefined) {
      dictionary[value] = 1;
    } else {
      dictionary[value]++;
    }
  });
  return Object.values(dictionary).find((i) => i === 2) === 2;
}

export function DetectThreeOfAKind(hand: Hand): boolean {
  return Object.values(DictionaryOfAKind(hand)).find((num) => num === 3) === 3;
}

export function DetectStraight(hand: Hand): boolean {
  let faceValues = hand.map((card) => card.face).sort((a, b) => a - b);
  if (JSON.stringify(faceValues) === "234514") return false;
  let result = false;
  for (let i = 0; i < faceValues.length - 1; i++) {
    if (faceValues[i] + 1 !== faceValues[i + 1]) {
      break;
    } else {
      result = true;
    }
  }
  return result;
}

export function DetectFlush(hand: Hand): boolean {
  let dictionary: Dictionary = {};
  hand.forEach((card) => {
    if (dictionary[card.suit] === undefined) {
      dictionary[card.suit] = 1;
    } else {
      dictionary[card.suit]++;
    }
  });
  return Object.values(dictionary).length === 1;
}

export function DetectFullHouse(hand: Hand): boolean {
  let dictionary: Dictionary = {};
  hand.forEach((card) => {
    if (dictionary[card.suit] === undefined) {
      dictionary[card.suit] = 1;
    } else {
      dictionary[card.suit]++;
    }
  });
  return Object.values(dictionary).join("") === "32";
}

export function DetectFourOfAKind(hand: Hand): boolean {
  return Object.values(DictionaryOfAKind(hand)).find((num) => num === 4) === 4;
}

export function DetectStraightFlush(hand: Hand): boolean {
  return DetectFlush(hand) && DetectStraight(hand);
}

enum HandType {
  HighCard = 1,
  Pair = 2,
  TwoPair = 3,
  ThreeOfAKind = 4,
  Straight = 5,
  Flush = 6,
  FullHouse = 7,
  FourOfAKind = 8,
  StraightFlush = 9,
}
export function DetectHand(hand: Hand): HandType {
  let checkAndType = [
    [() => DetectStraightFlush(hand), HandType.StraightFlush],
    [() => DetectFourOfAKind(hand), HandType.FourOfAKind],
    [() => DetectFullHouse(hand), HandType.FullHouse],
    [() => DetectFlush(hand), HandType.Flush],
    [() => DetectStraight(hand), HandType.Straight],
    [() => DetectThreeOfAKind(hand), HandType.ThreeOfAKind],
    [() => DetectTwoPair(hand), HandType.TwoPair],
    [() => DetectPair(hand), HandType.Pair],
  ] as [() => boolean, HandType][];
  for (let [checkFn, returnType] of checkAndType) {
    if (checkFn()) {
      return returnType;
    }
  }
  return HandType.HighCard;
}
export function JudgeWinner(player1: HandType, player2: HandType): number {
  if (player1 === player2) return 0;
  if (player1 > player2) return 1;
  else return 2;
}

export function PlayGame(hands: string): string {
  let handArr = hands.split(" - ");
  let player1 = DetectHand(GetHand(handArr[0]));
  let player2 = DetectHand(GetHand(handArr[1]));
  let judge = JudgeWinner(player1, player2);

  const winCondition: { [key: number]: string } = {
    1: "Player 1 Wins",
    2: "Player 2 Wins",
    0: "Tie",
  };

  return winCondition[judge];
}
