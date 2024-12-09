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

  const handleSubmit = async () => {
    // e.preventDefault();
    // Add authentication here
    try {
        const channelDetails = {
            name,
            user_ids,
          };

      const response = await axios.get(`${API_URL}/channels`,channelDetails);
      const { data, headers } = response;
      if(data && headers) {

        alert('Channel Created.')
      }
    } catch(error) {
      if(error.response.data.errors) {
        return alert("Channel already exists.");
      }
    }
  };

  const handleKeyDown = (event) => {
    if(event.key === "Enter") {
      onAddChannel(name);
      setName("");
      cancelClick(false);
    }
  }

  const handleChange = (e) => {
    // Get all selected options as an array of values
    const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
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
       <select multiple value={user_ids} onChange={handleChange}>
       <option value="">-- Select users --</option>
        {/* Map over options array to create <option> elements */}
        {userList.map((user) => (
          <option key={user.id} value={user.id}>
            {user.email}
          </option>
        ))}
       </select>
       <div>Members : {user_ids.join(', ')}</div>
      <div className="channelFooter">
        <button className="channelNameButton">Add Channel</button>
      </div>
      </form>
      <button className="channelCancelBtn" onClick={handleCancel}>Cancel</button>   
    </div>
  );
}

export default Channel;