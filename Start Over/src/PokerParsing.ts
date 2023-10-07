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



/*
    PARSING

    GetHand(string)    =>    Hand
      GetFace
      GetCard
      GetSuit



    DETECTING
    DetectHand(Hand) => HandType
        DetectPair
        DetectTwoPair
        DetectStraight
        ....
    

*/
