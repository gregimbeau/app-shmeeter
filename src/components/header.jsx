import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = () => {
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    Cookies.remove("token");
    navigate("/"); // Redirect to login after logout
  };

  return (
    <div className='header'>
      <div className='container'>
        <div className='nav'>
          <button className='nav-item' onClick={() => navigate("/")}>
            Home
          </button>
          {!jwt && (
            <button className='nav-item' onClick={() => navigate("/form")}>
              S'inscrire
            </button>
          )}
          {!jwt ? (
            <button className='nav-item' onClick={() => navigate("/login")}>
              Login
            </button>
          ) : (
            <button className='nav-item' onClick={handleLogout}>
              Logout
            </button>
          )}
          <button className='nav-item' onClick={() => navigate("/profile")}>
            Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
