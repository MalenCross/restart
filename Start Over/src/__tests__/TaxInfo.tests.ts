import { TaxRate10, TaxRate12, TaxRate22, TaxRate24, TaxRate32, TaxRate35, TaxRate37, W2Taxes } from "../TaxInfo";

test(' get taxes owed, marginal tax rate, efective tax rate', () => {
    expect(W2Taxes(9345)).toEqual([0, .10, 0]);
    expect(W2Taxes(30000)).toEqual([1840.40, .12, .06]);
    expect(W2Taxes(75000)).toEqual([9267.68, .22, .12]);
    expect(W2Taxes(150000)).toEqual([26726.94, .24, .18]);
    expect(W2Taxes(200000)).toEqual([40086.62, .32, .20]);
    expect(W2Taxes(500000)).toEqual([144219.27, .35, .29]);
    expect(W2Taxes(750000)).toEqual([235661.9, .37, .31]);
    expect(W2Taxes(1000000)).toEqual([328161.9, .37, .33]);
    expect(W2Taxes(1500000)).toEqual([513161.9, .37, .34]);
    expect(W2Taxes(10000000)).toEqual([3658161.9, .37, .37]);
});


test(' get taxes owed, marginal tax rate, efective tax rate', () => {
    expect(TaxRate10(9345)).toEqual([934.5, .1]);
    expect(TaxRate10(10275)).toEqual([1027.5, .1]);
    expect(TaxRate10(1000000)).toEqual([1027.5, 0]);
});

test(' get taxes owed, marginal tax rate, efective tax rate', () => {
    expect(TaxRate12(9345)).toEqual([0, 0]);
    expect(TaxRate12(15986)).toEqual([685.2, .12]);
    expect(TaxRate12(41775)).toEqual([3779.9, .12]);
    expect(TaxRate12(60000)).toEqual([3779.9, 0]);
});

test(' get taxes owed, marginal tax rate, efective tax rate', () => {
    expect(TaxRate22(30000)).toEqual([0, 0]);
    expect(TaxRate22(70000)).toEqual([6209.28, .22]);
    expect(TaxRate22(89075)).toEqual([10405.78, .22]);
    expect(TaxRate22(100000)).toEqual([10405.78, 0]);
});

test(' get taxes owed, marginal tax rate, efective tax rate', () => {
    expect(TaxRate24(30000)).toEqual([0, 0]);
    expect(TaxRate24(90000)).toEqual([221.76, .24]);
    expect(TaxRate24(170050)).toEqual([19433.76, .24]);
    expect(TaxRate24(1000000)).toEqual([19433.76, 0]);
});


test(' get taxes owed, marginal tax rate, efective tax rate', () => {
    expect(TaxRate32(30000)).toEqual([0, 0]);
    expect(TaxRate32(180000)).toEqual([3183.68, .32]);
    expect(TaxRate32(215950)).toEqual([14687.68, .32]);
    expect(TaxRate32(1000000)).toEqual([14687.68, 0]);
});

test(' get taxes owed, marginal tax rate, efective tax rate', () => {
    expect(TaxRate35(30000)).toEqual([0, 0]);
    expect(TaxRate35(220000)).toEqual([1417.15, .35]);
    expect(TaxRate35(539900)).toEqual([113382.15, .35]);
    expect(TaxRate35(1000000)).toEqual([113382.15, 0]);
});

test(' get taxes owed, marginal tax rate, efective tax rate', () => {
    expect(TaxRate37(500000)).toEqual([0, 0]);
    expect(TaxRate37(750000)).toEqual([77736.63, .37]);
    expect(TaxRate37(1000000)).toEqual([170236.63, .37]);
});
