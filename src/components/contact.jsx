import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    _gotcha: "",
    // subscribe: "yes",
    // gender: "male",
    // workExperience: "one-year",
  });

  const closeModal = () => {
    setIsOpen(false);
    setFormSubmitted(false); // Reset formSubmitted state when modal closes
    setMessage(""); // Reset message state when modal closes
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        "https://getform.io/f/07cf8508-144a-4957-a3b9-32851cca0640",
        formData,
        { headers: { Accept: "application/json" } }
      )
      .then((response) => {
        setMessage("Thanks for your message! It has been sent successfully!");
        setFormSubmitted(true); // Set formSubmitted state to true on successful submission
      })
      .catch((error) => {
        setMessage(`Error: ${error.message}`);
      });
  };

  return (
    <>
      <a
        href='#'
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}>
        Contact
      </a>

      {isOpen && (
        <div className='modal-background'>
          <div className='modal-container'>
            <div className='modal-header'>
              <h2>Contact Us</h2>
              <button onClick={closeModal}>&times;</button>
            </div>
            <div className='modal-content'>
              {formSubmitted ? ( // Conditionally render based on formSubmitted state
                <div className='success-message'>{message}</div>
              ) : (
                <>
                  <form onSubmit={handleSubmit}>
                    <label>
                      Name:
                      <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </label>

                    <label>
                      Email:
                      <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </label>

                    <label>
                      Message:
                      <input
                        type='text'
                        name='message'
                        value={formData.message}
                        onChange={handleInputChange}
                      />
                    </label>

                    <input
                      type='hidden'
                      name='_gotcha'
                      style={{ display: "none" }}
                      value={formData._gotcha}
                    />

                    <label>
                      Your message will reallly be sent to me, go on and say hi!
                    </label>
                    <button type='submit'>Send</button>
                  </form>
                  <div>{message}</div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Contact;