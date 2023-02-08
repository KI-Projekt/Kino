import { Link } from "@mui/material";
import React from "react"
import { User } from "../../interfaces/Interfaces";
import '../../styles/Login.css';
import SignUpForm from "./SignUpForm";

interface SignUpProps {
  user: User;
  setUser: Function;
}

function SignUp(props: SignUpProps) {
  return (
    <div className="Login-Form-Container">
      <div className="Login-Form">
        <div className="Login-Form-Content">
          <h3 className="Login-Form-Title">Sign Up</h3>
          <div className="Text-Center">
            Already registered? <Link href={`/signIn`}>Sign In</Link>
          </div>
          <SignUpForm user={props.user} setUser={props.setUser} />
        </div>
      </div>
    </div>
  )
}

export default SignUp;