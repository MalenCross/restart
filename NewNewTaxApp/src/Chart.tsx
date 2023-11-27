import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { generateGrossIncomes } from "./ChartHelpers";
import "./App.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

export function Chart() {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(50000);
  const [data, setData] = useState<any>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const grossIncomes = generateGrossIncomes(min, max);
    // // console.log(generateGrossIncomes(50,50000))
    // let grossIncomes = [5000,20000,100000]
    setData({
      labels: grossIncomes,
      datasets: [
        {
          label: "Total Tax",
          data: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Dataset 2",
          data: [5, 7, 9, 10, 13, 14, 16, 17, 19, 24],
          borderColor: "rgb(132, 99, 255,)",
          backgroundColor: "rgba(132, 99, 255, 0.5)",
        },
      ],
    });
  }, [min, max]);

  console.log("rendering charts");
  return (
    <div className="flexbox-item flexbox-item-2">
      <h2 style={{ fontSize: "35px", margin: "10px" }}>Chart</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          justifyContent: "space-evenly",
          alignItems: "flex-end",
        }}
      >
        <div>
          <div style={{ fontSize: "25px" }}>Min</div>
          <input
            className="margin"
            type="number"
            value={min}
            step="5000"
            onChange={(event: React.ChangeEvent<any>) => {
              setMin(parseInt(event.target.value));
            }}
          />
        </div>
        <div>
          <div style={{ fontSize: "25px" }}>Max</div>
          <input
            style={{ marginTop: "0px" }}
            className="margin"
            type="number"
            value={max}
            step="5000"
            onChange={(event: React.ChangeEvent<any>) => {
              setMax(parseInt(event.target.value));
            }}
          />
        </div>
      </div>

      <Line height={350} width={600} options={options} data={data} />
    </div>
  );
}
