import { Link, Typography, Box, useTheme } from "@mui/material";
import React from "react"
import '../../styles/Login.css';
import Login from "./LoginForm";

interface LoginPopUpProps {
  setUser: Function;
  handleProfileMenuClose?: Function;
}

function LoginPopUp(props: LoginPopUpProps) {

  const theme = useTheme();

  return (
    <Box sx={{ m: 2, padding: theme.spacing }}>
      <div className="Login-Form-Content">
        <Typography variant="h4" align="center" padding='1rem' >Sign In</Typography>
        <Typography sx={{ mb: '0.5rem' }}>
          Not registered yet? <Link href={`/login`}>Sign Up</Link>
        </Typography>
      </div>
      <Login setUser={props.setUser} handleProfileMenuClose={props.handleProfileMenuClose} />
    </Box >
  )
}

export default LoginPopUp;