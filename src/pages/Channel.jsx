// src/components/Channel.js
import React, { useState,useEffect } from "react";
import './Channel.css';
import axios from "axios";
import { API_URL } from "../constants/Constants";
import { useData } from "../context/DataProvider";

function Channel({ cancelClick, onAddChannel }) {
  const [name, setName] = useState("");
  const [user_ids,setUserIds] = useState([]);
  const { userHeaders } = useData();
  const [userList, setUserList] = useState([]);




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



  const handleSubmit = async(e) =>{
   
    e.preventDefault();
      const channelDetails = {
        name,
        user_ids
      }

      try {
        const response = await axios.post(`${API_URL}/channels`, channelDetails, { headers: userHeaders });
        console.log(response.data);
      } catch (error) {
        if (error.response) {
          console.error("Error Response:", error.response.data); // Server error response
        } else if (error.request) {
          console.error("Error Request:", error.request); // No response received
        } else {
          console.error("Error Message:", error.message); // Something else
        }
      }
  }

  const handleKeyDown = (event) => {
    if(event.key === "Enter") {
      onAddChannel(name);
      setName("");
      cancelClick(false);
    }
  }

  const handleChange = (e) => {
    // Get all selected options as an array of values
    const selectedValues = Array.from(e.target.selectedOptions, option => parseInt(option.value));
    setUserIds(selectedValues);
  };

  const handleCancel = () => {
    cancelClick(false);
  };

  return (
    <div className="channel">
      <form onSubmit={handleSubmit}>
      <input
        className="newChannelNameInput"
        type="text"
        value={name}
        onKeyDown={handleKeyDown}
        onChange={(e) => setName(e.target.value)}
        placeholder="New channel name"
      />
       <select className="userChannelList" multiple value={user_ids} onChange={handleChange}>
       <option value="">Select channel members</option>
        {/* Map over options array to create <option> elements */}
        {userList.map((user) => (
          <option key={user.id} value={user.id}>
            {user.email}
          </option>
        ))}
       </select>
      <div className="channelFooter">
        <button className="channelNameButton">Add Channel</button>
      </div>
      </form>
      <button className="channelCancelBtn" onClick={handleCancel}>Cancel</button>   
    </div>
  );
}

export default Channel;