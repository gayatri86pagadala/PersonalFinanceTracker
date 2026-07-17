import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function PieChart({ income, expense }) {

    const data = {

        labels: ["Income", "Expense"],

        datasets: [

            {

                data: [income, expense],

                backgroundColor: [

                    "#4CAF50",
                    "#F44336"

                ],

                borderWidth: 1

            }

        ]

    };

    return (

        <div
            style={{
                width: "350px",
                margin: "30px auto"
            }}
        >

            <Pie data={data} />

        </div>

    );

}

export default PieChart;