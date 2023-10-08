import { HandType, DetectHand, } from "./Detection";
import { GetHand, Hand } from "./PokerParsing";

export function JudgeWinner(player1: HandType, player2: HandType): number {
    if(player1 === player2){
    return 0;
}
if(player1 > player2){
    return 1
}
else {
    return 2
}
}

export function PrintWinner(winner: number): string {
    if(winner === 0){
        return 'Tie';
    }
    if(winner === 1){
        return 'Player 1 Wins'
    }
    else {
        return "Player 2 Wins"
    }
}

export function PlayGame(handstrings: string): string {
let splithands = handstrings.split(' - ');

let winner = JudgeWinner(DetectHand(GetHand(splithands[0]) as Hand) ,DetectHand(GetHand(splithands[1]) as Hand))

let winnerPrint =PrintWinner(winner)



return winnerPrint
}