import { Link } from "@mui/material";
import React from "react"
import '../../styles/Login.css';
import SignUpForm from "./SignUpForm";

function SignUp() {
  return (
      <div className="Login-Form-Container">
        <div className="Login-Form">
          <div className="Login-Form-Content">
            <h3 className="Login-Form-Title">Sign Up</h3>
            <div className="Text-Center">
              Already registered? <Link href={`/signIn`}>Sign In</Link>
            </div>
          <SignUpForm />
          </div>
        </div>
      </div>
  )
}

export default SignUp;