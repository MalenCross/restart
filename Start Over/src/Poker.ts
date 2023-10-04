// Poker



export enum ParseError {
    InvalidFace = "Invalid Face",
    InvalidSuit = "Invalid Suit",
    InvalidCard = "Invalid Card"
}


export enum Suit {
    Spades = "Spades",
    Hearts = "Hearts",
    Diamonds = "Diamonds",
    Clubs = "Clubs"
}

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

// Creating a card type

export interface Card {
    face: number
    suit: string
}


// Creating a card type

export type Hand = Card[]


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

// RED GREEN REFACTOR
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

export function DetectPair(hand: Hand): boolean {
    return DetectOfAKind(2, hand);
}

export function DetectThreeOfAKind(hand: Hand): boolean {
    return DetectOfAKind(3, hand);
}

export function DetectFourOfAKind(hand: Hand): boolean {
    return DetectOfAKind(4, hand);
}

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











// export enum ParseError {
//     InvalidFace = 'Invalid Face',
//     InvalidSuit = 'Invalid Suit',
//     // card = 'Invalid Card'
// }
// export enum Suit {
//     Spades = 'Spades',
//     Hearts = 'Hearts',
//     Diamonds = 'Diamonds',
//     Clubs = 'Clubs'
// }
// export function GetFace(GetFaceInput: string): number | ParseError {
//     let unparsedFace = GetFaceInput[0]

//     if (unparsedFace === 'T') {
//         return 10
//     }
//     if (unparsedFace === 'J') {
//         return 11
//     }
//     if (unparsedFace === 'Q') {
//         return 12
//     }
//     if (unparsedFace === 'K') {
//         return 13
//     }
//     if (unparsedFace === 'A') {
//         return 14
//     }

//     else {
//         let parsedFace = parseInt(unparsedFace)

//         if (isNaN(parsedFace) || parsedFace < 2 || parsedFace > 9) {
//             return ParseError.InvalidFace;
//         }
//         return parsedFace
//     }
// }

// export function GetSuit(getSuit: string): Suit | ParseError {
//     let unparsedSuit = getSuit[1]

//     if (unparsedSuit === 'S') {
//         return Suit.Spades
//     }
//     else if (unparsedSuit === 'H') {
//         return Suit.Hearts
//     }
//     if (unparsedSuit === 'D') {
//         return Suit.Diamonds
//     }
//     if (unparsedSuit === 'C') {
//         return Suit.Clubs
//     }
//     else {
//         return ParseError.InvalidSuit
//     }
// }
// export function GetCard( getCard: string): Card | ParseError {
//     let unparsedFace = getCard[0]
//     let unparsedSuit = getCard[1]

//     let parsedFace = GetFace(unparsedFace)
//     let par
// }