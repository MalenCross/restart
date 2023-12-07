import "./App.css";
import { Chart } from "./Chart";
import logo from "./images/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import { calculateTotalTax, TaxOutput } from "./TaxInfo";
import { useState } from "react";

export type FilingStatus = "single" | "married";

function App() {
  const [grossIncome, setGrossIncome] = useState(0);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");
  const [credits, setCredits] = useState(0);
  const [retirementContribution, setRetirementContribution] = useState(0);
  const [taxResult, setTaxResult] = useState<TaxOutput | null>(null);

  const handleFilingStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    // Here we can add a TypeScript type assertion to ensure the value is of the correct type
    setFilingStatus(value as FilingStatus);
  };

  const handleCreditsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Similarly, convert the input value to a number for the credits.
    setCredits(Number(event.target.value));
  };
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const totalTax = calculateTotalTax(
      Number(grossIncome),
      filingStatus,
      Number(credits),
      retirementContribution
    );
    setTaxResult(totalTax);
  };

  return (
    <>
      <div className="root">
        <h1 style={{ fontSize: "60px", margin: "10px" }}>Taxation Is Theft</h1>
        <h2 style={{ fontSize: "35px", margin: "20px" }}> W2 Tax Calculator</h2>

        <div className="flex">
          <Form onSubmit={handleSubmit}>
            <div className="flexbox-item flexbox-item-1">
              <h2
                style={{
                  fontSize: "35px",
                  margin: "8px",
                  marginBottom: "25px",
                }}
              >
                Input
              </h2>
              <h3 className="margin">Net Income</h3>
              <input
                type="number"
                value={grossIncome}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setGrossIncome(Number(event.target.value));
                }}
              ></input>

              <h3 className="margin"> Retirement Contributions</h3>
              <input
                type="number"
                value={retirementContribution}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const retirementContributionFromInput = event.target.value;
                  // console.log('setting retirement contribution to ', retirementContributionFromInput)
                  setRetirementContribution(
                    Number(retirementContributionFromInput)
                  );
                }}
              ></input>

              <h3 className="margin"> Marital Status</h3>
              <Form.Select
                className="form-select form formStyle"
                aria-label="Default select example"
                value={filingStatus}
                onChange={handleFilingStatusChange}
              >
                <option value="single">Single</option>
                <option value="married">Married</option>
              </Form.Select>

              <h3>Credits</h3>
              <input
                type="number"
                value={credits}
                onChange={handleCreditsChange}
              ></input>

              <button
                style={{ margin: "30px" }}
                type="submit"
                className="btn btn-primary"
              >
                Calculate Taxes
              </button>
            </div>
          </Form>

          <Chart filingStatus={filingStatus}></Chart>
        </div>

        <div
        className="resultBox">

       
        <img className="logo" src={logo} width={200} height={200} />

        {taxResult && (
          <div className="result">
            <p>Taxable Income: {taxResult.taxableIncome}</p>
            <p>Income Tax: {taxResult.incomeTax}</p>
            <p>FICA Tax: {taxResult.ficaTax}</p>
            <p>Total Tax: {taxResult.totalTax}</p>
            <p>Tax After Credits: {taxResult.taxAfterCredits}</p>
            <p>Take Home Pay: {taxResult.takeHomePay}</p>
          </div>
        )}

        
        <img className="logo" src={logo} width={200} height={200} />
      
        </div>
      </div>
    </>
  );
}

export default App;
