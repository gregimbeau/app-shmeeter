import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchUserIdByUsername } from "../utilities/userMapping";

const UserProfile = () => {
  const { id, username } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      let endpoint;

      if (username) {
        // Fetch user ID based on username
        const userId = await fetchUserIdByUsername(username);

        if (!userId) {
          console.error("Username not found:", username);
          return;
        }

        endpoint = `http://localhost:1337/api/users/${userId}`;
      } else {
        console.error("No valid username provided.");
        return;
      }

      // Fetch user profile based on ID or username
      const response = await fetch(endpoint);

      if (!response.ok) {
        console.error("Server response error", response.statusText);
        return;
      }

      try {
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    };

    fetchUserProfile();
    fetchUserPosts();
  }, [username]);

  const fetchUserPosts = async () => {
    if (user && user.username) {
      const response = await fetch(
        `http://localhost:1337/api/posts?author=${user.username}`
      );

      if (!response.ok) {
        console.error("Server response error", response.statusText);
        return;
      }

      try {
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  };

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
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;
