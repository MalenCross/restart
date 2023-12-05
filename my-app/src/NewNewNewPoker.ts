export type Face = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
const faceLookUp: { [key: string]: Face } = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

export function GetFace(card: string): Face {
  if (faceLookUp[card[0]]) return faceLookUp[card[0]];
  else throw new Error("Not a Valid Face");
}
export enum Suit {
  Spades = "Spades",
  Hearts = "Hearts",
  Diamonds = "Diamonds",
  Clubs = "Clubs",
}

const suitLookUp: { [key: string]: Suit } = {
  S: Suit.Spades,
  H: Suit.Hearts,
  D: Suit.Diamonds,
  C: Suit.Clubs,
};

export function GetSuit(card: string): Suit {
  if (suitLookUp[card[1]]) return suitLookUp[card[1]];
  else throw new Error("Not a Valid Suit");
}
export type Card = {
  face: Face;
  suit: Suit;
};
export function GetCard(card: string): Card {
  return {
    face: GetFace(card),
    suit: GetSuit(card),
  };
}
export type Hand = Card[];

export function GetHand(hand: string): Hand {
  return hand.split(" ").map((i) => GetCard(i));
}

// detection

export function DetectHighCard(hand: Hand): number[] {
  return hand.map((card) => card.face).sort((a, b) => b - a);
}

export function DetectOfAKind(hand: Hand, ofAKind: number): any {
  let dictionary: { [key: string]: number } = {};
  hand.forEach((card) => {
    if (dictionary[card.face] === undefined) {
      dictionary[card.face] = 1;
    } else {
      dictionary[card.face]++;
    }
  });
  return Object.entries(dictionary).filter((i) => i[1] === ofAKind);
}

export function DetectTwoOfAKind(hand: Hand): any {
  let dictionary = DetectOfAKind(hand, 2);

  let isPair = dictionary.length === 1;
  if (isPair) return [isPair, +dictionary[0][0] as Face];
  else return [isPair];
}

export function DetectTwoPair(hand: Hand): any {
  let dictionary = DetectOfAKind(hand, 2);
  let IsTwoPair = dictionary.length === 2;
  if (IsTwoPair) return [true, +dictionary[0][0], +dictionary[1][0]];
  else return [IsTwoPair];
}

export function DetectThreeOfAKind(hand: Hand): any {
  let dictionary = DetectOfAKind(hand, 3);

  if (dictionary.length === 1) return [true, +dictionary[0][0]];
  else return [dictionary.length === 1];
}

export function DetectStraight(hand: Hand) {
  let sortedValues = DetectHighCard(hand);
  if (JSON.stringify(sortedValues) === JSON.stringify([14, 5, 4, 3, 2]))
    return [true, 0];
  return [
    Array(0, 1, 2, 3).filter((i) => sortedValues[i] - 1 !== sortedValues[i + 1])
      .length === 0,
    1,
  ];
}

export function DetectFlush(hand: Hand): any {
  let dictionary: { [key: string]: number } = {};
  hand.forEach((i) => {
    if (!dictionary[i.suit]) dictionary[i.suit] = 1;
    else dictionary[i.suit]++;
  });
  return [Object.values(dictionary).filter((i) => i === 5).length === 1];
}

export function DetectFullHouse(hand: Hand): any {
  if (DetectTwoOfAKind(hand)[0] && DetectThreeOfAKind(hand)[0])
    return [true, DetectThreeOfAKind(hand)[1], DetectTwoOfAKind(hand)[1]];
  else return [false];
}

export function DetectFourOfAKind(hand: Hand): any {
  let dictionary = DetectOfAKind(hand, 4);
  if (dictionary.length === 1) return [true, +dictionary[0][0]];
  else return [false];
}

export function DetectStraightFlush(hand: Hand): any {
  return [
    DetectFlush(hand)[0] && DetectStraight(hand)[0],
    DetectStraight(hand)[1],
  ];
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
type DetectedHand = {};
export function DetectHand(hand: Hand): any {
  if (DetectStraightFlush(hand)[0])
    return [HandType.StraightFlush, DetectStraightFlush(hand)[1]];

  const detectFourOfAKind = DetectFourOfAKind(hand);
  if (detectFourOfAKind[0]) return [HandType.FourOfAKind, detectFourOfAKind[1]];

  const detectFullHouse = DetectFullHouse(hand);
  if (detectFullHouse[0])
    return [HandType.FullHouse, detectFullHouse[1], detectFullHouse[2]];

  const detectFlush = DetectFlush(hand);
  if (detectFlush[0]) return [HandType.Flush];

  const detectStraight = DetectStraight(hand);
  if (detectStraight[0]) return [HandType.Straight, detectStraight[1]];

  const detectThreeOfAKind = DetectThreeOfAKind(hand);
  if (detectThreeOfAKind[0])
    return [HandType.ThreeOfAKind, detectThreeOfAKind[1]];

  const detectTwoPair = DetectTwoPair(hand);
  if (detectTwoPair[0])
    return [HandType.TwoPair, detectTwoPair[1], detectTwoPair[2]];

  let detectTwoOfAKind = DetectTwoOfAKind(hand);
  if (detectTwoOfAKind[0]) return [HandType.Pair, detectTwoOfAKind[1]];
  else return [HandType.HighCard];
}

export function DetectWin(hands: string): any {
  const hand = hands.split(" - ");
  const player1Hand = DetectHand(GetHand(hand[0]));
  const player2Hand = DetectHand(GetHand(hand[1]));
  const player1HandSorted = DetectHighCard(GetHand(hand[0]));
  const player2HandSorted = DetectHighCard(GetHand(hand[1]));
  console.log([player1Hand[0], player2Hand[0]]);
  if (player1Hand[0] > player2Hand[0]) return "player 1 Wins";
  if (player1Hand[0] < player2Hand[0]) return "player 2 Wins";
  console.log([player1Hand[1], player2Hand[1]]);
  if (player1Hand[1] > player2Hand[1]) return "player 1 Wins";
  if (player1Hand[1] < player2Hand[1]) return "player 2 Wins";

  let notTie = [0, 1, 2, 3, 4].find(
    (i) => player1HandSorted[i] !== player2HandSorted[i]
  );
  console.log(notTie);
  console.log([
    player1HandSorted[notTie as number],
    player2HandSorted[notTie as number],
  ]);
  if (player1HandSorted[notTie as number] > player2HandSorted[notTie as number])
    return "player 1 Wins";
  if (player1HandSorted[notTie as number] < player2HandSorted[notTie as number])
    return "player 2 Wins";
  else return "tie";
}
