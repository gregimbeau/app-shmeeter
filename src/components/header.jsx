import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


const Header = () => {
  const navigate = useNavigate();

  const jwt = localStorage.getItem("jwt");

const handleLogout = () => {
  localStorage.removeItem("jwt");
  Cookies.remove("token");
  navigate("/login"); // Redirect to login after logout
};
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 50px",
        borderBottom: "1px solid #ccc",
      }}>
      <button onClick={() => navigate("/")}>Home</button>
      {!jwt ? (
        <button onClick={() => navigate("/login")}>Login</button>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
      <button onClick={() => navigate("/profile")}>Profile</button>
    </div>
  );
};

export default Header;
