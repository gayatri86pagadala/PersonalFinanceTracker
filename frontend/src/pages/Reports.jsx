import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import api from "../services/api";
import BarChart from "../components/BarChart";
import MonthlyChart from "../components/MonthlyChart";
import CategoryPieChart from "../components/CategoryPieChart";

function Reports() {

    const [summary, setSummary] = useState({
        totalIncome: 0,
        totalExpense: 0,
        balance: 0
    });

    const [monthlyData, setMonthlyData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);

    const [showMenu, setShowMenu] = useState(false);
    const [loading, setLoading] = useState(true);

    const loadReport = async () => {

        try {

            const response = await api.get("/transactions/dashboard");

            setSummary(response.data);

        } catch (error) {

            toast.error("Failed to load dashboard");
            console.log(error);

        }

    };

    const loadMonthlyReport = async () => {

        try {

            const response = await api.get("/transactions/monthly-report");

            setMonthlyData(response.data);

        } catch (error) {

            toast.error("Failed to load monthly report");
            console.log(error);

        }

    };

    const loadCategoryReport = async () => {

        try {

            const response = await api.get("/transactions/category-report");

            setCategoryData(response.data);

        } catch (error) {

            toast.error("Failed to load category report");
            console.log(error);

        }

    };

    const loadAllReports = async () => {

        setLoading(true);

        await Promise.all([
            loadReport(),
            loadMonthlyReport(),
            loadCategoryReport()
        ]);

        setLoading(false);

    };

    useEffect(() => {

        loadAllReports();

    }, []);

    const downloadPdf = async () => {

        try {

            const response = await api.get("/transactions/pdf", {
                responseType: "blob"
            });

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link = document.createElement("a");

            link.href = url;
            link.download = "transactions.pdf";

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

            setShowMenu(false);

            toast.success("PDF Downloaded Successfully");

        } catch (error) {

            toast.error("Unable to download PDF");
            console.log(error);

        }

    };

    const downloadExcel = async () => {

        try {

            const response = await api.get("/transactions/excel", {
                responseType: "blob"
            });

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link = document.createElement("a");

            link.href = url;
            link.download = "transactions.xlsx";

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

            setShowMenu(false);

            toast.success("Excel Downloaded Successfully");

        } catch (error) {

            toast.error("Unable to download Excel");
            console.log(error);

        }

    };

    if (loading) {

        return (

            <Layout>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "80vh",
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: "#1976d2"
                    }}
                >
                    Loading Reports...
                </div>

            </Layout>

        );

    }

    return (

        <Layout>

            <div
                style={{
                    padding: "40px",
                    background: "#f5f7fa",
                    minHeight: "100vh"
                }}
            >

                <h1
                    style={{
                        textAlign: "center",
                        color: "#1976d2",
                        marginBottom: "30px"
                    }}
                >
                    📊 Financial Reports
                </h1>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "15px",
                        marginBottom: "30px"
                    }}
                >

                    <button
                        onClick={loadAllReports}
                        style={{
                            padding: "12px 20px",
                            background: "#43a047",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "bold"
                        }}
                    >
                        🔄 Refresh
                    </button>

                    <div
                        style={{
                            position: "relative",
                            width: "220px"
                        }}
                    >
                        <button
                            onClick={() => setShowMenu(!showMenu)}
                            style={{
                                width: "100%",
                                padding: "12px",
                                background: "#1976d2",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontSize: "16px",
                                fontWeight: "bold"
                            }}
                        >
                            ⬇ Download Report
                        </button>

                        {showMenu && (

                            <div
                                style={{
                                    position: "absolute",
                                    width: "100%",
                                    background: "white",
                                    boxShadow: "0 5px 15px rgba(0,0,0,.2)",
                                    borderRadius: "8px",
                                    marginTop: "5px",
                                    zIndex: 100
                                }}
                            >

                                <button
                                    onClick={downloadPdf}
                                    style={{
                                        width: "100%",
                                        padding: "12px",
                                        border: "none",
                                        background: "white",
                                        cursor: "pointer",
                                        textAlign: "left"
                                    }}
                                >
                                    📄 Download PDF
                                </button>

                                <button
                                    onClick={downloadExcel}
                                    style={{
                                        width: "100%",
                                        padding: "12px",
                                        border: "none",
                                        background: "white",
                                        cursor: "pointer",
                                        textAlign: "left"
                                    }}
                                >
                                    📊 Download Excel
                                </button>

                            </div>

                        )}

                    </div>

                </div>

                <div
                    style={{
                        background: "white",
                        padding: "25px",
                        borderRadius: "15px",
                        boxShadow: "0 5px 15px rgba(0,0,0,.15)",
                        marginBottom: "30px"
                    }}
                >

                    <h2 style={{ textAlign: "center" }}>
                        📈 Monthly Expense Analytics
                    </h2>

                    <MonthlyChart data={monthlyData} />

                </div>

                <div
                    style={{
                        background: "white",
                        padding: "25px",
                        borderRadius: "15px",
                        boxShadow: "0 5px 15px rgba(0,0,0,.15)",
                        marginBottom: "30px"
                    }}
                >

                    <h2 style={{ textAlign: "center" }}>
                        🥧 Expense By Category
                    </h2>

                    {categoryData.length > 0 ? (

                        <CategoryPieChart data={categoryData} />

                    ) : (

                        <div
                            style={{
                                textAlign: "center",
                                padding: "30px",
                                color: "gray"
                            }}
                        >
                            No category data available.
                        </div>

                    )}

                </div>

                <div
                    style={{
                        background: "white",
                        padding: "25px",
                        borderRadius: "15px",
                        boxShadow: "0 5px 15px rgba(0,0,0,.15)"
                    }}
                >

                    <h2 style={{ textAlign: "center" }}>
                        📊 Income vs Expense
                    </h2>

                    <BarChart
                        income={summary.totalIncome}
                        expense={summary.totalExpense}
                    />

                </div>

                <table
                    style={{
                        width: "700px",
                        margin: "40px auto",
                        borderCollapse: "collapse",
                        background: "white",
                        boxShadow: "0 5px 15px rgba(0,0,0,.15)"
                    }}
                >

                    <tbody>

                    <tr>
                        <td style={{ padding: "15px", fontWeight: "bold" }}>
                            Total Income
                        </td>

                        <td
                            style={{
                                padding: "15px",
                                color: "green",
                                fontWeight: "bold"
                            }}
                        >
                            ₹ {summary.totalIncome}
                        </td>

                    </tr>

                    <tr>

                        <td style={{ padding: "15px", fontWeight: "bold" }}>
                            Total Expense
                        </td>

                        <td
                            style={{
                                padding: "15px",
                                color: "red",
                                fontWeight: "bold"
                            }}
                        >
                            ₹ {summary.totalExpense}
                        </td>

                    </tr>

                    <tr>

                        <td style={{ padding: "15px", fontWeight: "bold" }}>
                            Current Balance
                        </td>

                        <td
                            style={{
                                padding: "15px",
                                color:
                                    summary.balance >= 0
                                        ? "#1976d2"
                                        : "#F44336",
                                fontWeight: "bold"
                            }}
                        >
                            ₹ {summary.balance}
                        </td>

                    </tr>

                    </tbody>

                </table>

            </div>

        </Layout>

    );

}

export default Reports;