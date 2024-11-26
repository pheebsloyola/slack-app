import React, { useState, useEffect } from "react";
// import { useData } from "../context/DataProvider";
import axios from "axios";
import { API_URL } from "../constants/Constants";

function Dashboard(props) {
  const { onLogout } = props;
  // const { userHeaders } = useData();
  const [userList, setUserList] = useState([]);

  const getUsers = async () => {
    
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Dashboard</h2>
      <p>This is my slack app. Loading of users here...</p>
      <button onClick={onLogout}>Logout</button>
      {
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
      { !userList && <div>No users available</div> }
    </div>
  );
}

export default Dashboard;
