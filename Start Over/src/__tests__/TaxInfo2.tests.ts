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
    expect(TotalFicaTax(9345)).toEqual({"efectiveTaxRate": 0, "marginalTaxRate": 0.0765, "taxesOwed": 0});
    expect(TotalFicaTax(30000)).toEqual( {"efectiveTaxRate": 0.043, "marginalTaxRate": 0.0765, "taxesOwed": 1304.33});
    expect(TotalFicaTax(75000)).toEqual({"efectiveTaxRate": 0.063, "marginalTaxRate": 0.0765, "taxesOwed": 4746.83});
    expect(TotalFicaTax(150000)).toEqual({"efectiveTaxRate": 0.07, "marginalTaxRate": 0.0765, "taxesOwed": 10484.33});
    expect(TotalFicaTax(200000)).toEqual( {"efectiveTaxRate": 0.063, "marginalTaxRate": 0.0765, "taxesOwed": 12644.63});
    expect(TotalFicaTax(500000)).toEqual({"efectiveTaxRate": 0.034, "marginalTaxRate": 0.0765, "taxesOwed": 16994.63});
    expect(TotalFicaTax(750000)).toEqual({"efectiveTaxRate": 0.027, "marginalTaxRate": 0.0765, "taxesOwed": 20619.63});
    expect(TotalFicaTax(1000000)).toEqual({"efectiveTaxRate": 0.024, "marginalTaxRate": 0.0765, "taxesOwed": 24244.63});
    expect(TotalFicaTax(1500000)).toEqual({"efectiveTaxRate": 0.021, "marginalTaxRate": 0.0765, "taxesOwed": 31494.63});
    expect(TotalFicaTax(10000000)).toEqual({"efectiveTaxRate": 0.015, "marginalTaxRate": 0.0765, "taxesOwed": 154744.63});
});

test(' for social secerity tax get taxes owed, marginal tax rate, efective tax rate', () => {
    expect(SocialSTax(9345)).toEqual({"efectiveTaxRate": 0, "marginalTaxRate": 0.062, "taxesOwed": 0});
    expect(SocialSTax(30000)).toEqual({"efectiveTaxRate": 0.035, "marginalTaxRate": 0.062, "taxesOwed": 1057.1});
    expect(SocialSTax(75000)).toEqual({"efectiveTaxRate": 0.051, "marginalTaxRate": 0.062, "taxesOwed": 3847.1});
    expect(SocialSTax(150000)).toEqual({"efectiveTaxRate": 0.057, "marginalTaxRate": 0.062, "taxesOwed": 8497.1});
    expect(SocialSTax(200000)).toEqual({"efectiveTaxRate": 0.05, "marginalTaxRate": 0.062, "taxesOwed": 9932.4});
    expect(SocialSTax(500000)).toEqual({"efectiveTaxRate": 0.02, "marginalTaxRate": 0.062, "taxesOwed": 9932.4});
    
});

test(' for medicare tax get taxes owed, marginal tax rate, efective tax rate', () => {
    expect(MedicareTax(9345)).toEqual({"efectiveTaxRate": 0, "marginalTaxRate": 0.0145, "taxesOwed": 0});
    expect(MedicareTax(30000)).toEqual({"efectiveTaxRate": 0.008, "marginalTaxRate": 0.0145, "taxesOwed": 247.23});
    expect(MedicareTax(75000)).toEqual({"efectiveTaxRate": 0.012, "marginalTaxRate": 0.0145, "taxesOwed": 899.73});
   
});

test(' w2tax get taxes owed, marginal tax rate, efective tax rate', () => {
    expect(TotalTax(9345)).toEqual( {"efectiveTaxRate": 0, "taxesOwed": 0});
    expect(TotalTax(30000)).toEqual({"efectiveTaxRate": 0.105, "taxesOwed": 3144.71});
    expect(TotalTax(75000)).toEqual({"efectiveTaxRate": 0.187, "taxesOwed": 14014.49});
    expect(TotalTax(150000)).toEqual({"efectiveTaxRate": 0.248, "taxesOwed": 37211.25});
    expect(TotalTax(200000)).toEqual({"efectiveTaxRate": 0.264, "taxesOwed": 52731.23});
    expect(TotalTax(500000)).toEqual({"efectiveTaxRate": 0.322, "taxesOwed": 161213.88});
    expect(TotalTax(750000)).toEqual({"efectiveTaxRate": 0.342, "taxesOwed": 256281.51});
    expect(TotalTax(1000000)).toEqual({"efectiveTaxRate": 0.352, "taxesOwed": 352406.51});
    expect(TotalTax(1500000)).toEqual({"efectiveTaxRate": 0.363, "taxesOwed": 544656.51});
    expect(TotalTax(10000000)).toEqual({"efectiveTaxRate": 0.381, "taxesOwed": 3812906.51});
});