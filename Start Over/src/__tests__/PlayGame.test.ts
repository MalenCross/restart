import { PlayGame } from "../PokerJudging";








test('play game', () => {
    expect(PlayGame("2H TS AC AS 7D - 2H TS 9C AD 7D")).toBe("Player 1 Wins");
});