import React, { useState } from "react"
import '../styles/Login.css';

function Login () {
  /*const [LoginMode, setLoginMode] = useState("signin")

  const changeLoginMode = () => {
    setLoginMode(LoginMode === "signin" ? "signup" : "signin")
  }

  if (LoginMode === "signin") {*/
    return (
      <div className="Login-form-container">
        <form className="Login-form">
          <div className="Login-form-content">
            <h3 className="Login-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet? <a href="signUp">Sign Up</a>              
            </div>
            <div className="form-login-email-label">
              <label>Email address</label>
              <input
                type="email"
                className="form-login-input"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-login-input"
                placeholder="Enter password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn-primary">
                Submit
              </button>
            </div>
            {/* <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p> */}
          </div>
        </form>
      </div>
    )
  }
/*
  return (
    <div className="Login-form-container">
      <form className="Login-form">
        <form className="Login-form-content">
          <h3 className="Login-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeLoginMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="email"
              className="form-login-input"
              placeholder="e.g Jane Doe"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-login-input"
              placeholder="Email Address"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-login-input"
              placeholder="Password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </form>
      </form>
    </div>
  )
}

<! -- {" "}
              <span className="link-primary" onClick={changeLoginMode}>
                Sign Up
              </span>
              -- !> 
              */

export default Login;