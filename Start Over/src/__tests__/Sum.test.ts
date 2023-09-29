import { GetCard, Sum, Div, SumOfSquares, Greeting, GetFirst, GetFace, GetSuit, Card} from "../Sum.ts";
test('Sum(1,2) = 3', () => {
  let result = Sum(1, 2);
  expect(result).toBe(3)
})
test('div(8,2) = 4', () => {
  let result = Div(8, 2);
  expect(result).toBe(4)
})

 test('SumOfSquares(2, 4) = 18', () => {
   let result = SumOfSquares(2, 4);
   expect(result).toBe(20)
 })

 test('Greeting("Malen") = "Hello Malen"', () => {
  let result =  Greeting("Malen");
  expect(result).toBe("Hello Malen")
})
test('get the first element from an array', () => {
    let result = GetFirst([5,2,3,4]);
    expect(result).toBe(5)
  })
  
  // winner("2H 4D 5S 8C 9C", "4H 4S 5D 8S 9H") ->  "Player 2 Wins - Pair of fours"
  
  test('get the face value from a poker card', () => {
    expect(GetFace("2H")).toBe(2);
    expect(GetFace("3H")).toBe(3);
    expect(GetFace("5H")).toBe(5);
    expect(GetFace("TH")).toBe(10);
    expect(GetFace("JS")).toBe(11);
    expect(GetFace("QH")).toBe(12);
    expect(GetFace("KH")).toBe(13);
    expect(GetFace("AS")).toBe(14)
  });
  
  test('get the suit from a poker card', () => {
    expect(GetSuit("2H")).toBe('hearts');
    expect(GetSuit("2S")).toBe('spades');
    expect(GetSuit("2C")).toBe('clubs');
    expect(GetSuit("2D")).toBe('diamonds');
    expect(GetSuit("2F")).toBe('not a valid suit');
  })
  
  test('get the card from a poker card string', () => {
    let card = GetCard("2H")
    expect(card.suit).toBe('hearts');
    expect(card.face).toBe(2);
  })

  // FUNCTION_NAME()   <= call a function
  // FUNCTION_NAME(2, 3)   <= call a function and pass the function numbers 2 and 3
  // FUNCTION_NAME("5S")   <= call a function and pass the function "5S"
  test('get a different card from a poker card string', () => {
    let c : Card = GetCard("5S")
    expect(c.suit).toBe('spades');
    expect(c.face).toBe(5);
    let d : Card = GetCard('TH')
    expect (d.suit).toBe('hearts')
    expect (d.face).toBe(10)
    let e : Card = GetCard('QD')
    expect (e.suit).toBe('diamonds')
    expect (e.face).toBe(12)
  })

  // test('get a different card from a poker card string', () => {
  //   let hand = GetHand(["5S", "2H", "QD", 'AC', 'KS'])
    // expect(hand[0].suit).toBe('spades');
    // expect(hand[0].face).toBe(5);
    // expect(hand[1].suit).toBe('hearts');
    // expect(hand[1].face).toBe(2);
    // expect(hand[2].suit).toBe('diamonds');
    // expect(hand[2].face).toBe(12);

  // })

  // test('get a different card from a poker card string', () => {
  //   let hand = GetHandFromString("5S 2H QD AC KS")

  // })