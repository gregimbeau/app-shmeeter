import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserProfile from "./userProfile";
import { useAtom } from "jotai";
import CreatePost from "@/components/createPost";
import {
  postsAtom,
  loadingAtom,
  errorAtom,
  sortOrderAtom,
  isUserLoggedInAtom,
  userLikesAtom,
  loginStateAtom,
} from "../state";
import Likes from "./likes.jsx";
import { API_BASE_URL } from "../config";

const PostsPage = () => {
  const [posts, setPosts] = useAtom(postsAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [error, setError] = useAtom(errorAtom);
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom);
  const [isUserLoggedIn, setIsUserLoggedIn] = useAtom(isUserLoggedInAtom);
  const [userLikes, setUserLikes] = useAtom(userLikesAtom);
  const [loginState, setLoginState] = useAtom(loginStateAtom);
  const reloadPostsList = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/posts/?populate=*`,
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${loginState.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const jsonData = await response.json();
        const reversedData = jsonData.data.reverse();
        setPosts(reversedData);
      } else {
        throw new Error("Erreur lors de la requête");
      }
    } catch (error) {
      console.error("Erreur de requête : ", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete post. Status: ${response.status}`);
      }

      const newPosts = posts.filter((post) => post.id !== id);
      setPosts(newPosts);
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Erreur lors de la suppression. Veuillez réessayer.");
    }
  };

  const handleLike = async (postId, likesCount) => {
    try {
      if (!loginState || !loginState.token) {
        throw new Error("User is not logged in");
      }

      const response = await fetch(
        `${API_BASE_URL}/api/posts/${postId}?populate=*`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${loginState.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des détails du post");
      }

      const postData = await response.json();
      const currentUsersLikes = postData.data.attributes.users_likes.data.map(
        (user) => user.id.toString()
      );
      const userHasLiked = currentUsersLikes.some(
        (userId) => userId === loginState.userId.toString()
      );
      const newUsersLikes = userHasLiked
        ? currentUsersLikes.filter(
            (userId) => userId !== loginState.userId.toString()
          ) // Dislike
        : [...currentUsersLikes, loginState.userId.toString()]; // Like

      const likeData = {
        data: {
          like: userHasLiked ? likesCount - 1 : likesCount + 1,
          users_likes: newUsersLikes,
        },
      };

      const updateResponse = await fetch(
        `${API_BASE_URL}/api/posts/${postId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${loginState.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(likeData),
        }
      );

      if (updateResponse.ok) {
        reloadPostsList(); // Make sure you're using the right function here
      } else {
        throw new Error("Erreur lors de la mise à jour du like");
      }
    } catch (error) {
      console.error("Erreur lors de la requête: ", error);
    }
  };

  const checkPostAttributes = (posts) => {
    posts.forEach((post) => {
      if (!post.attributes) {
        console.error("Post missing attributes:", post);
      } else if (!post.attributes.text) {
        console.error("Post attributes missing text:", post);
      }
    });
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/posts?sort=createdAt:${sortOrder}&populate=author`
      );
      const result = await response.json();
      console.log(result);

      const ids = new Set();
      result.data.forEach((post) => {
        if (!post.id) {
          console.error("Un post n'a pas d'ID:", post);
        } else if (ids.has(post.id)) {
          console.error("Duplication d'ID détectée pour le post:", post);
        } else {
          ids.add(post.id);
        }
      });

      if (result.data && Array.isArray(result.data)) {
        // Sort the posts here
        const sortedPosts = result.data.slice(); // Create a copy of the array
        sortedPosts.sort((a, b) => {
          // Assuming you have a 'createdAt' field in your post attributes
          const dateA = new Date(a.attributes.createdAt);
          const dateB = new Date(b.attributes.createdAt);

          if (sortOrder === "desc") {
            return dateB - dateA; // Descending order
          } else {
            return dateA - dateB; // Ascending order
          }
        });

        setPosts(sortedPosts);
        checkPostAttributes(sortedPosts); // Vérification des attributs après avoir défini les articles
      } else {
        console.error("L'API n'a pas renvoyé le format attendu :", result);
        setError("Format de données inattendu.");
      }

      setLoading(false);
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des articles :",
        error
      );
      setError("Erreur lors de la récupération des articles.");
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setIsUserLoggedIn(true);
    }

    fetchPosts();
  }, [sortOrder, setIsUserLoggedIn]);

  if (loading) {
    return <p>Chargement des posts...</p>;
  }

  if (error) {
    return <p>Erreur lors du chargement des posts: {error}</p>;
  }

  function getDisplayName(post) {
    const displayName =
      post?.attributes?.author?.data?.attributes?.displayName || "No name";
    return displayName;
  }

  const currentUserId = Number(localStorage.getItem("userId"));
  function safelyAccess(obj, path) {
    return path.split(".").reduce((acc, segment) => {
      return acc && acc[segment];
    }, obj);
  }

  return (
    <div className='container'>
      <section>
        <h1>Welcome on My Social Network.</h1>
        <h4>
          This website is a training to React, global state handling, and
          tokens. Here, authentication and routing will be used to create a
          small social media website.
        </h4>
      </section>

      <CreatePost onRefreshPosts={fetchPosts} />

      {isUserLoggedIn ? (
        <>
          <div className='button-group'>
            <button
              className='btn btn--primary'
              onClick={() => setSortOrder("desc")}>
Most recents first            </button>
            <button
              className='btn btn--secondary'
              onClick={() => setSortOrder("asc")}>
most ancient first            </button>
          </div>

          <ul className='post-list'>
            {posts.map((post) => (
              <li key={post.id} className='post'>
                <div className='post-content'>
                  <div className='post-header'>
                    {/* Display avatar */}
                    <img
                      src={safelyAccess(
                        post,
                        "attributes.author.data.attributes.avatarUrl"
                      )}
                      alt="Author's avatar"
                      className='avatar'
                      onError={(e) => {
                        e.target.onerror = null; // Prevents endless loop in case the fallback image also fails
                        e.target.src =
                          "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=identicon&f=y";
                      }}
                    />

                    <h2 className='post-title'>
                      {safelyAccess(
                        post,
                        "attributes.author.data.attributes.username"
                      ) &&
                      Number(
                        safelyAccess(post, "attributes.author.data.id")
                      ) !== currentUserId ? (
                        <Link
                          to={`/user/${post.attributes.author.data.attributes.username}`}>
                          {getDisplayName(post)}
                        </Link>
                      ) : (
                        getDisplayName(post)
                      )}
                    </h2>
                    <Likes
                      className='likes'
                      likesCount={post.attributes?.like}
                      onLike={() => handleLike(post.id, post.attributes?.like)}
                      likedStatus={userLikes[post.id]}
                    />
                  </div>

                  <p className='post-text'>
                    {post.attributes?.text || "Sans titre"}
                  </p>

                  {Number(post.attributes?.author?.data?.id) ===
                  currentUserId ? (
                    <button
                      className='btn btn--delete'
                      onClick={() => handleDelete(post.id)}>
                      Supprimer
                    </button>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className='login-reminder'>Please log in to view posts.</p>
      )}
    </div>
  );
};

export default PostsPage;
