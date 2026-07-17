import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import "../styles/EditTransaction.css";

function EditTransaction() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("INCOME");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadTransaction();
    }, []);

    const loadTransaction = async () => {

        try {

            const response = await api.get("/transactions");

            const transaction = response.data.find(
                (t) => t.id === Number(id)
            );

            if (transaction) {

                setCategory(transaction.category);
                setDescription(transaction.description);
                setAmount(transaction.amount);
                setType(transaction.type);

            } else {

                toast.error("Transaction not found!");

            }

        } catch (error) {

            toast.error("Unable to load transaction.");
            console.log(error);

        }

    };

    const updateTransaction = async () => {

        if (
            category.trim() === "" ||
            description.trim() === "" ||
            amount === "" ||
            Number(amount) <= 0
        ) {

            toast.warning("Please complete all fields.");
            return;

        }

        try {

            setLoading(true);

            await api.put(`/transactions/${id}`, {

                category,
                description,
                amount: Number(amount),
                type

            });

            toast.success("Transaction Updated Successfully!");

            setTimeout(() => {

                navigate("/transactions");

            }, 1000);

        } catch (error) {

            toast.error("Failed to update transaction.");
            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="edit-container">

            <div className="edit-card">

                <h1>✏️ Edit Transaction</h1>

                <label>Category</label>

                <input
                    type="text"
                    placeholder="Enter Category"
                    value={category}
                    autoFocus
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
                    className="update-btn"
                    onClick={updateTransaction}
                    disabled={loading}
                >
                    {loading ? "Updating..." : "💾 Update Transaction"}
                </button>

                <button
                    className="cancel-btn"
                    onClick={() => navigate("/transactions")}
                >
                    ↩ Back
                </button>

            </div>

        </div>

    );

}

export default EditTransaction;