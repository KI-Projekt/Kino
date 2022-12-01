import { Link } from "@mui/material";
import React from "react"
import '../../styles/Login.css';
import Login from "./LoginForm";

function LoginPopUp() {
  return (
    <div>
      <div className="Login-Form-Content">
        <h3 className="Login-Form-Title">Sign In</h3>
        <div className="Text-Center">
          Not registered yet? <Link href={`/signUp`}>Sign Up</Link>
        </div>
      </div>
      <Login />
    </div>
  )
}

export default LoginPopUp;