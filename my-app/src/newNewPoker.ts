export type Face = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14
export type Suit = 'Spades' | "Hearts" | 'Dimonds' | 'Clubs'

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
}


const SuitLookup: { [key: string]: Suit } = {
    S: 'Spades',
    H: "Hearts",
    D: 'Dimonds',
    C: 'Clubs'
}


export function GetFace(card: string): Face {
    return FaceLookup[card[0]]
}

export function GetSuit(card: string): Suit {
    return SuitLookup[card[1]]
}