import React, { useState, useEffect } from "react";
import Likes from "./likes.jsx";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:1337/api/posts/${id}`, {
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

    fetchPosts();
  }, [sortOrder]);

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

  const currentUserId = Number(localStorage.getItem("userId"));

  return (
    <div>
      <secton>
        <h1>Welcome on My Social Network.</h1>
        <h2>This
        website is a training to React, global state handling and tokens. Here,
        authentification and routing will be used to create a small social media
        website.</h2>
      </secton>
      <div>
        <button onClick={() => setSortOrder("desc")}>
          Tri par plus récents
        </button>
        <button onClick={() => setSortOrder("asc")}>
          Tri par plus anciens
        </button>
      </div>
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
            {Number(post.attributes.author.data.id) === currentUserId ? (
              <button onClick={() => handleDelete(post.id)}>Supprimer</button>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsPage;
