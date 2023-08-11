import React, { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { GlobalStateContext } from "../GlobalStateContext";

const Profile = () => {
  const { state, dispatch } = useContext(GlobalStateContext);
  // Accessing state:
  console.log(state.displayName);

  const [userProfile, setUserProfile] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
    email: "",
    password: "",
    description: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = Cookies.get("token");

      if (token) {
        try {
          const response = await fetch("https://app-shmeeter-server-production.up.railway.app/api/users/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await response.json();
          setUserProfile(data);
          dispatch({ type: "SET_USER", payload: data }); // Update the global state with fetched user data

          setFormData({
            username: data.username || "",
            displayName: data.displayName || "",
            email: data.email || "",
            description: data.description || "",
          });
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `https://app-shmeeter-server-production.up.railway.app/api/users/${userProfile.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (data.id) {
        console.log("Profile updated!");

        setUserProfile((prev) => ({ ...prev, ...formData }));
        dispatch({ type: "SET_USER", payload: formData }); // Update the global state after profile is updated
      } else {
        console.error("Error updating profile:", data.message);
      }
    } catch (error) {
      console.error("There was an error updating the profile:", error);
    }
  };

  if (!userProfile) return <p>You must log in first...</p>;

 return (
   <div className='container'>
     <div className='row'>
       <div className='col-6 col-offset-3'>
         {" "}
         {/* Assuming you use a 12 column grid */}
         <div className='profile-container'>
           <div className='profile-header'>
             <h1>Welcome, {userProfile.displayName}</h1>
           </div>

           <div className='profile-content'>
             <h2>This is your profile</h2>

             <table>
               <tbody>
                 <tr>
                   <td>Username:</td>
                   <td>{state.user?.username}</td>
                 </tr>
                 <tr>
                   <td>displayName:</td>
                   <td>{userProfile.displayName}</td>
                 </tr>
                 <tr>
                   <td>Email:</td>
                   <td>{userProfile.email}</td>
                 </tr>
                 <tr>
                   <td>Role:</td>
                   <td>{userProfile.description}</td>
                 </tr>
               </tbody>
             </table>

             <h2>Edit Profile</h2>

             <form onSubmit={handleProfileUpdate}>
               <div className='form-group'>
                 <label>displayName:</label>
                 <input
                   type='text'
                   name='displayName'
                   value={formData.displayName}
                   onChange={handleChange}
                   required
                 />
               </div>

               <div className='form-group'>
                 <label>description:</label>
                 <textarea
                   name='description'
                   rows='5'
                   value={formData.description}
                   onChange={handleChange}
                   required
                 />
               </div>

               <button className='btn btn--primary' type='submit'>
                 Update Profile
               </button>
             </form>
           </div>
         </div>
       </div>
     </div>
   </div>
 );

};

export default Profile;
