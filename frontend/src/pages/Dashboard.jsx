import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";
import PieChart from "../components/PieChart";
import "../styles/Dashboard.css";

function Dashboard() {

    const [summary, setSummary] = useState({
        totalIncome: 0,
        totalExpense: 0,
        balance: 0,
        totalTransactions: 0,

        highestIncome: 0,
        highestExpense: 0,
        averageIncome: 0,
        averageExpense: 0
    });

    const [recentTransactions, setRecentTransactions] = useState([]);

    useEffect(() => {

        loadDashboard();
        loadRecentTransactions();

    }, []);

    const loadDashboard = async () => {

        try {

            const response = await api.get("/transactions/dashboard");
            setSummary(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const loadRecentTransactions = async () => {

        try {

            const response = await api.get("/transactions/recent");
            setRecentTransactions(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <Layout>

            <div className="dashboard">

                <h1>💰 Personal Finance Tracker</h1>

                <div className="cards">

                    <div className="card balance">
                        <h3>Current Balance</h3>
                        <h2>₹ {summary.balance}</h2>
                    </div>

                    <div className="card income">
                        <h3>Total Income</h3>
                        <h2>₹ {summary.totalIncome}</h2>
                    </div>

                    <div className="card expense">
                        <h3>Total Expense</h3>
                        <h2>₹ {summary.totalExpense}</h2>
                    </div>

                    <div className="card transactions">
                        <h3>Total Transactions</h3>
                        <h2>{summary.totalTransactions}</h2>
                    </div>

                </div>

                <div className="chart-section">

                    <h2>Income vs Expense</h2>

                    <PieChart
                        income={summary.totalIncome}
                        expense={summary.totalExpense}
                    />

                </div>

                <div className="recent-section">

                    <h2>🕒 Recent Transactions</h2>

                    <table>

                        <thead>

                        <tr>

                            <th>Category</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Type</th>
                            <th>Date</th>

                        </tr>

                        </thead>

                        <tbody>

                        {recentTransactions.map((t) => (

                            <tr key={t.id}>

                                <td>{t.category}</td>
                                <td>{t.description}</td>
                                <td>₹ {t.amount}</td>
                                <td>{t.type}</td>
                                <td>{t.date}</td>

                            </tr>

                        ))}

                        </tbody>

                    </table>

                </div>

                {/* Quick Statistics */}

                <div className="stats-section">

                    <h2>📊 Quick Statistics</h2>

                    <div className="stats-grid">

                        <div className="stat-card">

                            <h4>Highest Income</h4>

                            <h2>₹ {summary.highestIncome}</h2>

                        </div>

                        <div className="stat-card">

                            <h4>Highest Expense</h4>

                            <h2>₹ {summary.highestExpense}</h2>

                        </div>

                        <div className="stat-card">

                            <h4>Average Income</h4>

                            <h2>₹ {summary.averageIncome?.toFixed(2)}</h2>

                        </div>

                        <div className="stat-card">

                            <h4>Average Expense</h4>

                            <h2>₹ {summary.averageExpense?.toFixed(2)}</h2>

                        </div>

                    </div>

                </div>

            </div>

        </Layout>

    );

}

export default Dashboard;