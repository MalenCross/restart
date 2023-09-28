export function Sum(x:number, y:number) :number {
	return x + y;
}

export function Div(x:number, y:number) :number {
	return x/y;
}

export function SumOfSquares(x:number, y:number) :number {
	return Math.pow(x,2) + Math.pow(y,2);
}

export function Greeting(name:string) :string {
	return "Hello " + name;
}
export function GetFirst(arr:number[]) :number {
	return arr[0];
}

// export interface Card {
// 	suit: string
// 	face: number
// }

// let card1 = {suit: "hearts", face : 2};
// card1.face
// card1.suit

export function GetFace(cardString:string) :any {
	let firstLetter = cardString[0];
	let face = 0;
	if(firstLetter === 'A') {
		face = 14;
	}
	if(firstLetter === 'K') {
		face = 13;
	}
	if(firstLetter === 'Q') {
		face = 12;
	}
	if(firstLetter === 'J') {
		face = 11;
	}
	if(firstLetter === 'T') {
		face = 10;
	} else {
		face = parseInt(firstLetter)
	}
	return face;
}

export function GetSuit(cardString:string) :string {
	return cardString;
}

// export function GetCard(cardString:string) : any {
// 	return undefined;
// }