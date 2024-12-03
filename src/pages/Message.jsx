import { useState } from "react";
import { useData } from "../context/DataProvider";
import axios from 'axios';
import { API_URL } from "../constants/Constants";
import { useLocation, useNavigate } from "react-router-dom";

function Message() {
    const { userHeaders } = useData();
    const [receiver, setReceiver] = useState('');
    const [message, setMessage] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const {userList} = location.state || {};

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const messageInfo = {
                receiver_id: Number(receiver),
                receiver_class: "User",
                body: message
            };

            const response = await axios.post(`${API_URL}/messages`, messageInfo, { headers: userHeaders });

            const { data } = response;

            if(data.data) {
                alert("Successfully sent a message!");
                navigate('/dashboard');
            } else if (data.errors) {
                console.error(data.errors);
                alert("Failed to send message.")
            }

        } catch (error) {
                console.error(error);
                alert("An error occured while sending the message.");
            }
    };

    const handleChange = (event) => {
        setReceiver(event.target.value);
      };

      return (
        <div className="sendMessage">
            <form onSubmit={handleSubmit}>
                <label htmlFor="user">Send to:</label>
                <select id="user" value={receiver} onChange={handleChange}>
                    <option value="" disabled>Select ID</option>
                    {userList && Object.entries(userList).map(([id, user]) => (
                        <option key={id} value={id}>
                            {user.name} ({user.email})
                        </option>
                    ))}
                </select>
                <label htmlFor="message">Message:</label>
                <input
                    id="message"
                    type="text"
                    className="input-style"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                />
                <button type="submit">Send Message</button>
            </form>
        </div>
    );
};

export default Message;