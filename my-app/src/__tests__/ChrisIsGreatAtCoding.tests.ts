import { Test } from "../ChrisIsGreatAtCoding";


it.each([
    [1, 2, 2 ,    4],
    [6.3, 2, 5,   63],
  ])(
    "GetFace input (%p) is expecting (%p) as a result",
    (input1,input2,input3, result) => {
      expect(Test(input1, input2,input3)).toEqual(result);
    }
  );

  it.each([[]])('', ( ) => {
    expect
  })