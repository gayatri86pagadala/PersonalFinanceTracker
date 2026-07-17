import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import api from "../services/api";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {

        try {

            const response = await api.post("/users/login", {
                email,
                password
            });

            // Save JWT Token
            localStorage.setItem("token", response.data.token);

            console.log(response.data);

            // Go to Dashboard
            navigate("/dashboard");

        } catch (error) {

            alert("Invalid Email or Password");

            console.log(error);

        }

    };

    return (

        <div className="login-container">

            <div className="login-card">

                <h1>💰 Personal Finance Tracker</h1>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={handleLogin}>
                    Login
                </button>

                <p>Don't have an account? Register</p>

            </div>

        </div>

    );
}

export default Login;