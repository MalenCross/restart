import { Face, GetFace, GetSuit, Suit } from "../newNewPoker";




it.each([
    ['TH', 10],
    ['JH', 11],
    ['QH', 12],
    ['KH', 13],
    ['2H', 2],
    ['3H', 3],
    ['4H', 4],
    ['5H', 5],
    ['6H', 6],
    ['7H', 7],
    ['9H', 9]
])('getSuit(%p) expecting %p', (input: string, result: number) => {
    expect(GetFace(input)).toBe(result)
});

// it.each([
//     ['AS', 'spades'],
//     ['AH', Suit.Hearts],
//     ['AD', Suit.Diamonds],
//     ['AC', Suit.Clubs],
// ])('getSuit(%p) expecting %p', (input: string, result: Suit ) => {
//     expect(GetSuit(input)).toBe(result)
// });