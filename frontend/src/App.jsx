import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddTransaction from "./pages/AddTransaction";
import ViewTransactions from "./pages/ViewTransactions";
import EditTransaction from "./pages/EditTransaction";
import Reports from "./pages/Reports";
import Budget from "./pages/Budget";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/dashboard" element={<Dashboard />} />

                <Route
                    path="/add-transaction"
                    element={<AddTransaction />}
                />

                <Route
                    path="/transactions"
                    element={<ViewTransactions />}
                />

                <Route
                    path="/edit-transaction/:id"
                    element={<EditTransaction />}
                />

                <Route
                    path="/reports"
                    element={<Reports />}
                />

                <Route
                    path="/budget"
                    element={<Budget />}
                />

            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
                theme="colored"
            />

        </BrowserRouter>

    );

}

export default App;