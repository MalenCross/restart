import React, { useState } from 'react';
import { AllTaxes } from './TaxInfo2';
import './App.css';

export function TaxPage() {

    const [grossIncome, setGrossIncome] = useState(0);

    const taxinfo = AllTaxes(grossIncome);

    return (< div className='App-header' >
        
            <p >Tax Stuff</p>

            <p >
                Gross Income:
                <div>
                    <input type="number"
                        value={grossIncome}
                        onChange={(e) => setGrossIncome(parseInt(e.target.value))}
                    />
                </div>
                <button onClick={() => setGrossIncome(grossIncome + 1000)}>
                    Add One Thousand
                </button>
            </p>
        
        <p>
            <div>
               <p> Take Home Pay </p>
                {taxinfo.takeHomePay}
                 </div> 
        </p>
        <p>
            <table>
                <tr>
                    <th>Type</th>
                    <th>Taxes Owed   </th>
                    <th>Marginal Tax Rate   </th>
                    <th>Effective Tax Rate   </th>

                </tr>
                <tr>
                    <td>
                        Income Taxes
                    </td>
                    <td>
                        {taxinfo.incomeTaxes.taxesOwed}
                    </td>
                    <td>
                        {taxinfo.incomeTaxes.marginalTaxRate}
                    </td>
                    <td>

                        {taxinfo.incomeTaxes.efectiveTaxRate}
                    </td>

                </tr>
                <tr>
                    <td>
                        Fica Taxes
                    </td>
                    <td>
                        {taxinfo.totalFicaTaxes.taxesOwed}
                    </td>
                    <td>

                        {taxinfo.totalFicaTaxes.marginalTaxRate}
                    </td>
                    <td>
                        {taxinfo.totalFicaTaxes.efectiveTaxRate}
                    </td>

                </tr>
                <tr>
                    <td>
                        (Social Security Taxes)
                    </td>
                    <td>
                        {taxinfo.socialSecurityTaxes.taxesOwed}
                    </td>
                    <td>

                        {taxinfo.socialSecurityTaxes.marginalTaxRate}
                    </td>
                    <td>
                        {taxinfo.socialSecurityTaxes.efectiveTaxRate}
                    </td>

                </tr>
                <tr>
                    <td>
                        (Medicare Taxes)
                    </td>
                    <td>
                        {taxinfo.medicareTaxes.taxesOwed}
                    </td>
                    <td>

                        {taxinfo.medicareTaxes.marginalTaxRate}
                    </td>
                    <td>
                        {taxinfo.medicareTaxes.efectiveTaxRate}
                    </td>

                </tr>
                <tr>
                    <td>
                        Total Tax
                    </td>
                    <td>
                        {taxinfo.toatalTax.taxesOwed}
                    </td>
                    <td>

                    </td>
                    <td> {taxinfo.toatalTax.efectiveTaxRate}
                    </td>

                </tr>
            


            </table>

        </p>
    </div>);
}