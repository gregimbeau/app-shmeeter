import React, { useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { useAtom } from "jotai";
import { userProfileAtom, formDataAtom } from "../state";
import { API_BASE_URL } from "../config"; 


const Profile = () => {
  // Accessing state:

  const [avatarUrl, setAvatarUrl] = useState(null);
  const [userProfile, setUserProfile] = useAtom(userProfileAtom);
  console.log(userProfile?.displayName);

  const [formData, setFormData] = useAtom(formDataAtom);

  const cld = new Cloudinary({
    cloud: {
      cloudName: "dmq3cpw6u",
    },
  });

  const transformedAvatar = avatarUrl
    ? cld
        .image(avatarUrl.split("/").pop().split(".")[0])
        .resize(fill().width(250).height(250))
    : null;

  const uploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: "dmq3cpw6u",
        uploadPreset: "eom5grdo",
        sources: ["local", "url", "camera", "facebook", "dropbox"],
        defaultSource: "local",
      },
      async (error, result) => {
        if (!error && result && result.event === "success") {
          const uploadedAvatarUrl = result.info.url;
          setAvatarUrl(uploadedAvatarUrl);

          setFormData((prev) => ({ ...prev, avatarUrl: uploadedAvatarUrl }));
        }
      }
    );
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = Cookies.get("token");

      if (token) {
        try {
          const response = await fetch(
            ` ${API_BASE_URL}/api/users/me`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const data = await response.json();
          setUserProfile(data);

          setFormData({
            username: data.username || "",
            displayName: data.displayName || "",
            email: data.email || "",
            description: data.description || "",
            avatarUrl: data.avatarUrl || "",
          });
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = async (e, updatedData = formData) => {
    if (e && e.preventDefault) {
      e.preventDefault(); // Check if e is an event to prevent default
    }

    try {
      const token = Cookies.get("token");

      console.log("Sending data:", updatedData); // <-- Add this log for sent data

      const response = await fetch(
        ` ${API_BASE_URL}/api/users/${userProfile.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      const data = await response.json();

      console.log("Received data:", data); // <-- Add this log for received data

      setUserProfile(data);

    } catch (error) {
      console.error("There was an error updating the profile:", error);
    }
  };

  if (!userProfile) return <p>You must log in first...</p>;

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-6 offset-3'>
          <div className='profile-container'>
            {/* Directly check for transformedAvatar */}
            {transformedAvatar ? (
              <div className='avatar-container'>
                <AdvancedImage cldImg={transformedAvatar} />
              </div>
            ) : (
              <img
                src={
                  avatarUrl ||
                  userProfile.avatarUrl ||
                  "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=identicon&f=y"
                }
                alt='User Avatar'
                className='avatar'
              />
            )}

            <section className='profile-header'>
              <h1>Welcome, {userProfile.displayName}</h1>
            </section>

            <section className='profile-content'>
              <h2>This Is Your Profile</h2>
              <table>
                <tbody>
                  <tr>
                    <td>Username:</td>
                    <td>{userProfile?.username}</td>
                  </tr>
                  <tr>
                    <td>DisplayName:</td>
                    <td>{userProfile.displayName}</td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td>{userProfile.email}</td>
                  </tr>
                  <tr>
                    <td>Description:</td>
                    <td>{userProfile.description}</td>
                  </tr>
                  {/* <tr>
                    <td>AvatarUrl:</td>
                    <td>{avatarUrl || userProfile.avatarUrl}</td>
                  </tr> */}
                </tbody>
              </table>
            </section>

            <section className='profile-edit'>
              <h2>Edit Profile</h2>
              <form onSubmit={(e) => handleProfileUpdate(e)}>
                <button className='btn btn--upload' onClick={uploadWidget}>
                  Upload Avatar or Change It
                </button>
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
                {/* <div className='form-group'>
                  <label>Avatar URL:</label>
                  <input
                    type='text'
                    name='avatarUrl'
                    value={formData.avatarUrl}
                    onChange={handleChange}
                    required
                  />
                </div> */}
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
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
