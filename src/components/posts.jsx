import React, { useState, useEffect } from "react";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:1337/api/posts?populate=author");
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
          <p>{post.attributes.text || "Sans titre"}</p>
          {/* Vous pouvez ajouter d'autres détails du post si nécessaire, par exemple : */}
        </li>
      ))}
    </ul>
  </div>
);

};

export default PostsPage;
