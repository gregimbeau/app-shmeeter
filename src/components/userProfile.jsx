import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchUserIdByUsername } from "../utilities/userMapping";

const UserProfile = () => {
  const { username } = useParams();
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

        // Fetch user's posts
        const postsResponse = await fetch(
          `http://localhost:1337/api/posts?author=${data.id}`
        );

        if (!postsResponse.ok) {
          console.error("Error fetching posts:", postsResponse.statusText);
          return;
        }

        const postsData = await postsResponse.json();
        setPosts(postsData.data);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    };

    fetchUserProfile();
  }, [username]);

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
