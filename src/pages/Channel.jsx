// src/components/Channel.js
import React, { useState } from "react";
import './Channel.css';

function Channel({ cancelClick, name, onAddChannel }) {
  const [newChannel, setNewChannel] = useState("");

  const handleAddChannel = () => {
    if (newChannel.trim()) {
      onAddChannel(newChannel);
      setNewChannel("");
      cancelClick(false);
    }
  };

  const handleKeyDown = (event) => {
    if(event.key === "Enter") {
      onAddChannel(newChannel);
      setNewChannel("");
      cancelClick(false);
    }
  }

  const handleCancel = () => {
    cancelClick(false);
  };

  return (
    <div className="channel">
      <h3>{name}</h3>
      <input
        className="newChannelNameInput"
        type="text"
        value={newChannel}
        onKeyDown={handleKeyDown}
        onChange={(e) => setNewChannel(e.target.value)}
        placeholder="New channel name"
      />
      <div className="channelFooter">
        <button className="channelNameButton" onClick={handleAddChannel}>Add Channel</button>
        <button className="channelCancelBtn" onClick={handleCancel}>Cancel</button>
      </div>
       
    </div>
  );
}

export default Channel;