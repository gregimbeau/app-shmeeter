import React, { useState } from "react";

const About = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <a
        href='#'
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}>
        About
      </a>

      {isOpen && (
        <div className='modal-background'>
          <div className='modal-container'>
            <div className='modal-header'>
              <h2>About Us</h2>
              <button onClick={closeModal}>&times;</button>
            </div>
            <div className='modal-content'>
              <p>
                My Social Network is a training to React, global state handling,
                and tokens. Here, authentication and routing will be used to
                create a small social media website.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default About;
