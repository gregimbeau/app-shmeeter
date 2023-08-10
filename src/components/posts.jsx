import React, { useState, useEffect } from "react";
import Likes from "./likes.jsx";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updatePost = async (id, updatedFields) => {
    const post = posts.find((p) => p.id === id);
    if (!post) {
      console.error("Post not found with ID:", id);
      return;
    }

    try {
      const response = await fetch(`http://localhost:1337/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: updatedFields }),
      });

      if (!response.ok) {
        console.error("Error body:", await response.text());
        throw new Error(`Failed to update post. Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating post:", error);
      throw error; // rethrow to handle in the calling function
    }
  };

  const handleLike = async (id) => {
    try {
      const post = posts.find((p) => p.id === id);
      if (!post || !post.attributes || post.attributes.like === undefined) {
        console.error("Post not found or post doesn't have likes:", post);
        return;
      }
      const updatedLikeCount = post.attributes.like + 1;

      const updatedPost = await updatePost(id, { like: updatedLikeCount }); // Adjust this part
      if (!updatedPost) {
        throw new Error("Failed to update post");
      }
      const updatedPosts = posts.map((post) =>
        post.id === id ? updatedPost : post
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  posts.forEach((post) => {
    if (!post.attributes) {
      console.error("Post missing attributes:", post);
    } else if (!post.attributes.text) {
      console.error("Post attributes missing text:", post);
    }
  });

  const handleDislike = async (id) => {
    try {
      const post = posts.find((p) => p.id === id);

      // Check if post exists and has the 'dislike' attribute
      if (!post || !post.attributes || post.attributes.dislike === undefined) {
        console.error("Post not found or post doesn't have dislikes:", post);
        return;
      }

      // Update the dislike count
      const updatedDislikeCount = post.attributes.dislike + 1;

      // Send the update to the server
      const updatedPost = await updatePost(id, {
        dislike: updatedDislikeCount,
      });

      // Update local state with the modified post data
      const updatedPosts = posts.map((p) => (p.id === id ? updatedPost : p));
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error handling dislike:", error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/posts?populate=author"
        );
        const result = await response.json();

        if (result.data && Array.isArray(result.data)) {
          setPosts(result.data);
        } else {
          console.error("API did not return the expected format:", result);
          setError("Format de données inattendu.");
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Chargement des posts...</p>;
  }

  if (error) {
    return <p>Erreur lors du chargement des posts: {error}</p>;
  }
  function getDisplayName(post) {
    try {
      return post.attributes.author.data.attributes.displayName || "Sans nom";
    } catch (error) {
      return "Sans nom";
    }
  }

  return (
    <div>
      <h1>Tous les posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{getDisplayName(post)}</h2>
            <p>{post.attributes?.text || "Sans titre"}</p>
            <Likes
              likesCount={post.attributes?.like}
              dislikesCount={post.attributes?.dislike}
              onLike={() => handleLike(post.id)}
              onDislike={() => handleDislike(post.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsPage;
