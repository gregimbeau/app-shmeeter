function Likes({ likesCount, onLike, onDislike, likedStatus }) {
  const buttonClassName = likesCount > 0 ? 'liked' : 'nolikes';
  
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <button
        className={buttonClassName}
        onClick={onLike}
        disabled={likedStatus === "liked"}
        style={{ marginRight: "10px" }}
      >
        <img
          src='https://img.icons8.com/?size=512&id=60010&format=png'
          alt='Thumbs Up'
          style={{ width: "25px", height: "20px" }}
        />
      </button>

      {likesCount > 0 && <span>{likesCount} likes</span>}
    </div>
  );
}

export default Likes;