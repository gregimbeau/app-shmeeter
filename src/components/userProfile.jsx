import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchUserIdByUsername } from "../utilities/userMapping";
import { useAtom } from "jotai";
import { userAtom, postsAtom } from "../state";
import { API_BASE_URL } from "../config"; 


const UserProfile = () => {
  const { username } = useParams();

  // Utilisez Jotai pour gérer l'état
  const [user, setUser] = useAtom(userAtom);
  const [posts, setPosts] = useAtom(postsAtom);

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

      const userResponse = await fetch(
        ` ${API_BASE_URL}/api/users/${userId}`,
        { headers }
      );
      const userData = await userResponse.json();
      setUser(userData);

      const postsResponse = await fetch(
        ` ${API_BASE_URL}/api/posts?filters[author][id][$eq]=${userId}`,
        { headers }
      );
      const userPosts = await postsResponse.json();

      setPosts(userPosts.data);
    };

    fetchUserProfile();
  }, [username, jwt, setUser, setPosts]);

  return (
    <div className='container user-profile-container'>
      <div className='row'>
        <div className='col-6'>
          {" "}
          {/* Assuming you want a centered two-column layout */}
          {user && (
            <div className='user-content'>
              <div className='user-header'>
                <img
                  src={
                    user.avatarUrl ||
                    "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=identicon&f=y"
                  }
                  alt="User's Avatar"
                  className='avatar'
                />{" "}
                <h1>{user.displayName || user.username}</h1>
              </div>

              <table>
                <thead>
                  <tr></tr>
                </thead>
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
          <div className='user-posts'>
            <h2>User Posts:</h2>
            <ul>
              {posts.map((post) => (
                <li key={post.id}>{post.attributes.text}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
