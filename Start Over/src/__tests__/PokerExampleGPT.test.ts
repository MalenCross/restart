import { calculateHandValue, determineWinner } from '../PokerExampleGPT'; // Import functions to be tested

// Test suite for calculateHandValue function
describe('calculateHandValue', () => {
  it('should correctly calculate the total value of a poker hand', () => {
    // Test input
    const pokerHand = '2H 3D 4S 5C 6H';

    // Expected output
    const expected = 20;

    // Call the function to be tested
    const result = calculateHandValue(pokerHand);

    // Expect the result to match the expected output
    expect(result).toEqual(expected);
  });

  it('should handle invalid card formats', () => {
    // Test input with an invalid card format ('XZ')
    const pokerHand = '2H 3D 4S XZ 6H';

    // Expected output: totalValue should be 0 due to invalid card format
    const expected = 0;

    const result = calculateHandValue(pokerHand);

    expect(result).toEqual(expected);
  });
});




// Test suite for determineWinner function
describe('determineWinner', () => {
  it('should correctly determine the winner between two poker hands', () => {
    // Test inputs
    const hand1 = '2H 3D 4S 5C 7H';
    const hand2 = '2S 3H 4D 5C 6S';

    // console.log("Hello, world!")

    // Expected output: Hand 1 wins because its total value (20) is greater than Hand 2's (20)
    const expected = 'Hand 1 wins';

    // Call the function to be tested
    const result = determineWinner(hand1, hand2);

    // Expect the result to match the expected output
    expect(result).toEqual(expected);
  });

  

  it('should handle a tie', () => {
    // Test inputs with hands of the same total value
    const hand1 = '2H 3D 4S 5C 6H';
    const hand2 = '2S 3H 4D 5C 6S';

    // Expected output: It's a tie because both hands have the same total value (20)
    const expected = 'It\'s a tie';

    const result = determineWinner(hand1, hand2);

    expect(result).toEqual(expected);
  });
});
