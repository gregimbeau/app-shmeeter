import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchUserIdByUsername } from "../utilities/userMapping";

const UserProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  // This is where you get your JWT. In this example, it's fetched from localStorage.
  const jwt = localStorage.getItem("jwt");

useEffect(() => {
  const fetchUserProfile = async () => {
    let userId;
    if (username) {
      userId = await fetchUserIdByUsername(username);
      if (!userId) {
        console.error("Username not found:", username);
        return;
      }
    } else {
      console.error("No valid username provided.");
      return;
    }

    const headers = {
      Authorization: `Bearer ${jwt}`,
    };

    // Fetch user's profile based on ID
    const userResponse = await fetch(
      `https://app-shmeeter-server-production.up.railway.app/api/users/${userId}`,
      { headers }
    );
    const userData = await userResponse.json();
    setUser(userData);

    // Fetch user's posts using the filter
    const postsResponse = await fetch(
      `https://app-shmeeter-server-production.up.railway.app/api/posts?filters[author][id][$eq]=${userId}`,
      { headers }
    );
    const userPosts = await postsResponse.json();

    setPosts(userPosts.data); // Assuming the posts are inside the 'data' key of the response
  };

  fetchUserProfile();
}, [username, jwt]);

  return (
    <div>
      {user && (
        <div>
          <h1>{user.displayName || user.username}</h1>
          <table>
            <tbody>
              <tr>
                <td>Username:</td>
                <td>{user.username}</td>
              </tr>
              <tr>
                <td>Display Name:</td>
                <td>{user.displayName}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td>Description:</td>
                <td>{user.description}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <h2>User Posts:</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.attributes.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;
