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

export function DetectThreeOfAKind(hand: Hand): boolean {
    return DetectOfAKind(3, hand);
}

export function DetectFourOfAKind(hand: Hand): boolean {
    return DetectOfAKind(4, hand);
}






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


















// // detect 2 pair
// export function DetectTwoPair(handstring: string): boolean {
//     let hand = GetHand(handstring)

//     if (typeof hand === 'object') {
//         let countedCards = CountFaces(hand)
//         console.log(countedCards)
//         let pairCounts: any = {}
//         let counts = Object.values(countedCards)
//         console.log(counts)

//         for (let countedPairs of counts) {
//             if (pairCounts[countedCards.face] === undefined) {
//                 pairCounts[countedPairs] = 1
//             }
//             // let pairCountValues = Object.values(pairCounts)
//             else {
//                 let pairCounts[countedPairs] = pairCounts[countedPairs] + 1
//             } 
//             // console.log(countedPairs)
//         }
//         console.log(pairCounts)

//         // let pairCountsParsed = Object.values(pairCounts)

//         // for (let count of pairCountsParsed) {
//         //     // console.log(pairCountsParsed)
//         //     // console.log(count)
//         //     if (count === 2) {
//         //         return true
//         //     }
//         // }
//         if( pairCounts['2'] === 1){
//             return true
//         }
//     }

//     return false
// }


// // detect full house
// export function DetectFullHouse(handstring: string): boolean {
//     let hand = GetHand(handstring)
//     if (typeof hand === 'object') {
//         let countedFaces = CountFaces(hand)
//         console.log(countedFaces)
//         let twoPair = false
//         let threePair = false


//         let counts = Object.values(countedFaces)
//         for (let count of counts) {

//             console.log(counts)
//             if (count === 2) {
//                 twoPair = true
//             }
//             if (count === 3) {
//                 threePair = true
//             }
//             if (twoPair === true && threePair === true) {
//                 return true
//             }
//         }
//     }
//     return false

// }



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