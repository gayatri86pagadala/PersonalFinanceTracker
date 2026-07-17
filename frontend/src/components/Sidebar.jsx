import { Link, useNavigate } from "react-router-dom";
import {
    FaHome,
    FaPlusCircle,
    FaListAlt,
    FaChartPie,
    FaSignOutAlt
} from "react-icons/fa";

import "./Sidebar.css";

function Sidebar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");
        navigate("/");

    };

    return (

        <div className="sidebar">

            <h2>💰 Finance Tracker</h2>

            <Link to="/dashboard">
                <FaHome /> Dashboard
            </Link>

            <Link to="/add-transaction">
                <FaPlusCircle /> Add Transaction
            </Link>

            <Link to="/transactions">
                <FaListAlt /> Transactions
            </Link>

            <Link to="/reports">
                <FaChartPie /> Reports
            </Link>
            <li onClick={() => navigate("/budget")}>
                💰 Budget Planner
            </li>

            <button onClick={logout}>
                <FaSignOutAlt /> Logout
            </button>

        </div>

    );

}

export default Sidebar;