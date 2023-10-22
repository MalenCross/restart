

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
type Hand = Card[]


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