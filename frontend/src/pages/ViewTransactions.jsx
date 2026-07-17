import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../services/api";
import "../styles/ViewTransactions.css";

function ViewTransactions() {

    const navigate = useNavigate();

    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("ALL");
    const [filterCategory, setFilterCategory] = useState("ALL");
    const [selectedMonth, setSelectedMonth] = useState("ALL");
    const [sortBy, setSortBy] = useState("NEWEST");

    useEffect(() => {
        loadTransactions();
    }, []);

    const loadTransactions = async () => {

        try {

            const response = await api.get("/transactions");

            setTransactions(response.data);

        } catch (error) {

            toast.error("Failed to load transactions.");
            console.log(error);

        }

    };

    const deleteTransaction = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this transaction?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/transactions/${id}`);

            toast.success("Transaction Deleted Successfully!");

            loadTransactions();

        } catch (error) {

            toast.error("Unable to delete transaction.");
            console.log(error);

        }

    };

    let filteredTransactions = transactions.filter((t) => {

        const matchesSearch =
            (t.category || "")
                .toLowerCase()
                .includes(search.toLowerCase()) ||

            (t.description || "")
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesType =
            filterType === "ALL" ||
            t.type === filterType;

        const matchesCategory =
            filterCategory === "ALL" ||
            t.category === filterCategory;

        const month =
            new Date(t.date).getMonth() + 1;

        const matchesMonth =
            selectedMonth === "ALL" ||
            month === Number(selectedMonth);

        return (
            matchesSearch &&
            matchesType &&
            matchesCategory &&
            matchesMonth
        );

    });

    if (sortBy === "NEWEST") {

        filteredTransactions.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        );

    }

    if (sortBy === "OLDEST") {

        filteredTransactions.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
        );

    }

    if (sortBy === "HIGH") {

        filteredTransactions.sort(
            (a, b) => b.amount - a.amount
        );

    }

    if (sortBy === "LOW") {

        filteredTransactions.sort(
            (a, b) => a.amount - b.amount
        );

    }

    return (

        <div className="transaction-page">

            <h1>💳 All Transactions</h1>

            <div className="toolbar">

                <input
                    type="text"
                    placeholder="🔍 Search Description / Category"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                >
                    <option value="ALL">All Types</option>
                    <option value="INCOME">Income</option>
                    <option value="EXPENSE">Expense</option>
                </select>

                <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                >
                    <option value="ALL">All Categories</option>

                    {[...new Set(transactions.map(t => t.category))].map(category => (

                        <option key={category} value={category}>
                            {category}
                        </option>

                    ))}

                </select>

                <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                >
                    <option value="ALL">All Months</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="NEWEST">Newest First</option>
                    <option value="OLDEST">Oldest First</option>
                    <option value="HIGH">Highest Amount</option>
                    <option value="LOW">Lowest Amount</option>
                </select>

            </div>

            <div className="table-container">

                <table>

                    <thead>

                    <tr>

                        <th>ID</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Date</th>
                        <th>Action</th>

                    </tr>

                    </thead>

                    <tbody>
                    {filteredTransactions.length > 0 ? (

                        filteredTransactions.map((t) => (

                            <tr key={t.id}>

                                <td>{t.id}</td>

                                <td>{t.category}</td>

                                <td>{t.description}</td>

                                <td
                                    style={{
                                        fontWeight: "bold",
                                        color:
                                            t.type === "INCOME"
                                                ? "#2e7d32"
                                                : "#d32f2f"
                                    }}
                                >
                                    ₹ {t.amount}
                                </td>

                                <td>

                                    <span
                                        className={
                                            t.type === "INCOME"
                                                ? "income-badge"
                                                : "expense-badge"
                                        }
                                    >
                                        {t.type}
                                    </span>

                                </td>

                                <td>{t.date}</td>

                                <td>

                                    <FaEdit
                                        className="action-icon edit-icon"
                                        title="Edit Transaction"
                                        onClick={() =>
                                            navigate(`/edit-transaction/${t.id}`)
                                        }
                                    />

                                    <span className="separator"> | </span>

                                    <FaTrash
                                        className="action-icon delete-icon"
                                        title="Delete Transaction"
                                        onClick={() =>
                                            deleteTransaction(t.id)
                                        }
                                    />

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan="7"
                                className="no-data"
                            >
                                📭 No Transactions Found
                            </td>

                        </tr>

                    )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default ViewTransactions;