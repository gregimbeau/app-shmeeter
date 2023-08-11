import React from "react";

function Likes({ likesCount, onLike, onDislike, likedStatus }) {
  return (
    <div>
      <button onClick={onLike} disabled={likedStatus === "liked"}>
        Like
      </button>
      <button onClick={onDislike} disabled={likedStatus === "disliked"}>
        Dislike
      </button>
      <span>{likesCount || 0} likes</span>
    </div>
  );
}




export default Likes;
