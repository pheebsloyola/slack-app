import React, { useState, useEffect } from "react";
import { useData } from "../context/DataProvider";
import axios from "axios";
import { API_URL } from "../constants/Constants";
import { useLocation } from "react-router-dom";
import "./Dashboard.css";
import DirectMessage from "./DirectMessage";

function Dashboard(props) {
  // const { onLogout } = props;
  const { userHeaders } = useData();
  const [userList, setUserList] = useState([]);
  const location = useLocation();
  const [message,setMessage] = useState('');
  const [messages,setMessages] = useState([]);
  const { user } = location.state || {};
  const [selectedDM,setSelectedDM] = useState(null);
  const [showDM,setShowDM] = useState(false);

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
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);  // Update message state when user types
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, message]); // Add the new message to the messages array
      setMessage('');  // Clear the input field after sending
    }
  };

  // const sendMessage = () => {
  //   navigate('/message', {
  //     state: {userList} // Passing the users object as state
  //   });
  // };
  
  const handleSelectDM = (item) => {
    const receiverName = item.split('@')[0];
    setSelectedDM(receiverName);
    setShowDM(true);
  };
  

  return (
    // <div style={{ textAlign: "center" }}>
    //   <h2>Dashboard</h2>
    //   <p>This is my slack app. Loading of users here...</p>
    //   <button onClick={sendMessage}>Message</button>
    //   <button onClick={onLogout}>Logout</button>
    //   {/* {
    //     userList &&
    //     userList.map((individual) => {
    //         const { id, email } = individual;
    //         return (
    //           <div key={id}>
    //               <p>ID: {id}</p>
    //               <p>Email: {email}</p>
    //           </div>
    //         )
    //     })
    //   }
    //   { !userList && <div>No users available</div> } */}

      
    // </div>

    <div className="dashboard-container">
    {/* Sidebar */}
    <div className="sidebar">
      <h1>Avion School</h1>
      <div className="channels">
        <h3>Channels</h3>
        <ul>
          <li>#general</li>
          <li>#random</li>
          <li>#batch37</li>
        </ul>
      </div>
      <div className="direct-messages">
        <h3>Direct Messages</h3>
        <ul>
          {userList.map((user) => (
            <li 
              key={user.id}
              onClick={() => handleSelectDM(user.email)}
            >
              {user.email}
            </li>
          ))}
        </ul>
      </div>
    </div>

    {showDM && <DirectMessage sender={user} receiver={selectedDM}/> }
    {!showDM && <div className="main-content">
      <div className="header">
        <h2>#general</h2>
        <button className="add-members">+ Add Members</button>
      </div>
      <div className="chat-window">
        <div className="chat-bubble">
          <strong>Phoebe:</strong> Welcome to #general!
        </div>
        {messages.map((msg, index) => (
          <div className="chat-bubble self" key={index}>
           <strong>{user}: </strong>{msg}
          </div>
        ))}
      </div>
      
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          onKeyDown={handleKeyDown}
          placeholder="Jot something down"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>}
    {/* Main Content Area */}
    
  </div>
      
);
}

export default Dashboard;
