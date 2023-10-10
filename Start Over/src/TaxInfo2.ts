
// creating a type of TaxBracket

type TaxBracket = {
    min: number,
    max: number
    rate: number
};


// creating taxrates that refrences an aray of TaxBrackets
// this this is the taxbracket for single Filing 

const TaxRates: TaxBracket[] = [
    { min: 0, max: 10275, rate: .10 },
    { min: 10276, max: 41775, rate: .12 },
    { min: 41776, max: 89075, rate: .22 },
    { min: 89076, max: 170050, rate: .24 },
    { min: 170051, max: 215950, rate: .32 },
    { min: 215951, max: 539900, rate: .35 },
    { min: 539901, max: 0, rate: .37 }
];


//  functon that Received gross W-2 information, and outputs
//  the total tax due, marginal, tax rate, and effective tax rate

export function W2Tax(grossWithoutD: number): number[] {


    // bracetTax refrences the BracketTax function that return an array of arrays that hold
    //  the taxes for that brackt and that bracket's tax rate.

    const bracketTax = BracketTax(grossWithoutD)


    // sunfOfAllTexes adds up the vales of taxesForThisBracket in each array in bracketTax

    const sumOfAllTaxes = bracketTax.reduce((acc, curr) => acc + curr[0], 0);


    // marginalTaxRate gets the last marginalTaxRate value from the bracketTax array

    let marginalTaxrateUnparsed = bracketTax.map(bracket => bracket[1])

    const marginalTaxRate = marginalTaxrateUnparsed[marginalTaxrateUnparsed.length - 1]


    // efectiveTaxRate gets what the sumOfAllTaxes is divided by 0 
    // if sumOfAllTaxes is 0 then efectiveTaxRate is 0

    let efectiveTaxRate = 0

    if (sumOfAllTaxes === 0) {
    }
    else {
        efectiveTaxRate = sumOfAllTaxes / grossWithoutD
        efectiveTaxRate = parseFloat(efectiveTaxRate.toFixed(2));
    }


    // return all three's results as an array

    return [sumOfAllTaxes, marginalTaxRate, efectiveTaxRate]
}


//  functon that Received gross W-2 information, and outputs an array of arrays 
//  that hold the taxes for that brackt and that bracket's tax rate.

export function BracketTax(grossWithoutD: number): number[][] {


    // subtracts the standerd deduction for single file and is set to 0 if - number

    let grossw2 = grossWithoutD - 12950;

    if (grossw2 < 0) {
        grossw2 = 0
    }


    // creates varible for result of the loop to be pushed in to

    let result: number[][] = [];


    // for loop that loops over each TaxBracket inside of TaxRates 

    for (let i = 0; i < TaxRates.length; i++) {

        let bracket = TaxRates[i];


        // Calculates the taxes for the final bracket the income falls in
        // and pushes results as an array with taxesForThisBracket and the bracket tax rate 
        // pushes in to results

        if (grossw2 <= bracket.max && grossw2 >= bracket.min) {

            let taxesForThisBracket = (grossw2 - bracket.min) * bracket.rate;
            taxesForThisBracket = parseFloat(taxesForThisBracket.toFixed(2));

            result.push([taxesForThisBracket, bracket.rate]);

            break


        } else {

            // calculates texes for the last TaxBracket in TaxRates
            // pushes to results

            if (i === 6) {
                let taxesForThisBracket = (grossw2 - bracket.min) * bracket.rate;
                taxesForThisBracket = parseFloat(taxesForThisBracket.toFixed(2));
                result.push([taxesForThisBracket, bracket.rate]);
            }


            // Calculates max taxes for looped bracket if grossw2 exceeds bracket max
            // pushes max possible taxes for that bracket and the marginal tax rate to results

            else {
                let taxesForThisBracket = (bracket.max - bracket.min) * bracket.rate;
                taxesForThisBracket = parseFloat(taxesForThisBracket.toFixed(2));
                result.push([taxesForThisBracket, bracket.rate]);
            }
        }
    }

    return result;
}
