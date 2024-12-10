import { useState } from "react";
import "./DirectMessage.css";
import axios from "axios";
import { API_URL } from "../constants/Constants";
import { useData } from "../context/DataProvider";

function DirectMessage(props){

    const [message,setMessage] = useState('');
    const [messages,setMessages] = useState([""]);
    const [messageDetails,setMessageDetails] = useState({
      receiver_id:0,
      receiver_class:"",
      body:""
    })
    const { userHeaders } = useData();


    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          handleSendMessage();
        }
      };
    

      const updateMessageDetails = (key, value) => {
        setMessageDetails((prevState) => ({
          ...prevState,
          [key]: value, // Update the specific key with the new value
        }));
      };
      
     

      const handleMessageChange = (event) => {
        setMessage(event.target.value);
         // Example Usage:
        updateMessageDetails("receiver_id", props.receiverid );
        updateMessageDetails("receiver_class", "User");
        updateMessageDetails("body", event.target.value); // Update message state when user types
      };
    
      const handleSendMessage = async(e)=>{
        e.preventDefault();
        try {
          const response = await axios.post(`${API_URL}/messages`, messageDetails, { headers: userHeaders });
          console.log(response.data);
          if (message.trim()) {

            const response = await axios.get(`${API_URL}/messages?receiver_id=${props.receiverid}&receiver_class=User`, { headers: userHeaders });
            console.log(response.data);
            const listofMessages = response.data.data;

            listofMessages.map((msg) => {
              return setMessages([...messages, msg.body ])
            });
            
           // Add the new message to the messages array (...messages) => 
  
            setMessage('');  // Clear the input field after sending
      }
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
          name="body"
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