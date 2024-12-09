import React, { useState, useEffect } from "react";
import { useData } from "../context/DataProvider";
import axios from "axios";
import { API_URL } from "../constants/Constants";
import { useLocation } from "react-router-dom";
import "./Dashboard.css";
import DirectMessage from "./DirectMessage";
import Channel from "./Channel";
import { useNavigate } from "react-router-dom";

//import Member from "./Member";

function Dashboard(props) {
  // const { onLogout } = props;
  const { userHeaders } = useData();
  const [userList, setUserList] = useState([]);
  const location = useLocation();
  const [message,setMessage] = useState('');
  const [messages,setMessages] = useState([]);
  const { user } = location.state || {};
  const [selectedDM,setSelectedDM] = useState(null);
  const [showHideChannel,setShowHideChannel] = useState(false);
  const [showHide,setShowHide] = useState(false);
  const [channels,setChannels] = useState([]);
  const navigate = useNavigate();
  // const { handleHeaders } = useData();
  //const [showMember,setShowMember] = useState(false);


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

  useEffect(() => {
    const storedChannels = localStorage.getItem("channels");
    if (storedChannels.length === 0) {
      console.log(storedChannels.length);
      setChannels(JSON.parse(storedChannels));
    } else {
      // Optional: Initialize default channels if needed
      const defaultChannels = ["General", "Random"];
      setChannels(defaultChannels);
      localStorage.setItem("channels", JSON.stringify(defaultChannels));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("channels", JSON.stringify(channels));
  }, [channels]);

  const addChannel = (channelName) => {
    if (channelName && !channels.includes(channelName)) {
      setChannels([...channels, channelName]);
    } else {
      alert("Channel name is empty or already exists!");
    }
  };

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
    setShowHide(true);
  };

  const handleNewChannel = () => {
    setShowHideChannel(true);
  };

  const handleChannelCancel = (value) => {
    setShowHideChannel(value);
  };

  const handleLogOut = ()=>{
    navigate('/login');
  };
//  const openMemberWindow = () => {
//   setShowMember(true);
//  };
 
  return (
    <div className="dashboard-container">
    <div className="sidebar">
      <div className="dashBoardHeader">
        <h1>Avion School</h1>
        <button className="logOutBtn" onClick={handleLogOut}>Log out</button>
      </div>
      <div className="channels">
         <div className="channel-list">
         <h1>Channels</h1>
        <ul>
          {channels.map((channel, index) => (
            <li 
              key={index}
              onClick={() => setShowHide(false)}
            >
              #{channel}
            </li>
          ))}
        </ul>
        </div>
      <button onClick={handleNewChannel}>New Channel</button>
      {showHideChannel && <Channel cancelClick={handleChannelCancel} name="Add New Channel" onAddChannel={addChannel} />}
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

    {showHide && <DirectMessage sender={user} receiver={selectedDM}/> }
    {!showHide && <div className="main-content">
      <div className="header">
        <h2>#General</h2>
        <button className="add-members">+ Add Members</button>
        {/* {showMember && <Member/>} */}
      </div>
      <div className="chat-window">
        <div className="chat-bubble">
          <strong>Phoebe:</strong> Welcome to #General!
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
     </div>
    }
  </div>
      
);
}

export default Dashboard;
