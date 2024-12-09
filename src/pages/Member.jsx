// import { useState,useEffect } from "react";
// import { useData } from "../context/DataProvider";
// import axios from "axios";
// import { API_URL } from "../constants/Constants";

// const Member = () => {
//     const [email,setEmail] = useState(0);
//     const [userList, setUserList] = useState([]);
//     const [id,setId] = useState(0);
//     const [member_id,setMemberId] = useState(0);
//     const { userHeaders } = useData();


//     const getUsers = async () => {
//         try {
//           const response = await axios.get(`${API_URL}/users`, { headers: userHeaders });
//           const users = response.data.data;
//           setUserList(users);
//         } catch (error) {
//           if(error.response.data.errors) {
//             return alert("Cannot get users");
//           }
//         }
//       }


//       useEffect(() => {
//         if(userList.length === 0){
//           getUsers();
//         }
//       });

//       const handleAddMember = async (e) => {
//         e.preventDefault();
//         // Add authentication here
//         try {
//             const memberDetails = {
//                 id,
//                 member_id,
//               };
    
//           const response = await axios.post(`${API_URL}/channel/add_member`, memberDetails);
//           const { data, headers } = response;
//           if(data && headers) {
//             alert("Member Added.");
//           }
//         } catch(error) {
//           if(error.response.data.errors) {
//             return alert("Member already exists.");
//           }
//         }
//       };

//     const handleEmailChange = (event) => {
//         setEmail(event.target.value);
//     };

//     return(
//         <div>
//             <form onSubmit={handleAddMember}>
//             <input
//                type="text"
//                value={email}
//                onChange={handleEmailChange}
//             //    onKeyDown={handleAddMember}
//                placeholder="Enter email address"
//             />
//             <button>Done</button>
//             </form>
//         </div>
//     );
// }

// export default Member;