import { BracketTax,MedicareTax,SocialSTax,TotalFicaTax,TotalTax,W2Tax } from "../TaxInfo2";



test(' w2tax get taxes owed, marginal tax rate, efective tax rate', () => {
    expect(W2Tax(9345)).toEqual({"efectiveTaxRate": 0, "marginalTaxRate": 0.1, "taxesOwed": 0});
    expect(W2Tax(30000)).toEqual({"efectiveTaxRate": 0.061, "marginalTaxRate": 0.12, "taxesOwed": 1840.38});
    expect(W2Tax(75000)).toEqual({"efectiveTaxRate": 0.124, "marginalTaxRate": 0.22, "taxesOwed": 9267.66});
    expect(W2Tax(150000)).toEqual({"efectiveTaxRate": 0.178, "marginalTaxRate": 0.24, "taxesOwed": 26726.92});
    expect(W2Tax(200000)).toEqual({"efectiveTaxRate": 0.2, "marginalTaxRate": 0.32, "taxesOwed": 40086.6});
    expect(W2Tax(500000)).toEqual({"efectiveTaxRate": 0.288, "marginalTaxRate": 0.35, "taxesOwed": 144219.25});
    expect(W2Tax(750000)).toEqual({"efectiveTaxRate": 0.314, "marginalTaxRate": 0.37, "taxesOwed": 235661.88});
    expect(W2Tax(1000000)).toEqual({"efectiveTaxRate": 0.328, "marginalTaxRate": 0.37, "taxesOwed": 328161.88});
    expect(W2Tax(1500000)).toEqual({"efectiveTaxRate": 0.342, "marginalTaxRate": 0.37, "taxesOwed": 513161.88});
    expect(W2Tax(10000000)).toEqual({"efectiveTaxRate": 0.366, "marginalTaxRate": 0.37, "taxesOwed": 3658161.88});
});

test(' get taxes owed, marginal tax rate, efective tax rate for each bracket', () => {
    expect(BracketTax(9345)).toEqual([{"marginalTaxRate": 0.1, "taxesOwed": 0}]);
    expect(BracketTax(30000)).toEqual([{"marginalTaxRate": 0.1, "taxesOwed": 1027.5}, {"marginalTaxRate": 0.12, "taxesOwed": 812.88}]);
    expect(BracketTax(75000)).toEqual([{"marginalTaxRate": 0.1, "taxesOwed": 1027.5}, {"marginalTaxRate": 0.12, "taxesOwed": 3779.88}, {"marginalTaxRate": 0.22, "taxesOwed": 4460.28}]);
    expect(BracketTax(150000)).toEqual([{"marginalTaxRate": 0.1, "taxesOwed": 1027.5}, {"marginalTaxRate": 0.12, "taxesOwed": 3779.88}, {"marginalTaxRate": 0.22, "taxesOwed": 10405.78}, {"marginalTaxRate": 0.24, "taxesOwed": 11513.76}]);
    expect(BracketTax(200000)).toEqual([{"marginalTaxRate": 0.1, "taxesOwed": 1027.5}, {"marginalTaxRate": 0.12, "taxesOwed": 3779.88}, {"marginalTaxRate": 0.22, "taxesOwed": 10405.78}, {"marginalTaxRate": 0.24, "taxesOwed": 19433.76}, {"marginalTaxRate": 0.32, "taxesOwed": 5439.68}]);
    expect(BracketTax(500000)).toEqual([{"marginalTaxRate": 0.1, "taxesOwed": 1027.5}, {"marginalTaxRate": 0.12, "taxesOwed": 3779.88}, {"marginalTaxRate": 0.22, "taxesOwed": 10405.78}, {"marginalTaxRate": 0.24, "taxesOwed": 19433.76}, {"marginalTaxRate": 0.32, "taxesOwed": 14687.68}, {"marginalTaxRate": 0.35, "taxesOwed": 94884.65}]);
    expect(BracketTax(750000)).toEqual([{"marginalTaxRate": 0.1, "taxesOwed": 1027.5}, {"marginalTaxRate": 0.12, "taxesOwed": 3779.88}, {"marginalTaxRate": 0.22, "taxesOwed": 10405.78}, {"marginalTaxRate": 0.24, "taxesOwed": 19433.76}, {"marginalTaxRate": 0.32, "taxesOwed": 14687.68}, {"marginalTaxRate": 0.35, "taxesOwed": 113382.15}, {"marginalTaxRate": 0.37, "taxesOwed": 72945.13}]);
    expect(BracketTax(1000000)).toEqual([{"marginalTaxRate": 0.1, "taxesOwed": 1027.5}, {"marginalTaxRate": 0.12, "taxesOwed": 3779.88}, {"marginalTaxRate": 0.22, "taxesOwed": 10405.78}, {"marginalTaxRate": 0.24, "taxesOwed": 19433.76}, {"marginalTaxRate": 0.32, "taxesOwed": 14687.68}, {"marginalTaxRate": 0.35, "taxesOwed": 113382.15}, {"marginalTaxRate": 0.37, "taxesOwed": 165445.13}]);
    expect(BracketTax(1500000)).toEqual([{"marginalTaxRate": 0.1, "taxesOwed": 1027.5}, {"marginalTaxRate": 0.12, "taxesOwed": 3779.88}, {"marginalTaxRate": 0.22, "taxesOwed": 10405.78}, {"marginalTaxRate": 0.24, "taxesOwed": 19433.76}, {"marginalTaxRate": 0.32, "taxesOwed": 14687.68}, {"marginalTaxRate": 0.35, "taxesOwed": 113382.15}, {"marginalTaxRate": 0.37, "taxesOwed": 350445.13}]);
    expect(BracketTax(10000000)).toEqual([{"marginalTaxRate": 0.1, "taxesOwed": 1027.5}, {"marginalTaxRate": 0.12, "taxesOwed": 3779.88}, {"marginalTaxRate": 0.22, "taxesOwed": 10405.78}, {"marginalTaxRate": 0.24, "taxesOwed": 19433.76}, {"marginalTaxRate": 0.32, "taxesOwed": 14687.68}, {"marginalTaxRate": 0.35, "taxesOwed": 113382.15}, {"marginalTaxRate": 0.37, "taxesOwed": 3495445.13}]);
});

test('for total fica tax get taxes owed, marginal tax rate, efective tax rate', () => {
    expect(TotalFicaTax(9345)).toEqual([0, 0.0765, 0]);
    expect(TotalFicaTax(30000)).toEqual([1304.33, 0.0765, 0.043]);
    expect(TotalFicaTax(75000)).toEqual([4746.83, 0.0765, 0.063]);
    expect(TotalFicaTax(150000)).toEqual([10484.33, 0.0765, 0.07]);
    expect(TotalFicaTax(200000)).toEqual([12644.63, 0.0765, 0.063]);
    expect(TotalFicaTax(500000)).toEqual([16994.63, 0.0765, 0.034]);
    expect(TotalFicaTax(750000)).toEqual([20619.63, 0.0765, 0.027]);
    expect(TotalFicaTax(1000000)).toEqual([24244.63, 0.0765, 0.024]);
    expect(TotalFicaTax(1500000)).toEqual([31494.63, 0.0765, 0.021]);
    expect(TotalFicaTax(10000000)).toEqual([154744.63, 0.0765, 0.015]);
});

test(' for social secerity tax get taxes owed, marginal tax rate, efective tax rate', () => {
    expect(SocialSTax(9345)).toEqual([0, 0.062, 0]);
    expect(SocialSTax(30000)).toEqual([1057.1, 0.062, 0.035]);
    expect(SocialSTax(75000)).toEqual([3847.1, 0.062, 0.051]);
    expect(SocialSTax(150000)).toEqual([8497.1, 0.062, 0.057]);
    expect(SocialSTax(200000)).toEqual([9932.4, 0.062, 0.05]);
    expect(SocialSTax(500000)).toEqual([9932.4, 0.062, 0.02]);
    
});

test(' for medicare tax get taxes owed, marginal tax rate, efective tax rate', () => {
    expect(MedicareTax(9345)).toEqual([0, 0.0145, 0]);
    expect(MedicareTax(30000)).toEqual([247.23, 0.0145, 0.008]);
    expect(MedicareTax(75000)).toEqual([899.73, 0.0145, 0.012]);
   
});

test(' w2tax get taxes owed, marginal tax rate, efective tax rate', () => {
    expect(TotalTax(9345)).toEqual([0, 0]);
    expect(TotalTax(30000)).toEqual([3144.71, 0.105]);
    expect(TotalTax(75000)).toEqual([14014.49, 0.187]);
    expect(TotalTax(150000)).toEqual([37211.25, 0.248]);
    expect(TotalTax(200000)).toEqual([52731.23, 0.264]);
    expect(TotalTax(500000)).toEqual([161213.88, 0.322]);
    expect(TotalTax(750000)).toEqual([256281.51, 0.342]);
    expect(TotalTax(1000000)).toEqual([352406.51, 0.352]);
    expect(TotalTax(1500000)).toEqual([544656.51, 0.363]);
    expect(TotalTax(10000000)).toEqual([3812906.51, 0.381]);
});