
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


const faceLookup: { [key: string]: number } = {
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

export type Card = {
    face: number,
    suit: Suit
}
export type Hand = Card[]


export function GetFace(card: string): number | ParseError.InvalidFace {

    return faceLookup[card[0]] !== undefined ? faceLookup[card[0]] : ParseError.InvalidFace
}


export function GetSuit(card: string): Suit | ParseError.InvalidSuit {

    return suitLookup[card[1]] !== undefined ? suitLookup[card[1]] : ParseError.InvalidSuit
}


export function GetCard(card: string): Card | ParseError {

    let faceValue = GetFace(card)
    let suitValue = GetSuit(card)

    return faceValue === ParseError.InvalidFace && suitValue === ParseError.InvalidSuit
        ? ParseError.InvalidCard :
        faceValue === ParseError.InvalidFace ? ParseError.InvalidFace :
            suitValue === ParseError.InvalidSuit ? ParseError.InvalidSuit :
                { face: faceValue as number, suit: suitValue as Suit }
}


export function GetHand(hand: string): Hand | ParseError {
    let handSplit = hand.split(' ')
    let handArray: Hand = []
    for (let card of handSplit) {
        let parsedCard = GetCard(card);
        if (Object.values(ParseError).includes(parsedCard as any)) {
            return `${parsedCard} in card ${card}` as ParseError;
        } else {
            handArray.push(parsedCard as Card);
        }


    }
    return handArray;

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
    let faceCounts: { [key: string]: number } = {}
    for (let card of hand) {
        faceCounts[card.face] === undefined
            ? faceCounts[card.face] = 1
            : (faceCounts[card.face] += 1)
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
    let strairSpecial = [2, 3, 4, 5, 14]
    let sortedFaceArray = hand.map(card => card.face).sort((a, b) => a - b)
    let arrayWithoutDup = Array.from(new Set(sortedFaceArray));

    if (arrayWithoutDup.length < 5) {
        return false
    }
    if (strairSpecial.every((value, index) => value === arrayWithoutDup[index])) {
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

    return DetectPair(hand) ? HandType.Pair

        : DetectThreeOfAKind(hand) ? HandType.ThreeOfAKind

            : DetectTwoPair(hand) ? HandType.TwoPair

                : DetectStraight(hand) ? HandType.Straight

                    : DetectFlush(hand) ? HandType.Flush

                        : DetectFullHouse(hand) ? HandType.FullHouse

                            : DetectFourOfAKind(hand) ? HandType.FourOfAKind

                                : DetectStraightFlush(hand) ? HandType.StraightFlush

                                    : HandType.HighCard;

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