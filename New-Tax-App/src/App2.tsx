import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { calculateTotalTax, TaxOutput } from './TaxInfo3';
import { useState } from 'react';
// import { HelloWorld } from './HelloWord';
import { Chart } from './Chart';

// 3 inputs
// submit button -> call to calculate
// show calc results


// Component
///    infinite render loop

// IN CONSOLE:
// rendering 0
// BROWSER SHOWS:
// Hello World
// Number is: 0
// | 0 |

// IN CONSOLE:
// setting count to: 1
// rendering 1
// BROWSER SHOWS:
// Hello World
// Number is: 1
// | 1 |


// IN CONSOLE:
// setting count to: 11
// rendering 11
// BROWSER SHOWS:
// Hello World
// Number is: 11
// | 11 |






export type FilingStatus = 'single' | 'married'

function App() {
  const [grossIncome, setGrossIncome] = useState(0);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [credits, setCredits] = useState(0);
  const [retirementContribution, setRetirementContribution] = useState(0);
  const [taxResult, setTaxResult] = useState<TaxOutput | null>(null);

  const handleFilingStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    // Here we can add a TypeScript type assertion to ensure the value is of the correct type
    setFilingStatus(value as FilingStatus);
  };

  const handleCreditsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Similarly, convert the input value to a number for the credits.
    setCredits(Number(event.target.value));
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const totalTax = calculateTotalTax(Number(grossIncome), filingStatus, Number(credits), retirementContribution);
    setTaxResult(totalTax);
  };

  console.log('rendering');
  console.log(`grossIncome: ${grossIncome} filingStatus: ${filingStatus} credits ${credits} retirementContribution: ${retirementContribution}`);
  return (
    <>
      {/* <HelloWorld grossIncome={grossIncome}/> */}
      <h1>Taxation Is Theft</h1>
      <h2>W2 Tax Calculator</h2>
      <Form onSubmit={handleSubmit}>
        <div className="card">
          <h2 className="title">Net Income</h2>
          <input
            type="number"
            value={grossIncome}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setGrossIncome(Number(event.target.value));
            }}
          />
          <h3 className='header'>Retirement Contribution</h3>
          <input
            type="number"
            value={retirementContribution}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const retirementContributionFromInput = event.target.value;
              // console.log('setting retirement contribution to ', retirementContributionFromInput)
              setRetirementContribution(Number(retirementContributionFromInput));
            }}
          />

          <h3 className='header'>Marital Status</h3>
          <Form.Select
            className='form-select'
            value={filingStatus}
            onChange={handleFilingStatusChange}
            aria-label="Default select example"
          >
            <option value="single">Single</option>
            <option value="married">Married</option>
          </Form.Select>

          <h3 className='header'>Credits</h3>
          <input
            type="number"
            value={credits}
            onChange={handleCreditsChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">Calculate Taxes</button>
      </Form>

      {taxResult && (
        <div className='result'>
          <p>Taxable Income: {taxResult.taxableIncome}</p>
          <p>Income Tax: {taxResult.incomeTax}</p>
          <p>FICA Tax: {taxResult.ficaTax}</p>
          <p>Total Tax: {taxResult.totalTax}</p>
          <p>Tax After Credits: {taxResult.taxAfterCredits}</p>
          <p>Take Home Pay: {taxResult.takeHomePay}</p>
        </div>
      )}

      <Chart filingStatus={filingStatus} />
    </>
  )
}

export default App;