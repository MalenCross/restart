import { useState, useEffect } from 'react';
import { FilingStatus } from './App';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { calculateTotalTax } from './TaxInfo3';
import { generateGrossIncomes } from './ChartHelpers';

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
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};



export interface ChartProps {
    filingStatus: FilingStatus
}

export function Chart({ filingStatus }: ChartProps) {
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(50000);
    const [data, setData] = useState<any>({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        const grossIncomes = generateGrossIncomes(min, max);
        // // console.log(generateGrossIncomes(50,50000))
        // let grossIncomes = [5000,20000,100000]
        setData({
            labels: grossIncomes,
            datasets: [
                {
                    label: 'Total Tax',
                    data: grossIncomes.map((grossIncome) => calculateTotalTax(grossIncome, filingStatus, 0, 0).totalTax),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                    label: 'Dataset 2',
                    data: grossIncomes.map((grossIncome) => calculateTotalTax(grossIncome, filingStatus, 0, 0).takeHomePay),
                    borderColor: 'rgb(132, 99, 255,)',
                    backgroundColor: 'rgba(132, 99, 255, 0.5)',
                }
            ],
        });

    }, [filingStatus, min, max]);

    console.log("rendering charts");
    return (
        <div>
            <h2>Chart</h2>
            <input
                type='number'
                value={min}
                step = "5000"
                onChange={(event: React.ChangeEvent<any>) => {
                    setMin(parseInt(event.target.value))
                }} />

            <input
                type='number'
                value={max}
                step = "5000"
                onChange={(event: React.ChangeEvent<any>) => {
                    setMax(parseInt(event.target.value))
                }} />

            <Line
            height={300}
             options={options} data={data} />
        </div>

    );
}
