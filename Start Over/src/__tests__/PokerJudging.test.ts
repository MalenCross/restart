import { JudgeWinner, PlayGame, PrintWinner } from "../PokerJudging";
import { HandType } from "../Detection";

//                PlayGame(string):string
//         /       /           |        \
// Parsing    Detecting    Judging    Printing
// GetHand    DetectHand    JudgeWinner    PrintWinner
// string  -> Hand      -> HandType -> number   -> string


test('judging winner', () => {
    expect(JudgeWinner(HandType.Pair, HandType.HighCard)).toBe(1);
    expect(JudgeWinner(HandType.HighCard, HandType.Pair)).toBe(2);
});

test('print winner', () => {
    expect(PrintWinner(1)).toBe("Player 1 Wins");
    expect(PrintWinner(2)).toBe("Player 2 Wins");
});


test('play game', () => {
    expect(PlayGame("2H TS AC AS 7D - 2H TS 9C AD 7D")).toBe("Player 1 Wins");
});
