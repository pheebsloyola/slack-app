import React, { useState, useEffect } from "react";
import { useData } from "../context/DataProvider";
import axios from "axios";
import { API_URL } from "../constants/Constants";
import { useLocation } from "react-router-dom";
import "./Dashboard.css";
import DirectMessage from "./DirectMessage";
import AddNewChannel from "./AddNewChannel";
import { useNavigate } from "react-router-dom";
import Channel from "./Channel";

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
  const [selectedDMID,setSelectedDMID] = useState(null);
  const [showHideNewChannel,setShowHideNewChannel] = useState(false);
  const [showHide,setShowHide] = useState(true);
  const [showHideChannel,setShowHideChannel] = useState(false);
  const [showHideDM,setShowHideDM] = useState(false);
  const [channels,setChannels] = useState([]);
  const navigate = useNavigate();
  const [channelTitle,setChannelTitle] = useState("General");
  const [channelID,setChannelID] = useState();
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

  const getAllChannels = async () => {
    try {
      const response = await axios.get(`${API_URL}/channels`, { headers: userHeaders });
      const channelList = response.data.data;
      setChannels(channelList);
    } catch (error) {
      if(error.response.data.errors) {
        return alert("Cannot get channels");
      }
    }
  }
 
  useEffect(() => {
    if(userList.length === 0){
      getUsers();
    }
  });

  useEffect(() => {
      getAllChannels();
  });


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
  
  const handleSelectDM = (email,id) => {
    const receiverName = email.split('@')[0];
    setSelectedDM(receiverName);
    setSelectedDMID(id);
    setShowHideNewChannel(false);
    setShowHideChannel(false);
    setShowHide(false);
    setShowHideDM(true);
  };

  const handleNewChannel = () => {
    setShowHideNewChannel(true);
  };

  const handleChannelCancel = (value) => {
    setShowHideNewChannel(value);
  };

  const handleLogOut = ()=>{
    navigate('/login');
  };

  const handleChannelClick = (channelid,channelTitle) =>{
    setChannelID(channelid);
    setChannelTitle(channelTitle);
    setShowHideChannel(true);
    setShowHideNewChannel(false);
    setShowHide(false);
    setShowHideDM(false);
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
          {channels.map((channel) => (
            <li 
              key={channel.id}
              onClick={() => handleChannelClick(channel.id,channel.name)}
            >
              #{channel.name}
            </li>
          ))}
        </ul>
        </div>
      <button onClick={handleNewChannel}>New Channel</button>
      {showHideNewChannel && <AddNewChannel cancelClick={handleChannelCancel} name="Add New Channel" onAddChannel={addChannel} />}
      </div>
      <div className="direct-messages">
        <h3>Direct Messages</h3>
        <ul>
          {userList.map((user) => (
            <li 
              key={user.id}
              onClick={() => handleSelectDM(user.email,user.id)}
            >
              {user.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
    {showHideChannel && <Channel channelID={channelID} channelTitle={channelTitle} sender={user} receiver={selectedDM} receiverid={selectedDMID}/> }
    {showHideDM && <DirectMessage sender={user} receiver={selectedDM} receiverid={selectedDMID}/> }
    {showHide && <div className="main-content">
      <div className="header">
        <h2>#{channelTitle}</h2>
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
