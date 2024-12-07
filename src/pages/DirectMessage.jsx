import { useState } from "react";
import "./DirectMessage.css";

function DirectMessage(props){

    const [message,setMessage] = useState('');
    const [messages,setMessages] = useState([]);


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

    return(
         <div className="direct-message-content">
          <div className="header">
          <h2>{props.receiver}</h2>
         </div>
        <div className="chat-window">
        {messages.map((msg, index) => (
          <div className="chat-bubble self" key={index}>
           <strong>{props.sender}: </strong>{msg}
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
    );
}

export default DirectMessage;