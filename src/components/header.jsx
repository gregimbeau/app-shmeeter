import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAtom } from "jotai";
import { jwtAtom } from "../state";
import Logo from "../assets/logo.svg"; 

const Header = () => {
  const navigate = useNavigate();
  const [jwt, setJwt] = useAtom(jwtAtom);

  const handleLogout = () => {
    setJwt(null);
    Cookies.remove("token");
    navigate("/");
  };

  return (
    <div className='header'>
      <div className='container'>
        <div className='nav'>
          <img src={Logo} alt='Brand Logo' className='logo' />{" "}
          <button className='nav-item' onClick={() => navigate("/")}>
            Home
          </button>
          {!jwt ? (
            <>
              <button className='nav-item' onClick={() => navigate("/form")}>
                Sign up
              </button>
              <button className='nav-item' onClick={() => navigate("/login")}>
                Login
              </button>
            </>
          ) : (
            <>
              <button className='nav-item' onClick={handleLogout}>
                Logout
              </button>
            </>
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
