import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function BarChart({ income, expense }) {

    const data = {

        labels: ["Income", "Expense"],

        datasets: [

            {

                label: "Amount",

                data: [income, expense],

                backgroundColor: [

                    "#4CAF50",
                    "#F44336"

                ]

            }

        ]

    };

    return (

        <div
            style={{
                width: "600px",
                margin: "40px auto"
            }}
        >

            <Bar data={data} />

        </div>

    );

}

export default BarChart;