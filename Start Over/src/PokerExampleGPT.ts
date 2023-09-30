// Define a mapping of card faces to numeric values
const cardValues: { [key: string]: number } = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 'T': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14
  };
  
  // Function to calculate the value of a poker hand
  export function calculateHandValue(handString: string): number {
    // Split the hand string into individual card representations
    const cardArray = handString.split(' ');
  
    // Calculate the total value of the hand based on card values
    let totalValue = 0;
    for (const card of cardArray) {
      if (card.length === 2) {
        const face = card[0];
        const numericValue = cardValues[face];
        if (numericValue !== undefined) {
          totalValue += numericValue;
        }
        else {
            // Handle invalid card faces
            return 0;
          }
      }
    }
  
    return totalValue;
  
  }
  
  // Function to determine the winner between two poker hands
  export function determineWinner(hand1: string, hand2: string): string {
    const value1 = calculateHandValue(hand1);
    const value2 = calculateHandValue(hand2);
  
    if (value1 > value2) {
      return 'Hand 1 wins';
    } else if (value1 < value2) {
      return 'Hand 2 wins';
    } else {
      return 'It\'s a tie';
    }
  }
  