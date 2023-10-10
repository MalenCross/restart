

type TaxBracket = {
    min: number,
    max: number
    rate: number
};

const TaxRates: TaxBracket[] = [
    { min: 0, max: 10275, rate: .10 },
    { min: 10276, max: 41775, rate: .12 },
    { min: 41776, max: 89075, rate: .22 },
    { min: 89076, max: 170050, rate: .24 },
    { min: 170051, max: 215950, rate: .32 },
    { min: 215951, max: 539900, rate: .35 },
    { min: 539901, max: 0, rate: .37 }
];

export function TaxRate10(grossw2: number): [number, number] {
    if (grossw2 >= TaxRates[0].min && grossw2 <= TaxRates[0].max) {
        let taxesowed = (grossw2 - TaxRates[0].min) * TaxRates[0].rate

        return [taxesowed, TaxRates[0].rate]
    }
    return [1027.5, 0]
}

export function TaxRate12(grossw2: number): [number, number] {
    if (grossw2 < TaxRates[1].min) {
        return [0, 0]
    }
    if (grossw2 >= TaxRates[1].min && grossw2 <= TaxRates[1].max) {
        let taxesowed = (grossw2 - TaxRates[1].min) * TaxRates[1].rate
        taxesowed = parseFloat(taxesowed.toFixed(1));

        return [taxesowed, TaxRates[1].rate]
    }
    else {
        return [3779.9, 0]
    }
}

export function TaxRate22(grossw2: number): [number, number] {
    if (grossw2 < TaxRates[2].min) {
        return [0, 0]
    }
    if (grossw2 >= TaxRates[2].min && grossw2 <= TaxRates[2].max) {
        let taxesowed = (grossw2 - TaxRates[2].min) * TaxRates[2].rate
        taxesowed = parseFloat(taxesowed.toFixed(2));

        return [taxesowed, TaxRates[2].rate]
    }
    else {
        return [10405.78, 0]
    }
}

export function TaxRate24(grossw2: number): [number, number] {
    if (grossw2 < TaxRates[3].min) {
        return [0, 0]
    }
    if (grossw2 >= TaxRates[3].min && grossw2 <= TaxRates[3].max) {
        let taxesowed = (grossw2 - TaxRates[3].min) * TaxRates[3].rate
        taxesowed = parseFloat(taxesowed.toFixed(2));

        return [taxesowed, TaxRates[3].rate]
    }
    else {
        return [19433.76, 0]
    }
}

export function TaxRate32(grossw2: number): [number, number] {
    if (grossw2 < TaxRates[4].min) {
        return [0, 0]
    }
    if (grossw2 >= TaxRates[4].min && grossw2 <= TaxRates[4].max) {
        let taxesowed = (grossw2 - TaxRates[4].min) * TaxRates[4].rate
        taxesowed = parseFloat(taxesowed.toFixed(2));

        return [taxesowed, TaxRates[4].rate]
    }
    else {
        return [14687.68, 0]
    }
}

export function TaxRate35(grossw2: number): [number, number] {
    if (grossw2 < TaxRates[5].min) {
        return [0, 0]
    }
    if (grossw2 >= TaxRates[5].min && grossw2 <= TaxRates[5].max) {
        let taxesowed = (grossw2 - TaxRates[5].min) * TaxRates[5].rate
        taxesowed = parseFloat(taxesowed.toFixed(2));

        return [taxesowed, TaxRates[5].rate]
    }
    else {
        return [113382.15, 0]
    }
}

export function TaxRate37(grossw2: number): [number, number] {
    if (grossw2 < TaxRates[6].min) {
        return [0, 0]
    }
    else {
        let taxesowed = (grossw2 - TaxRates[6].min) * TaxRates[6].rate
        taxesowed = parseFloat(taxesowed.toFixed(2));

        return [taxesowed, TaxRates[6].rate]
    }

}






export function W2Taxes(grossWithoutD: number): [number, number, number] {

    let grossW2 = grossWithoutD - 12950
    if( grossW2 < 0){
        grossW2 = 0
    }
    let taxtotal = TaxRate10(grossW2)[0] + TaxRate12(grossW2)[0] + TaxRate22(grossW2)[0] + TaxRate24(grossW2)[0] + TaxRate32(grossW2)[0] + TaxRate35(grossW2)[0] + TaxRate37(grossW2)[0]

    taxtotal = parseFloat(taxtotal.toFixed(2));

    let marginalTaxRarte = [TaxRate10(grossW2)[1], TaxRate12(grossW2)[1], TaxRate22(grossW2)[1], TaxRate24(grossW2)[1], TaxRate32(grossW2)[1], TaxRate35(grossW2)[1], TaxRate37(grossW2)[1]]
    let count = 0
    for (let i of marginalTaxRarte) {

        if (i === 0) {
            count++
        }
        else {
            break
        }
    }
    // console.log(count)
    let efectiveTaxRate = 0
    if( taxtotal === 0){
       efectiveTaxRate = 0
    }
    else{efectiveTaxRate = taxtotal / grossWithoutD
    efectiveTaxRate = parseFloat(efectiveTaxRate.toFixed(2));
    }

    // console.log(taxtotal)
    // console.log(efectiveTaxRate)
    return [taxtotal, TaxRates[count].rate, efectiveTaxRate]
}