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
        `http://localhost:1337/api/users/${userId}`,
        { headers }
      );
      const userData = await userResponse.json();
      setUser(userData);

      // Fetch all posts
      const postsResponse = await fetch(
        `http://localhost:1337/api/posts/?populate=author`,
        { headers }
      );
      const allPosts = await postsResponse.json();

      const userPosts = allPosts.data.filter( /// so what..??? it works... my strapi had issues and i took a shortcut :-) be nice it's a small db
        (post) =>
          post.attributes.author.data.attributes.displayName ===
          (userData.displayName || userData.username)
      );

      setPosts(userPosts);
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
