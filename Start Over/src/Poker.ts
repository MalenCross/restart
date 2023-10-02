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




// Cet the card as an object from a poker card string or return an eeror string

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


// Creating a card type

export interface Card {
	face: number | string
    suit: string
}


// Creating a card type

type Hand = Card[]


// Get the hand ans an array of Card objects or return an error string

export function GetHand(handInput: string): Hand | string  {

    const handArray  = handInput.split(" ")
    let parsedArray: Hand | string = []
    
    for(const cardstring of handArray)
    if(cardstring.length === 2){
    const card  = GetCard(cardstring)

    if(typeof card === 'object'){
    parsedArray.push(card)
    }
    if(typeof card === 'string'){
    return card
    }}
return parsedArray
}