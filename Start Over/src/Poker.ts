// Poker


// Get face value of card from input string

export function GetFace(GetFaceInput: string): number | string {

    let unparsedFace: string = GetFaceInput [0];
    let parsedFaceOutput  : number | string = 0;
    
    if( unparsedFace === 'T'){
        parsedFaceOutput = 10;
    }
    else if(
        unparsedFace === 'J'){
        parsedFaceOutput = 11;
    }
    else if(
        unparsedFace === 'Q'){
        parsedFaceOutput = 12;
    }
    else if(
        unparsedFace === 'K'){
        parsedFaceOutput = 13;
    }
    else if(
        unparsedFace === 'A'){
        parsedFaceOutput = 14;
    }
    else{
        parsedFaceOutput = parseInt(unparsedFace)
    
    if (isNaN(parsedFaceOutput) || parsedFaceOutput < 2 || parsedFaceOutput > 9) {
        parsedFaceOutput = 'not a valid face value';
      }
    }
    return parsedFaceOutput
}


// Get suit of card from input string

export function GetSuit(getSuitInput: string): string{

    let unparsedSuit: string = getSuitInput [1]
    let parsedSuit:   string = 'not a valid suit'

    if(unparsedSuit === 'S'){
        parsedSuit = 'Spades'
    }
    if(unparsedSuit === 'H'){
        parsedSuit = 'Hearts'
    }
    if(unparsedSuit === 'D'){
        parsedSuit = 'Diamonds'
    }
    if(unparsedSuit === 'C'){
        parsedSuit = 'Clubs'
    }
    return parsedSuit
}


// Creating a card type

export interface Card {
	face: number | string
    suit: string
}


// Cet the card as an object from a poker card string

export function GetCard(getCardInput : string): Card | string {

    let parsedFaceOutput : number | string = GetFace(getCardInput)
    let parsedSuit : string                = GetSuit(getCardInput)

    let Card1 : Card = {
        face : parsedFaceOutput,
        suit : parsedSuit
    }
    if(parsedFaceOutput === 'not a valid face value' && parsedSuit === 'not a valid suit'){
    return 'not a valid face value and not a valid suit value'
}
    if(parsedFaceOutput === 'not a valid face value' ) {
        return 'not a valid face value'
     }
    if(parsedSuit === 'not a valid suit'){
        return 'not a valid suit'
    }

    return Card1
}
