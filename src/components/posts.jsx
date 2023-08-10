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
      throw error;
    }
  };

const handleLikeOrDislike = async (id, isLike = true) => {
  const post = posts.find((p) => p.id === id);

  const updatedLikeCount = isLike
    ? post.attributes.like + 1
    : Math.max(post.attributes.like - 1, 0); // Ensure likes can't go negative

  const optimisticPosts = posts.map((post) =>
    post.id === id
      ? {
          ...post,
          attributes: { ...post.attributes, like: updatedLikeCount },
        }
      : post
  );
  setPosts(optimisticPosts);

  try {
    const updatedPost = await updatePost(id, { like: updatedLikeCount });

    if (!updatedPost) {
      throw new Error("Failed to update post");
    }
  } catch (error) {
    console.error("Error handling like/dislike:", error);
    const revertedPosts = posts.map((post) =>
      post.id === id
        ? {
            ...post,
            attributes: { ...post.attributes, like: post.attributes.like },
          }
        : post
    );
    setPosts(revertedPosts);
    alert("Erreur lors de la mise à jour. Veuillez réessayer.");
  }
};

const handleLike = (id) => handleLikeOrDislike(id, true);
const handleDislike = (id) => handleLikeOrDislike(id, false);


  const checkPostAttributes = (posts) => {
    posts.forEach((post) => {
      if (!post.attributes) {
        console.error("Post missing attributes:", post);
      } else if (!post.attributes.text) {
        console.error("Post attributes missing text:", post);
      }
    });
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/posts?populate=author"
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
          setPosts(result.data);
          checkPostAttributes(result.data); // Vérification des attributs après avoir défini les articles
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
