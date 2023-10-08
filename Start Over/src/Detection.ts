import { Hand } from "./PokerParsing.ts";;

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


// start of the win condition logic


//  detect high card in a hand

export function DetectHighCard(hand: Hand): number[] {
    const faces: number[] = []; // seed
    for (let card of hand) {
        faces.push(card.face);
    }
    return faces.sort((b, a) => a - b);

    // const faces: number[] = hand.map(card => card.face).sort((b, a) => a - b);
    // return faces;
}


// // setup for detecting pairs, counts how many time each face occurs

export function CountFaces(hand: Hand): { [key: string]: number } {
    let faceCounts: any = {};
    for (let card of hand) {
        if (faceCounts[card.face] === undefined) {
            faceCounts[card.face] = 1;
        } else {
            let previousCount = faceCounts[card.face]
            faceCounts[card.face] = previousCount + 1;
        }
    }
    return faceCounts;
}


// function to setect how many instances of a face card exist

export function DetectOfAKind(searchCount: number, hand: Hand): boolean {
    let faceCounts = CountFaces(hand)
    let counts = Object.values(faceCounts)

    for (let count of counts) {
        if (count === searchCount) {
            return true
        }
    }
    return false
}


export function DetectPair(hand: Hand): boolean {
    return DetectOfAKind(2, hand);
}

export function DetectTwoPair(hand: Hand): boolean {
    let countedCards = CountFaces(hand)
    let counts = Object.values(countedCards)

    let countedPairs = 0
    for (let count of counts) {
        if (count === 2) {
            countedPairs++
        }
    }
    if (countedPairs === 2) {
        return true
    }
    return false
}


// detect tree of a kind

export function DetectThreeOfAKind(hand: Hand): boolean {
    return DetectOfAKind(3, hand);
}


// detect straight

export function DetectStraight(hand: Hand): boolean {
    // console.log(hand)
    const faces: number[] = hand.map(card => card.face).sort((a, b) => a - b);
    // let facesUnsorted = Object.values(hand.card[face])
    // console.log(facesUnsorted)
    for (let i = 1; i < faces.length; i++) {
        if (faces[i] - faces[i - 1] !== 1) {
            // console.log(faces)
            break;
        }
        if (i === faces.length - 1) {
            return true
        }
    }
    if (faces[0] === 2 && faces[1] === 3 && faces[2] === 4 && faces[3] === 5 && faces[4] === 14) {
        return true
    }
    return false
}


// detect flush

export function DetectFlush(hand: Hand): boolean {
    let suitCounts: any = {};
    for (let card of hand) {
        if (suitCounts[card.suit] === undefined) {
            suitCounts[card.suit] = 1;
        } else {
            suitCounts[card.suit] = suitCounts[card.suit] + 1;
        }
    }
    let counts = Object.values(suitCounts)
    for (let count of counts) {
        if (count === 5) {
            return true
        }
    }
    return false
}


// detect full house

export function DetectFullHouse(hand: Hand): boolean {
    let twoPair = DetectPair(hand)
    let threePair = DetectThreeOfAKind(hand)

    if (twoPair === true && threePair === true) {
        return true
    }
    return false
}


// detect four of a kind

export function DetectFourOfAKind(hand: Hand): boolean {
    return DetectOfAKind(4, hand);
}


// detect royal flush

export function DetectStraightFlush(hand: Hand): boolean {
    if (DetectFlush(hand) === true && DetectStraight(hand) === true) {
        return true
    }
    return false
}
// orchestration function
export function DetectHand(hand: Hand): HandType {

    if (DetectPair(hand)) {
        return HandType.Pair
    }

    if (DetectThreeOfAKind(hand)) {
        return HandType.ThreeOfAKind
    }

    if (DetectTwoPair(hand)) {
        return HandType.TwoPair
    }
    if (DetectStraight(hand)) {
        return HandType.Straight
    }

    if (DetectFlush(hand)) {
        return HandType.Flush
    }

    if (DetectFullHouse(hand)) {
        return HandType.FullHouse
    }
    if (DetectFourOfAKind(hand)) {
        return HandType.FourOfAKind
    }

    if (DetectStraightFlush(hand)) {
        return HandType.StraightFlush
    }
    else {
        return HandType.HighCard;
    }
}
