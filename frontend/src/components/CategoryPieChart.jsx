import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#FF4560",
    "#26A69A",
    "#7E57C2"
];

function CategoryPieChart({ data }) {

    if (!data || data.length === 0) {
        return (
            <div
                style={{
                    textAlign: "center",
                    padding: "30px",
                    fontSize: "18px",
                    color: "#666"
                }}
            >
                No expense data available.
            </div>
        );
    }

    return (

        <div
            style={{
                width: "100%",
                height: "420px"
            }}
        >

            <ResponsiveContainer width="100%" height="100%">

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="totalAmount"
                        nameKey="category"
                        cx="50%"
                        cy="50%"
                        outerRadius={130}
                        label={({ category, totalAmount }) =>
                            `${category} ₹${totalAmount}`
                        }
                    >

                        {data.map((entry, index) => (

                            <Cell
                                key={index}
                                fill={COLORS[index % COLORS.length]}
                            />

                        ))}

                    </Pie>

                    <Tooltip
                        formatter={(value) => [`₹${value}`, "Amount"]}
                    />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );
}

export default CategoryPieChart;