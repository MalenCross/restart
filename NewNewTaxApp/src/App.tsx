import "./App.css";
import { Chart } from "./Chart";
import logo from "./images/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";

function App() {
  return (
    <>
      <div className="root">
        <h1 style={{ fontSize: "60px", margin: "10px" }}>Taxation Is Theft</h1>
        <h2 style={{ fontSize: "35px", margin: "20px" }}> W2 Tax Calculator</h2>
        <div className="flex">
          <div className="flexbox-item flexbox-item-1">
            <h2
              style={{ fontSize: "35px", margin: "8px", marginBottom: "25px" }}
            >
              Input
            </h2>
            <h3 className="margin">Net Income</h3>
            <input></input>

            <h3 className="margin"> Retirement Contributions</h3>
            <input></input>

            <h3 className="margin"> Marital Status</h3>
            <Form.Select
              className="form-select form formStyle"
              aria-label="Default select example"
            >
              <option value="single">Single</option>
              <option value="married">Married</option>
            </Form.Select>

            <h3>Credits</h3>
            <input></input>
          </div>
          <Chart></Chart>
        </div>
        <img className="logo" src={logo} width={200} height={200} />
        <img className="logo" src={logo} width={200} height={200} />
        <img className="logo" src={logo} width={200} height={200} />
        <img className="logo" src={logo} width={200} height={200} />
      </div>
    </>
  );
}

export default App;
