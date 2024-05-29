import { Link } from "@mui/material";
import React from "react"
import { User } from "../../interfaces/Interfaces";
import SignUpForm from "./SignUpForm";

interface SignUpProps {
  user: User;
  setUser: Function;
}

function SignUp(props: SignUpProps) {
  return (
    <div className="flex justify-center items-center h-[800px]">
      <div className="flex bg-white rounded-lg pb-5 pt-7 shadow-sm shadow-black w-96">
        <div className="px-4">
          <h3 className="text-center mb-4 text-2xl text-amber-400 font-extrabold">Sign Up</h3>
          <div className="mb-2">
            Already registered? <Link href={`/signIn`}>Sign In</Link>
          </div>
          <SignUpForm />
        </div>
      </div>
    </div>
  )
}

export default SignUp;