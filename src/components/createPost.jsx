import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { API_BASE_URL } from "../config"; 


const CreatePost = ({ onPostCreated, onRefreshPosts }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserProfile = async () => {
    const token = Cookies.get("token");

    if (token) {
      try {
        setLoading(true); // start loading
        const response = await fetch(
          `${API_BASE_URL}/api/users/me`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const text = await response.text();
          throw new Error(`HTTP error ${response.status}: ${text}`);
        }

        const profile = await response.json();
        setUserProfile(profile);
        setLoading(false); // end loading
      } catch (error) {
        // console.error("There was an error fetching user profile:", error);
        setError(error.message || "Failed to fetch user profile"); // set error
        setLoading(false); // end loading
      }
    } else {
      console.log("No token found. User is not authenticated.");
      setError("User is not authenticated. You must log in first"); // set error
      setLoading(false); // end loading
    }
  };

  const [userProfile, setUserProfile] = useState(null);

  const [postData, setPostData] = useState({
    text: "",
    user: null,
  });
  useEffect(() => {
    if (userProfile) {
      setPostData((prev) => ({ ...prev, author: userProfile.id }));
    }
  }, [userProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentJwtToken = Cookies.get("token");

    const requestBody = {
      data: {
        text: postData.text,
        author: postData.author,
      },
    };
    console.log(postData);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/posts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentJwtToken}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        if (responseData && responseData.data) {
          setMessage("Votre post a été créé avec succès!");
          if (typeof onPostCreated === "function") {
            onPostCreated({
              ...responseData.data,
              userDisplayName: userDisplayName,
            });
          }
          onRefreshPosts(); // Refresh posts after successfully creating a new one

          navigate("/posts"); // navigate to the posts page
          setPostData((prev) => ({ ...prev, text: "" })); // réinitialiser le texte
        } else {
          throw new Error("Unexpected response format from the server.");
        }
      } else {
        const errorData = await response.json();
        throw new Error(
          `Erreur du serveur: ${errorData.error || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Erreur lors de la création du post:", error);
    }
    fetchUserProfile();
  };
  useEffect(() => {
    fetchUserProfile();
  }, []);
  console.log("Loading:", loading);

  return (
    <div className='posts-container'>
      <h3>Create a Post</h3>

      {message && <div className='success'>{message}</div>}
      {error && <div className='error'>{error}</div>}

      <form onSubmit={handleSubmit} className='form-group'>
        <div>
          <label>Text:</label>
          <input
            type='text'
            name='text'
            value={postData.text}
            onChange={handleChange}
            required
            className='form-input' // Add class for styling
          />
        </div>

        <button
          type='submit'
          className='btn btn--primary' // Apply button styles
          disabled={loading || !userProfile}>
          Publish
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
