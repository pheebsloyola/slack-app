import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/Constants";
import { useNavigate } from "react-router-dom";

function CreateAccount(){
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
              }
    
          const response = await axios.post(`${API_URL}/auth`, userDetails);
          const { data, headers } = response;
          if(data && headers) {
            const accessToken = headers["access-token"];
            const expiry = headers["expiry"];
            const client = headers["client"];
            const uid = headers["uid"];
    
            console.log(data);
            console.log(accessToken, expiry, client, uid);
    
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
     <div>
          <form onSubmit={handleSubmit}>
       <input
       type="text"
       value={email}
       onChange={(e) => setEmail(e.target.value)}
       placeholder="Email address"
       required
       />
       <input
       type="password"
       value={password}
       onChange={(e) => setPassword(e.target.value)}
       placeholder="Password"
       required
       />
        <input
       type="password"
       value={passwordConfirmation}
       onChange={(e) => setPasswordConfirmation(e.target.value)}
       placeholder="Confirm password"
       required
       />
       <button className="btn btn-success" type="submit">Create account</button>
          </form>
     </div>
 )
}

export default CreateAccount;