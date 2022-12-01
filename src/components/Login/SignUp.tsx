import { Link } from "@mui/material";
import React from "react"
import '../../styles/Login.css';
import SignUpForm from "./SignUpForm";

function SignUp() {
  return (
    <div>
      <div className="Login-Form-Container">
        <div className="Login-Form">
          <div className="Login-Form-Content">
            <h3 className="Login-Form-Title">Sign In</h3>
            <div className="Text-Center">
              Not registered yet? <Link href={`/signUp`}>Sign Up</Link>
            </div>
          <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp;