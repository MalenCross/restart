
type TotalTaxLoad = {

    incomeTaxes: TaxInfo
    totalFicaTaxes:TaxInfo
    socialSecurityTaxes: TaxInfo
    medicareTaxes: TaxInfo
    }
    
    type TaxInfo = {
    taxesOwed: number,
    marginalTaxRate: number,
    efectiveTaxRate : number   
}

type TaxBracketInfo = {
    taxesOwed: number,
    marginalTaxRate: number,  
}

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

enum FicaTaxRate {
    TotalFicaTaxRate = .0765,
    SocialSecurityTaxRate = .062,
    MedicareTaxRate = .0145
}


export function StanderdDeduction(netW2 : number) : number{

    let grossW2 = netW2 - 12950;

    if (grossW2 < 0) {
        grossW2 = 0
    }
    return grossW2
}

export function EfectiveTaxRate(taxes: number, netW2: number): number {


    let efectiveTaxRate = taxes / netW2
    efectiveTaxRate = parseFloat(efectiveTaxRate.toFixed(3));

    if (taxes === 0) {
        efectiveTaxRate = 0
    }
    return efectiveTaxRate
}

//  functon that Received gross W-2 information, and outputs
//  the total tax due, marginal, tax rate, and effective tax rate

export function W2Tax(grossWithoutD: number): TaxInfo   {


    // bracetTax refrences the BracketTax function that return an array of arrays that hold
    //  the taxes for that brackt and that bracket's tax rate.

    const bracketTax = BracketTax(grossWithoutD)


    // sunfOfAllTexes adds up the vales of taxesForThisBracket in each array in bracketTax

    const sumOfAllTaxes = bracketTax.reduce((acc, curr) => acc + curr.taxesOwed, 0);


    // marginalTaxRate gets the last marginalTaxRate value from the bracketTax array

    let marginalTaxrateUnparsed = bracketTax.map(bracket => bracket.marginalTaxRate)

    const marginalTaxRate = marginalTaxrateUnparsed[marginalTaxrateUnparsed.length - 1]


    // efectiveTaxRate gets what the sumOfAllTaxes is divided by 0 
    // if sumOfAllTaxes is 0 then efectiveTaxRate is 0

    let efectiveTaxRate = EfectiveTaxRate(sumOfAllTaxes,grossWithoutD)

    


    // return all three's results as an array

    return {taxesOwed:sumOfAllTaxes, marginalTaxRate: marginalTaxRate, efectiveTaxRate : efectiveTaxRate}
}


//  functon that Received gross W-2 information, and outputs an array of arrays 
//  that hold the taxes for that brackt and that bracket's tax rate.

export function BracketTax(grossWithoutD: number): TaxBracketInfo [] {


    // subtracts the standerd deduction for single file and is set to 0 if - number

    let grossw2 = StanderdDeduction(grossWithoutD);



    // creates varible for result of the loop to be pushed in to

    let result: TaxBracketInfo [] = [];


    // for loop that loops over each TaxBracket inside of TaxRates 

    for (let i = 0; i < TaxRates.length; i++) {

        let bracket = TaxRates[i];


        // Calculates the taxes for the final bracket the income falls in
        // and pushes results as an array with taxesForThisBracket and the bracket tax rate 
        // pushes in to results

        if (grossw2 <= bracket.max && grossw2 >= bracket.min) {

            let taxesForThisBracket = (grossw2 - bracket.min) * bracket.rate;
            taxesForThisBracket = parseFloat(taxesForThisBracket.toFixed(2));

            result.push({taxesOwed: taxesForThisBracket, marginalTaxRate: bracket.rate});

            break


        } else {

            // calculates texes for the last TaxBracket in TaxRates
            // pushes to results

            if (i === 6) {
                let taxesForThisBracket = (grossw2 - bracket.min) * bracket.rate;
                taxesForThisBracket = parseFloat(taxesForThisBracket.toFixed(2));

                result.push({taxesOwed: taxesForThisBracket, marginalTaxRate: bracket.rate});
            }


            // Calculates max taxes for looped bracket if grossw2 exceeds bracket max
            // pushes max possible taxes for that bracket and the marginal tax rate to results

            else {
                let taxesForThisBracket = (bracket.max - bracket.min) * bracket.rate;
                taxesForThisBracket = parseFloat(taxesForThisBracket.toFixed(2));

                result.push({taxesOwed: taxesForThisBracket, marginalTaxRate: bracket.rate});
            }
        }
    }

    return result;
}


// fica tax





export function TotalFicaTax(netW2: number): number[] {


    let ficaTax = SocialSTax(netW2)[0] + MedicareTax(netW2)[0]
    ficaTax = parseFloat(ficaTax.toFixed(2));

    let efectiveTaxRate = EfectiveTaxRate(ficaTax, netW2)



    return [ficaTax, FicaTaxRate.TotalFicaTaxRate, efectiveTaxRate]

}

export function SocialSTax(netW2: number): number[] {

    let adjustedGrossIncome = StanderdDeduction(netW2)

    if (adjustedGrossIncome < 0) {
        adjustedGrossIncome = 0
    }
    if (adjustedGrossIncome > 160200) {
        adjustedGrossIncome = 160200
    }
    let ssTax = adjustedGrossIncome * FicaTaxRate.SocialSecurityTaxRate
    ssTax = parseFloat(ssTax.toFixed(2));


    let effectiveTaxeRate = EfectiveTaxRate(ssTax, netW2)

    return [ssTax, FicaTaxRate.SocialSecurityTaxRate, effectiveTaxeRate]


}

export function MedicareTax(netW2: number): number[] {
    
    let adjustedGrossIncome = StanderdDeduction(netW2)

    if (adjustedGrossIncome < 0) {
        adjustedGrossIncome = 0
    }

    let medTax = adjustedGrossIncome * FicaTaxRate.MedicareTaxRate
    medTax = parseFloat(medTax.toFixed(2));

    let effectiveTaxeRate = EfectiveTaxRate(medTax, netW2)

    return [medTax, FicaTaxRate.MedicareTaxRate, effectiveTaxeRate]
}

export function TotalTax(netW2: number): number[] {
    let incomTax = W2Tax(netW2)
    let ficaTax = TotalFicaTax(netW2)
    let totalTax = (incomTax.taxesOwed + ficaTax[0])
    totalTax = parseFloat(totalTax.toFixed(2));
    
    let efectiveTaxRate = EfectiveTaxRate(totalTax, netW2)

    return [totalTax, efectiveTaxRate]
}
