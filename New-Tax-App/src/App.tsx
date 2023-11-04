import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { calculateTotalTax, TaxOutput } from './TaxInfo3';
import { useState } from 'react';

function App() {
  const [grossIncome, setGrossIncome] = useState(0);
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single');
  const [credits, setCredits] = useState(0);
  const [taxResult, setTaxResult] = useState<TaxOutput | null>(null);

  const handleGrossIncomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Convert the string value to a number before storing it in the state.
    setGrossIncome(Number(event.target.value));
  };

  const handleFilingStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    // Here we can add a TypeScript type assertion to ensure the value is of the correct type
    setFilingStatus(value as 'single' | 'married');
  };

  const handleCreditsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Similarly, convert the input value to a number for the credits.
    setCredits(Number(event.target.value));
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const totalTax = calculateTotalTax(Number(grossIncome), filingStatus, Number(credits));
    setTaxResult(totalTax);
  };

  return (
    <>
      <h1>New Tax App</h1>
      <Form onSubmit={handleSubmit}>
        <div className="card">
          <div className="title">Net Income</div>
          <input
            type="number"
            value={grossIncome}
            onChange={handleGrossIncomeChange}
          />

          <div className='header'>Marital Status</div>
          <Form.Select
            className='form-select'
            value={filingStatus}
            onChange={handleFilingStatusChange}
            aria-label="Default select example"
          >
            <option value="single">Single</option>
            <option value="married">Married</option>
          </Form.Select>

          <div className='header'>Credits</div>
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
    </>
  )
}

export default App;