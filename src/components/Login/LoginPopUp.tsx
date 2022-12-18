import { Link, Typography } from "@mui/material";
import React from "react"
import '../../styles/Login.css';
import Login from "./LoginForm";

function LoginPopUp() {
  return (
    <div>
      <div className="Login-Form-Content">
        <Typography variant="h4" align="center" padding='1rem' >Sign In</Typography>
        <Typography sx={{ mb: '0.5rem'}}>
          Not registered yet? <Link href={`/login`}>Sign Up</Link>
        </Typography>
      </div>
      <Login />
    </div >
  )
}

export default LoginPopUp;