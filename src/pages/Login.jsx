import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/Constants";
import { useNavigate } from "react-router-dom";
// import { useData } from "../context/DataProvider";
import "./Login.css"; 

function Login(props) {
  const { onLogin } = props;
  // const { handleHeaders } = useData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add authentication here
    try {
      const loginCredentials = {
        email,
        password
      }

      const response = await axios.post(`${API_URL}/auth/sign_in`, loginCredentials);
      const { data, headers } = response;
      if(data && headers) {
        const accessToken = headers["access-token"];
        const expiry = headers["expiry"];
        const client = headers["client"];
        const uid = headers["uid"];

        console.log(data);
        console.log(accessToken, expiry, client, uid);

        // handleHeaders(headers);

        onLogin();
        navigate('/dashboard');
      }
    } catch(error) {
      if(error.response.data.errors) {
        return alert("Invalid credentials");
      }
    }
  };
 
  return (
    <div className="login-container">
      <div className="logo">
        <img src="slack-logo-login.png" alt="Slack Logo" width="100" />
      </div>
      <h1>Sign in to Slack</h1>
      <p>We suggest using the <strong>email address</strong> you use at work.</p>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@work-email.com"
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button className="sign-in-btn" type="submit">Sign In</button>
      </form>
      <div className="divider"><span>OR</span></div>
      <button className="google-btn">
        <img src="google-logo.webp" alt="Google Icon" />
        Sign In With Google
      </button>
      <button className="apple-btn">
        <img src="apple-logo.png" alt="Apple Icon" />
        Sign In With Apple
      </button>
      <p className="footer">
        New to Slack? <a href="/createaccount">Create an account</a>
      </p>
    </div>
  );
}

export default Login;
