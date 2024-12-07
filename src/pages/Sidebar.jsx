// import React, { useState } from "react";
// import MainContent from "./MainContent";
import "./Sidebar.css";

function Sidebar() {
    return (
      <div className="sidebar">
        <div className="sidebar-header">Avion School</div>
        <div className="sidebar-channels">
          <h4>Channels</h4>
          <ul>
            <li>#general</li>
            <li>#random</li>
            <li>#batch37</li>
          </ul>
          <h4>Direct Message</h4>
        </div>
      </div>
    );
  }
  
  export default Sidebar;
  