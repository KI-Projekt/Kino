import React from "react"
import '../styles/Login.css';

function SignUp () {


  return (
    <div className="Login-form-container">
      <form className="Login-form">
        <form className="Login-form-content">
          <h3 className="Login-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered? <a href="login">Sign In</a>
          </div>
          <div className="form-group mt-3">
            <label>First Name</label>
            <input
              type="text"
              className="form-login-input"
              placeholder="e.g Jane"
            />
          </div>
          <div className="form-group mt-3">
            <label>Surname</label>
            <input
              type="text"
              className="form-login-input"
              placeholder="e.g Doe"
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
        </form>
      </form>
    </div>
  )
}



export default SignUp;