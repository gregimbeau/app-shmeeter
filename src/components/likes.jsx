import React from "react";
import { useAtom } from "jotai";
import { likesCountAtom, likedStatusAtom } from "../state";

function Likes() {
  const [likesCount, setLikesCount] = useAtom(likesCountAtom);
  const [likedStatus, setLikedStatus] = useAtom(likedStatusAtom);

  const onLike = () => {
    setLikesCount((prev) => prev + 1);
    setLikedStatus("liked");
  };

  const onDislike = () => {
    setLikesCount((prev) => prev - 1);
    setLikedStatus("disliked");
  };

return (
  <div style={{ display: "flex", alignItems: "center" }}>
    <button
      onClick={onLike}
      disabled={likedStatus === "liked"}
      style={{ marginRight: "10px" }} // Added margin
    >
      <img
        src='https://img.icons8.com/?size=512&id=60010&format=png'
        alt='Thumbs Up'
        style={{ width: "20px", height: "20px" }}
      />
    </button>
    <button
      onClick={onDislike}
      disabled={likedStatus === "disliked"}
      style={{ marginRight: "10px" }} // Added margin
    >
      <img
        src='https://img.icons8.com/?size=512&id=60712&format=png'
        alt='Thumbs Down'
        style={{ width: "20px", height: "20px" }}
      />
    </button>
    <span>{likesCount} likes</span>
  </div>
);

}

export default Likes;
