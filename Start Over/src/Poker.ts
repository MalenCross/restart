// Poker

// creating a list of fails

export enum ParseError {
    InvalidFace = "Invalid Face",
    InvalidSuit = "Invalid Suit",
    InvalidCard = "Invalid Card"
}

// creating a list of suits

export enum Suit {
    Spades = "Spades",
    Hearts = "Hearts",
    Diamonds = "Diamonds",
    Clubs = "Clubs"
}

// Creating a card type

export interface Card {
    face: number
    suit: string
}

// Creating a card type

export type Hand = Card[]



// start parsing string in to hand


// Get face value of card from input string

export function GetFace(GetFaceInput: string): number | ParseError.InvalidFace {

    let unparsedFace: string = GetFaceInput[0];
    let parsedFaceOutput: number = 0;

    if (unparsedFace === 'T') {
        parsedFaceOutput = 10;
    }
    else if (unparsedFace === 'J') {
        parsedFaceOutput = 11;
    }
    else if (unparsedFace === 'Q') {
        parsedFaceOutput = 12;
    }
    else if (unparsedFace === 'K') {
        parsedFaceOutput = 13;
    }
    else if (unparsedFace === 'A') {
        parsedFaceOutput = 14;
    }
    else {
        parsedFaceOutput = parseInt(unparsedFace)

        if (isNaN(parsedFaceOutput) || parsedFaceOutput < 2 || parsedFaceOutput > 9) {
            return ParseError.InvalidFace;
        }
    }
    return parsedFaceOutput
}


// Get suit of card from input string

export function GetSuit(getSuitInput: string): Suit | ParseError.InvalidSuit {

    let unparsedSuit: string = getSuitInput[1]
    let parsedSuit: Suit | ParseError.InvalidSuit = ParseError.InvalidSuit

    if (unparsedSuit === 'S') {
        parsedSuit = Suit.Spades
    }
    if (unparsedSuit === 'H') {
        parsedSuit = Suit.Hearts
    }
    if (unparsedSuit === 'D') {
        parsedSuit = Suit.Diamonds
    }
    if (unparsedSuit === 'C') {
        parsedSuit = Suit.Clubs
    }
    return parsedSuit
}


// Cet the card as an object from a poker card string or return an eeror string

export function GetCard(getCardInput: string): Card | ParseError {
    let parsedFaceOutput = GetFace(getCardInput)
    let parsedSuit = GetSuit(getCardInput)

    if (parsedFaceOutput === ParseError.InvalidFace && parsedSuit === ParseError.InvalidSuit) {
        return ParseError.InvalidCard
    }
    if (parsedFaceOutput === ParseError.InvalidFace) {
        return ParseError.InvalidFace
    }
    if (parsedSuit === ParseError.InvalidSuit) {
        return ParseError.InvalidSuit
    }

    return {
        face: parsedFaceOutput,
        suit: parsedSuit
    }
}


// Get the hand ans an array of Card objects or return an error string

export function GetHand(handInput: string): Hand | ParseError {

    const handArray: string[] = handInput.split(" ")
    const parsedArray: Hand = []

    for (let cardstring of handArray) {
        // console.log("Card: " + cardstring); // "2D" ... "TD" .... "5S"

        if (cardstring.length === 2) {
            const card = GetCard(cardstring)

            if (typeof card === 'object') {
                parsedArray.push(card)
            } else {
                return card
            }
        } else {
            return ParseError.InvalidCard
        }
    }

    return parsedArray
}


//  detect high card in a hand

export function DetectHighCard(handstring: string | ParseError): number[] {
    let hand = GetHand(handstring)

    if (typeof hand === 'object') {
        const faces: number[] = hand.map(card => card.face).sort((b, a) => a - b);

        return faces
    }

    return []
}


// setup for detecting pairs, counts how many time each face occurs

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


// start of the win condition logic


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


//  detect if pair condition is true

export function DetectPair(hand: Hand): boolean {
    return DetectOfAKind(2, hand);
}


// detect 2 pair

export function DetectTwoPair(handstring: string): boolean {
    let hand = GetHand(handstring)

    if (typeof hand === 'object') {
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
    }
    return false
}


// detect tree of a kind

export function DetectThreeOfAKind(hand: Hand): boolean {
    return DetectOfAKind(3, hand);
}


// detect straight

export function DetectStraight(handstring: string): boolean {
    let hand = GetHand(handstring)

    if (typeof hand === 'object') {
        const faces: number[] = hand.map(card => card.face).sort((a, b) => a - b);

        for (let i = 1; i < faces.length; i++) {
            if (faces[i] - faces[i - 1] !== 1) {
                break;
            }
            if (i === faces.length - 1) {
                return true
            }
        }
        if (faces[0] === 2 && faces[1] === 3 && faces[2] === 4 && faces[3] === 5 && faces[4] === 14) {
            return true
        }
    }
    return false
}


// detect flush

export function DetectFlush(handString: string): boolean {
    let hand = GetHand(handString)

    if (typeof hand === 'object') {
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
    }
    return false
}


// detect full house

export function DetectFullHouse(handstring: string): boolean {
    let hand = GetHand(handstring)
    if (typeof hand === 'object') {

        let twoPair = DetectPair(hand)
        let threePair = DetectThreeOfAKind(hand)

        if (twoPair === true && threePair === true) {
            return true
        }
    }
    return false
}


// detect four of a kind

export function DetectFourOfAKind(hand: Hand): boolean {
    return DetectOfAKind(4, hand);
}


// detect royal flush

export function DetectStraightFlush(handString: string): boolean {

    if (DetectFlush(handString) === true && DetectStraight(handString) === true) {
        return true
    }
    return false
}



// win logic


// split hand strings

export function SplitHandStrings(twoHandString: string): [string, string] {
    const splitHands: string[] = twoHandString.split("  ")

    console.log(splitHands)

    let player1 = splitHands[0]
    let player2 = splitHands[1]

    console.log(player1)
    console.log(player2)

    return [player1, player2]
}


//  win high card

export function WinHighCard(handStrings: string): string {
    const [player1String, player2String] = SplitHandStrings(handStrings);

    let player1HandSorted = DetectHighCard(player1String)
    let player2HandSorted = DetectHighCard(player2String)

    console.log(player1HandSorted)
    console.log(player2HandSorted)

    if (player1HandSorted[0] > player2HandSorted[0]) {
        return 'Player 1 Wins'
    }
    if (player1HandSorted[0] < player2HandSorted[0]) {
        return 'Player 2 Wins'
    }
    if (player1HandSorted[0] === player2HandSorted[0]) {
        if (player1HandSorted[1] > player2HandSorted[1]) {
            return 'Player 1 Wins'
        }
        if (player1HandSorted[1] < player2HandSorted[1]) {
            return 'Player 2 Wins'
        }
    }
    if (player1HandSorted[1] === player2HandSorted[1]) {
        if (player1HandSorted[2] > player2HandSorted[2]) {
            return 'Player 1 Wins'
        }
        if (player1HandSorted[2] < player2HandSorted[2]) {
            return 'Player 2 Wins'
        }
    }
    if (player1HandSorted[2] === player2HandSorted[2]) {
        if (player1HandSorted[3] > player2HandSorted[3]) {
            return 'Player 1 Wins'
        }
        if (player1HandSorted[3] < player2HandSorted[3]) {
            return 'Player 2 Wins'
        }
    }
    if (player1HandSorted[3] === player2HandSorted[3]) {
        if (player1HandSorted[4] > player2HandSorted[4]) {
            return 'Player 1 Wins'
        }
        if (player1HandSorted[4] < player2HandSorted[4]) {
            return 'Player 2 Wins'
        }
    }
    if(player1HandSorted[4] === player2HandSorted[4]) {
        return 'Tie'
    }
    return 'fail'
}
