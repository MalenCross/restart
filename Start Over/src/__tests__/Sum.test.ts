import {Sum, Div, SumOfSquares, Greeting} from "../Sum.ts";
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