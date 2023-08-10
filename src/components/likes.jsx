import React from "react";

function Likes({ likesCount, onLike, onDislike }) {
  return (
    <div>
      <button onClick={onLike}>Like</button>
      <button onClick={onDislike}>Dislike</button>
      <span>{likesCount || 0} likes</span>
    </div>
  );
}


export default Likes;
