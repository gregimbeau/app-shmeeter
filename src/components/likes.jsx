import React from "react";
import { useAtom } from 'jotai';
import { likesCountAtom, likedStatusAtom }  from "../state";


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
    <div>
      <button onClick={onLike} disabled={likedStatus === "liked"}>
        Like
      </button>
      <button onClick={onDislike} disabled={likedStatus === "disliked"}>
        Dislike
      </button>
      <span>{likesCount} likes</span>
    </div>
  );
}

export default Likes;