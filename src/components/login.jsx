import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    identifier: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

const fetchUserProfile = async () => {
  const token = Cookies.get("token");

  if (token) {
    try {
      const response = await fetch("http://localhost:1337/api/users/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP error ${response.status}: ${text}`);
      }

      const userProfile = await response.json();
      console.log("User profile:", userProfile);

      localStorage.setItem("userId", userProfile.id);

      // You can, for example, save this profile to a state or do other processing here.
    } catch (error) {
      console.error("There was an error fetching user profile:", error);
    }
  } else {
    console.log("No token found. User is not authenticated.");
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: loginData.identifier,
          password: loginData.password,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP error ${response.status}: ${text}`);
      }

      const data = await response.json();

      if (data.jwt) {
        localStorage.setItem("jwt", data.jwt);
        Cookies.set("token", data.jwt, { expires: 7 });
        console.log("Successfully logged in!");

        fetchUserProfile(); // Call after successfully logging in

        navigate("/"); // Redirection après une connexion réussie
      } else {
        console.log("Error logging in:", data.message);
        setErrorMsg(data.message);
      }
    } catch (error) {
      console.error("There was an error logging in:", error);
      setErrorMsg("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type='email'
            name='identifier'
            value={loginData.identifier}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type='password'
            name='password'
            value={loginData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
