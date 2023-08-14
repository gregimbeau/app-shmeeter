import React, { useState } from "react";
import Bravo from "@/components/bravo";
import { useAtom } from "jotai";
import { modalVisibleAtom, formDataAtom } from "../state"; // Adjust the path as necessary

const InscriptionForm = () => {
  const [isModalVisible, setIsModalVisible] = useAtom(modalVisibleAtom);
  const [formData, setFormData] = useAtom(formDataAtom);

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
      displayName: formData.displayName,
      email: formData.email,
      password: formData.password,
      description: formData.description,
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
        return fetch(
          "https://app-shmeeter-server-production.up.railway.app/api/auth/local",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              identifier: formData.username,
              password: formData.password,
            }),
          }
        );
      })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        const token = result.jwt;
        console.log(token);
        setIsModalVisible(true);
      })
      .catch((error) => {
        console.error("Error on conection:", error);
      });
  };

  return (
    <div className='container'>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit} className='col-6'>
        {" "}
        {/* A half-width form */}
        <div className='form-group'>
          <label>Username: (can't be changed, not public)</label>
          <input
            type='text'
            name='username'
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label>Displayed Name: (can be changed, public name)</label>
          <input
            type='text'
            name='displayName'
            value={formData.displayName}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label>Email:</label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label>Password:</label>
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label>Description</label>
          <textarea
            name='description'
            rows='5'
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <input type='hidden' name='role' value={formData.role} />
        <button className='btn btn--primary' type='submit'>
          Sign up
        </button>
      </form>
      {isModalVisible && (
        <Bravo
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        />
      )}
    </div>
  );
};

export default InscriptionForm;
