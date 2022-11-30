import React from "react"
import '../styles/Login.css';
import Login from "../components/Login";

function LoginView() {
    return (
        <div className="Login-Form-Container">
            <div className="Login-Form">
                <Login></Login>
            </div>
        </div>
    )
}

export default LoginView;