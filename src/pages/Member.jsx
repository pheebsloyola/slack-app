import { useState,useEffect } from "react";
import { useData } from "../context/DataProvider";
import axios from "axios";
import { API_URL } from "../constants/Constants";

const Member = (props) => {
    const [userList, setUserList] = useState([]);
    const [id,setId] = useState(0);
    const [member_id,setMemberId] = useState(0);
    const { userHeaders } = useData();


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

      const handleAddMember = async(e) =>{
        
        e.preventDefault();
          const memberDetails = {
            id,
            member_id
          }
    
          try {
            const response = await axios.post(`${API_URL}/channel/add_member`, memberDetails, { headers: userHeaders });
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

    const handleChange = (e) => {
        setMemberId(parseInt(e.target.value));
        setId(props.channelID);
    };

    return(
        <div>
            <form onSubmit={handleAddMember}>
            <select className="userChannelList" value={member_id} onChange={handleChange}>
            <option value="">Select channel members</option>
            {userList.map((user) => (
              <option key={user.id} value={user.id}>
                {user.email}
              </option>
            ))}
            </select>
            <button>Done</button>
            </form>
        </div>
    );
}

export default Member;