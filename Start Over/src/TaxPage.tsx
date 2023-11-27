import React , { useState } from 'react';
import { AddEmUp } from './Helpers';

export function TaxPage() {

    const [grossIncome, setGrossIncome] = useState(55);

    console.log("grossIncome is set to: ", grossIncome);
    return (<>
        <p>Tax Stuff</p>

        <p>
            Gross Income:
            <input type="number"
                value={grossIncome}
                onChange={(e) => setGrossIncome(parseInt(e.target.value))}
            />

        </p>
        <p>
            adding stuff to it: {AddEmUp(grossIncome, 40)}
        </p>
    </>);
}