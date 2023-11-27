
export enum Suit {
    Spades = 'Spades',
    Hearts = 'Hearts',
    Clubs = 'Clubs',
    Diamonds = 'Diamonds'
}


export enum ParseError {
    InvalidFace = 'Not a Valid Face',
    InvalidSuit = 'Not a Valid Suit',
    InvalidCard = 'Not a Valid Face and Suit'
}

type Face = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

const faceLookup: { [key: string]: Face } = {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    'T': 10,
    'J': 11,
    'Q': 12,
    'K': 13,
    'A': 14
}


const suitLookup: { [key: string]: Suit } = {
    'S': Suit.Spades,
    'H': Suit.Hearts,
    'C': Suit.Clubs,
    'D': Suit.Diamonds
}

export interface Card {
    face: Face,
    suit: Suit
}
export type Hand = Card[]


export function GetFace(card: string): Face {
    if (faceLookup[card[0]] !== undefined) {
        return faceLookup[card[0]]
    }
    throw new Error('Invalid face');
}


export function GetSuit(card: string): Suit {
    if (suitLookup[card[1]] !== undefined) {
        return suitLookup[card[1]]
    }
    throw new Error('Invalid suit')
}


// exceptions    throw new ParseError('invalid suit');
//    pros       nearly free in terms of code, instant stop on error
//    cons       possibly really complex errors, and less detailed validation responses (without a lot of extra work)
// errors        return ParseError.InvalidSuit
//    pros       most detailed validation responses, stop when you want on error
//    cons       way more code (in JS, TS, C#, Java, Python, Ruby)
export function GetCard(card: string): Card {
    return {
        face: GetFace(card),
        suit: GetSuit(card)
    }
}


export function GetHand(hand: string): Hand {
    return hand.split(' ').map(GetCard)
}


// detection logic

export enum HandType {
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


export function CountFace(hand: Hand): { [key: string]: number } {
    let faceCounts: { [key: number]: number } = {}
    for (let card of hand) {
        let face = card['face'];
        if (faceCounts[face] === undefined) {
            faceCounts[face] = 1
        } else {
            faceCounts[face] += 1
        }
    }
    return faceCounts
}

export function DetectOfAKind(searchCount: number, hand: Hand): boolean {
    let counts = Object.values(CountFace(hand))
    return counts.some(counts => counts === searchCount)
}

export function DetectHighCard(hand: Hand): number[] {
    return hand.map(faceValues => faceValues.face).sort((a, b) => (b - a))
}

export function DetectPair(hand: Hand): boolean {
    return DetectOfAKind(2, hand)
}

export function DetectTwoPair(hand: Hand): boolean {
    let countedPairs = Object.values(CountFace(hand))
    let pairsWithCount2 = countedPairs.filter(i => i === 2)
    return pairsWithCount2.length === 2
}

export function DetectThreeOfAKind(hand: Hand): boolean {
    return DetectOfAKind(3, hand)
}

export function DetectStraight(hand: Hand): boolean {
    let sortedFaceArray = hand.map(card => card.face).sort((a, b) => a - b)
    let arrayWithoutDup = Array.from(new Set(sortedFaceArray));

    if (arrayWithoutDup.length < 5) {
        return false
    }
    let acesLowStraight = JSON.stringify([2, 3, 4, 5, 14]) === JSON.stringify(arrayWithoutDup);
    if (acesLowStraight) {
        return true
    }
    for (let i = 0; i < arrayWithoutDup.length; i++) {
        if (sortedFaceArray[i + 4] - sortedFaceArray[i] === 4) {
            return true
        }
    }
    return false
}

export function DetectFlush(hand: Hand): boolean {
    let suitArray: { [key: string]: number } = {}
    for (let card of hand) {
        suitArray[card.suit] === undefined
            ? (suitArray[card.suit] = 1)
            : (suitArray[card.suit] += 1)
    }
    for (const suit of Object.values(suitArray)) {
        if (suit >= 5) {
            return true
        }
    }
    return false
}

export function DetectFullHouse(hand: Hand): boolean {
    return DetectPair(hand) && DetectThreeOfAKind(hand)
}

export function DetectFourOfAKind(hand: Hand): boolean {
    return DetectOfAKind(4, hand)
}

export function DetectStraightFlush(hand: Hand): boolean {
    return DetectStraight(hand) && DetectFlush(hand)
}

export function DetectHand(hand: Hand): HandType {
    let checkAndType = [
        [() => DetectPair(hand), HandType.Pair],
        [() => DetectThreeOfAKind(hand), HandType.ThreeOfAKind],
        [() => DetectTwoPair(hand), HandType.TwoPair],
        [() => DetectStraight(hand), HandType.Straight],
        [() => DetectFlush(hand), HandType.Flush],
        [() => DetectFullHouse(hand), HandType.FullHouse],
        [() => DetectFourOfAKind(hand), HandType.FourOfAKind],
        [() => DetectStraightFlush(hand), HandType.StraightFlush]
    ] as [() => boolean, HandType][];

    for (let [checkFn, returnType] of checkAndType) {
        if (checkFn()) {
            return returnType
        }
    }
    return HandType.HighCard;
}

export function JudgeWinner(player1: HandType, player2: HandType): number {
    return player1 === player2 ? 0
        : player1 > player2 ? 1
            : 2
}

export function PrintWinner(winner: number): string {
    return winner === 0 ? 'Tie'
        : winner === 1 ? 'Player 1 Wins'
            : "Player 2 Wins"
}

export function PlayGame(handstrings: string): string {
    let splithands = handstrings.split(' - ');
    let winner = JudgeWinner(DetectHand(GetHand(splithands[0]) as Hand), DetectHand(GetHand(splithands[1]) as Hand))
    let winnerPrint = PrintWinner(winner)
    return winnerPrint
}

