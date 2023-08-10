import React, { useState, useEffect } from "react";

function Likes({ likesCount, dislikesCount, onLike, onDislike }) {
  const [localLikesCount, setLocalLikesCount] = useState(likesCount);
  const [localDislikesCount, setLocalDislikesCount] = useState(dislikesCount);

  useEffect(() => {
    setLocalLikesCount(likesCount);
    setLocalDislikesCount(dislikesCount);
  }, [likesCount, dislikesCount]);

  const handleLike = () => {
    setLocalLikesCount((prevCount) => prevCount + 1);
    onLike();
  };

  const handleDislike = () => {
    setLocalDislikesCount((prevCount) => prevCount + 1);
    onDislike();
  };

  return (
    <div>
      <button onClick={handleLike}>Like</button>
      <span>{localLikesCount || 0} likes</span>
      <button onClick={handleDislike}>Dislike</button>
      <span>{localDislikesCount || 0} dislikes</span>
    </div>
  );
}

export default Likes;
