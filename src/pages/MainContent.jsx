// import React, { useState } from "react";
import "./MainContent.css";

function MainContent() {
    return (
      <div className="main-content">
        <div className="channel-header">
          <h2>#general</h2>
          <button className="add-members-btn">+ Add Members</button>
        </div>
        <div className="message-list">
          {/* Example messages */}
          <div className="message">
            <div className="message-header">
              <span className="message-user">Phoebe</span>
              <span className="message-time">8:15 PM</span>
            </div>
            <p className="message-text">Welcome to #general!</p>
          </div>
        </div>
      </div>
    );
  }
  
  export default MainContent;
  