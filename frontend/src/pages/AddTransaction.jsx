import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import "../styles/AddTransaction.css";

function AddTransaction() {

    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("INCOME");

    const saveTransaction = async () => {

        if (
            category.trim() === "" ||
            description.trim() === "" ||
            amount === "" ||
            Number(amount) <= 0
        ) {

            toast.warning("Please fill all fields correctly.");
            return;

        }

        try {

            await api.post("/transactions", {
                category,
                description,
                amount: Number(amount),
                type
            });

            toast.success("Transaction Added Successfully!");

            setCategory("");
            setDescription("");
            setAmount("");
            setType("INCOME");

        } catch (error) {

            toast.error("Failed to Add Transaction!");

            console.log(error);

        }

    };

    return (

        <div className="add-transaction-page">

            <div className="add-transaction-card">

                <h2>➕ Add Transaction</h2>

                <label>Category</label>

                <input
                    type="text"
                    placeholder="Salary, Food, Rent..."
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <label>Description</label>

                <input
                    type="text"
                    placeholder="Enter Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <label>Amount</label>

                <input
                    type="number"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />

                <label>Transaction Type</label>

                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="INCOME">Income</option>
                    <option value="EXPENSE">Expense</option>
                </select>

                <button
                    className="add-btn"
                    onClick={saveTransaction}
                >
                    💾 Save Transaction
                </button>

            </div>

        </div>

    );

}

export default AddTransaction;