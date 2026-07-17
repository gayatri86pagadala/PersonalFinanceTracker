import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import { toast } from "react-toastify";
import "../styles/Budget.css";

function Budget() {

    const [budget, setBudget] = useState("");
    const [savedBudget, setSavedBudget] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        loadBudget();
        loadExpenses();
    }, []);

    const loadBudget = async () => {

        try {

            const response = await api.get("/budget");

            if (response.data.monthlyBudget != null) {

                setSavedBudget(response.data.monthlyBudget);
                setBudget(response.data.monthlyBudget);

            }

        } catch (error) {

            toast.error("Failed to load budget!");
            console.log(error);

        }

    };

    const loadExpenses = async () => {

        try {

            const response = await api.get("/transactions/dashboard");

            setExpenses(response.data.totalExpense);

        } catch (error) {

            toast.error("Failed to load expenses!");
            console.log(error);

        }

    };

    const saveBudget = async () => {

        if (budget === "" || Number(budget) <= 0) {

            toast.warning("Please enter a valid budget.");
            return;

        }

        try {

            await api.post("/budget", {

                monthlyBudget: Number(budget)

            });

            toast.success("Budget Updated Successfully!");

            setEditing(false);

            loadBudget();

        } catch (error) {

            toast.error("Unable to update budget!");

            console.log(error);

        }

    };

    const remaining = savedBudget - expenses;

    const percentage =
        savedBudget > 0
            ? Math.min((expenses / savedBudget) * 100, 100)
            : 0;

    let progressColor = "#4CAF50";
    let status = "🟢 Great! Your spending is under control.";
    let statusColor = "#4CAF50";

    if (percentage > 70 && percentage <= 90) {

        progressColor = "#FFC107";
        status = "🟡 Warning! You are approaching your budget limit.";
        statusColor = "#FFC107";

    } else if (percentage > 90 && percentage <= 100) {

        progressColor = "#FF9800";
        status = "🟠 Almost Full! Spend carefully.";
        statusColor = "#FF9800";

    } else if (percentage >= 100) {

        progressColor = "#F44336";
        status = "🔴 Budget Exceeded!";
        statusColor = "#F44336";

    }

    return (

        <Layout>

            <div className="budget-page">

                <h1>💰 Monthly Budget Planner</h1>

                <div className="budget-card">

                    <h3>Current Budget</h3>

                    {!editing ? (

                        <div className="budget-edit-row">

                            <h2 className="budget-value">

                                ₹ {savedBudget}

                            </h2>

                            <button
                                className="edit-btn"
                                onClick={() => setEditing(true)}
                                title="Edit Budget"
                            >
                                ✏️
                            </button>

                        </div>

                    ) : (

                        <div className="budget-input-row">

                            <input
                                type="number"
                                value={budget}
                                onChange={(e) => setBudget(e.target.value)}
                                placeholder="Enter Budget"
                            />

                            <button
                                className="save-btn"
                                onClick={saveBudget}
                            >
                                💾 Save
                            </button>

                            <button
                                className="cancel-btn"
                                onClick={() => {

                                    setBudget(savedBudget);
                                    setEditing(false);

                                }}
                            >
                                ❌ Cancel
                            </button>

                        </div>

                    )}

                </div>

                <div className="summary">

                    <div className="summary-card">

                        <h3>Total Expenses</h3>

                        <h2 style={{ color: "#F44336" }}>

                            ₹ {expenses}

                        </h2>

                    </div>

                    <div className="summary-card">

                        <h3>Remaining Budget</h3>

                        <h2
                            style={{
                                color:
                                    remaining >= 0
                                        ? "#4CAF50"
                                        : "#F44336"
                            }}
                        >

                            ₹ {remaining}

                        </h2>

                    </div>

                </div>

                <div className="progress-section">

                    <h3>Budget Usage</h3>

                    <div className="progress-bar">

                        <div
                            className="progress-fill"
                            style={{
                                width: `${percentage}%`,
                                background: progressColor,
                                transition: "width 0.8s ease-in-out"
                            }}
                        ></div>

                    </div>

                    <p>

                        <strong>{percentage.toFixed(1)}%</strong> Used

                    </p>

                    <p
                        style={{
                            color: statusColor,
                            fontWeight: "bold",
                            marginTop: "15px",
                            fontSize: "17px"
                        }}
                    >
                        {status}
                    </p>

                    {remaining < 0 && (

                        <h2 className="warning">

                            ⚠ Budget Exceeded by ₹ {Math.abs(remaining)}

                        </h2>

                    )}

                </div>

            </div>

        </Layout>

    );

}

export default Budget;