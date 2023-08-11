import React, { useState } from "react";

const InscriptionForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const data = {
    username: formData.username,
    email: formData.email,
    password: formData.password,
    role: formData.role,
  };

  fetch("https://app-shmeeter-server-production.up.railway.app/api/users/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((result) => {
      console.log(result);
      // Supposons que votre endpoint pour la connexion soit /auth/local
      return fetch("https://app-shmeeter-server-production.up.railway.app/api/auth/local", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: formData.username,
          password: formData.password,
        }),
      });
    })
    .then((response) => response.json())
    .then((result) => {
      console.log(result); // Ceci devrait maintenant inclure votre token JWT.
      const token = result.jwt;
      console.log(token);
    })
    .catch((error) => {
      console.error("Erreur lors de la connexion:", error);
    });
};


  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type='text'
            name='username'
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <input type='hidden' name='role' value={formData.role} />
        <button type='submit'>S'inscrire</button>
      </form>
    </div>
  );
};

export default InscriptionForm;
