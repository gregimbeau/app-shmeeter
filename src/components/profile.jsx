import React, { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { GlobalStateContext } from "../GlobalStateContext";
import { Image } from "cloudinary-react";

const Profile = () => {
  const { state, dispatch } = useContext(GlobalStateContext);

  // Accessing state:
  console.log(state.user?.displayName);

  const [avatarUrl, setAvatarUrl] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
    email: "",
    password: "",
    description: "",
  });

  const uploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: "dmq3cpw6u",
        uploadPreset: "eom5grdo",
        sources: ["local", "url", "camera", "facebook", "dropbox"],
        defaultSource: "local",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          const uploadedAvatarUrl = result.info.url;
          setAvatarUrl(uploadedAvatarUrl);

          // Remove or comment this line
          // storeAvatarOnServer(uploadedAvatarUrl);
        } else if (error) {
          console.error("Cloudinary upload error:", error);
        }
      }
    );
  };

  const storeAvatarOnServer = async (url) => {
    if (!userProfile || !userProfile.id) {
      console.error("No user profile loaded.");
      return;
    }

    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `https://app-shmeeter-server-production.up.railway.app/api/users/${userProfile.id}/avatar`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ avatarUrl: url }),
        }
      );

      if (response.status === 405) {
        console.error("PUT method not allowed at this endpoint.");
      } else if (!response.ok) {
        console.error("Error with request:", response.statusText);
      }

      if (response.headers.get("content-type").includes("application/json")) {
        const data = await response.json();
        if (data.success) {
          console.log("Avatar stored successfully on the server!");
        } else {
          console.error("Error storing avatar on server:", data.message);
        }
      } else {
        // Handle non-JSON response (e.g., plain text or HTML)
        const text = await response.text();
        console.error("Error from server:", text);
      }
    } catch (error) {
      console.error("Error storing avatar:", error);
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = Cookies.get("token");

      if (token) {
        try {
          const response = await fetch(
            "https://app-shmeeter-server-production.up.railway.app/api/users/me",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const data = await response.json();
          setUserProfile(data);
          dispatch({ type: "SET_USER", payload: data }); // Update the global state with fetched user data
          setAvatarUrl(data.avatarUrl || null); // Set the avatarUrl from the fetched data

          setFormData({
            username: data.username || "",
            displayName: data.displayName || "",
            email: data.email || "",
            description: data.description || "",
          });
          setAvatarUrl(data.avatarUrl || null); // Set the avatarUrl from the fetched data
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
      setUserProfile(data);
      dispatch({ type: "SET_USER", payload: data });

      setFormData({
        username: data.username || "",
        displayName: data.displayName || "",
        email: data.email || "",
        description: data.description || "",
      });

      setAvatarUrl(data.avatarUrl || null); // Set the avatarUrl from the fetched data

      if (data.id) {
        console.log("Profile updated!");

        setUserProfile((prev) => ({ ...prev, ...formData }));
        dispatch({ type: "SET_USER", payload: formData }); // Update the global state after the profile is updated
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
          <div className='profile-container'>
            {avatarUrl && (
              <div className='avatar-container'>
                <Image
                  cloudName='dmq3cpw6u'
                  publicId={avatarUrl}
                  width='200'
                  height='200'
                  crop='thumb'
                />
              </div>
            )}

            <div className='profile-header'>
              <h1>Welcome, {userProfile.displayName}</h1>
            </div>
            <button className='btn btn--upload' onClick={uploadWidget}>
              Upload Avatar
            </button>
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
                  <label>Displayed Name:</label>
                  <input
                    type='text'
                    name='displayName'
                    value={formData.displayName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className='form-group'>
                  <label>Description:</label>
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
