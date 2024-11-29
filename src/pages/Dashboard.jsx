import React, { useState, useEffect } from "react";
import { useData } from "../context/DataProvider";
import axios from "axios";
import { API_URL } from "../constants/Constants";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard(props) {
  const { onLogout } = props;
  const { userHeaders } = useData();
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`, { headers: userHeaders });
      const users = response.data.data;
      setUserList(users);
    } catch (error) {
      if(error.response.data.errors) {
        return alert("Cannot get users");
      }
    }
  }

  useEffect(() => {
    if(userList.length === 0){
      getUsers();
    }
  });



  const sendMessage = () => {
    navigate('/message', {
      state: {userList} // Passing the users object as state
    });
  };
    
  

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Dashboard</h2>
      <p>This is my slack app. Loading of users here...</p>
      <button onClick={sendMessage}>Message</button>
      <button onClick={onLogout}>Logout</button>
      {/* {
        userList &&
        userList.map((individual) => {
            const { id, email } = individual;
            return (
              <div key={id}>
                  <p>ID: {id}</p>
                  <p>Email: {email}</p>
              </div>
            )
        })
      }
      { !userList && <div>No users available</div> } */}
    </div>
  );
}

export default Dashboard;
