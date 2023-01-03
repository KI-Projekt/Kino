import { Link, Typography, Box, useTheme } from "@mui/material";
import React from "react"
import '../../styles/Login.css';
import Login from "./LoginForm";

function LoginPopUp() {

  const theme = useTheme();
  
  return (
    <Box sx={{ m: 2, padding: theme.spacing}}>
      <div className="Login-Form-Content">
        <Typography variant="h4" align="center" padding='1rem' >Sign In</Typography>
        <Typography sx={{ mb: '0.5rem'}}>
          Not registered yet? <Link href={`/login`}>Sign Up</Link>
        </Typography>
      </div>
      <Login />
    </Box >
  )
}

export default LoginPopUp;