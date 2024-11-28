import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/Constants";
import { useNavigate } from "react-router-dom";
import "./CreateAccount.css";

function CreateAccount() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add authentication here
        try {
            const userDetails = {
                email,
                password,
                passwordConfirmation
              };
    
          const response = await axios.post(`${API_URL}/auth`, userDetails);
          const { data, headers } = response;
          if(data && headers) {
            // const accessToken = headers["access-token"];
            // const expiry = headers["expiry"];
            // const client = headers["client"];
            // const uid = headers["uid"];
    
            // console.log(data);
            // console.log(accessToken, expiry, client, uid);
    
            // handleHeaders(headers);
    
        
            navigate('/login');
          }
        } catch(error) {
          if(error.response.data.errors) {
            return alert("Invalid credentials");
          }
        }
      };
 return(
  <div className="create-account-container">
  <img
    className="logo"
    src="https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png"
    alt="Slack Logo"
  />
  <h1>Create Your Account</h1>
  <p>Enter your email and password to create a new account.</p>
  <form onSubmit={handleSubmit}>
    <div className="input-group">
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        required
      />
    </div>
    <div className="input-group">
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
    </div>
    <div className="input-group">
      <input
        type="password"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        placeholder="Confirm password"
        required
      />
    </div>
    <button className="btn btn-primary" type="submit">
      Create Account
    </button>
  </form>
  <p className="footer-text">
    Already have an account?{" "}
    <a href="/login" className="link">
      Sign in here.
    </a>
  </p>
</div>
);
}

export default CreateAccount;