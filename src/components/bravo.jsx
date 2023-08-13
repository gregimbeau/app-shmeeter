import React from "react";
import { useNavigate } from "react-router-dom";

const Bravo = ({ isVisible, onClose }) => {
  const navigate = useNavigate();

  const handleCloseAndRedirect = () => {
    onClose();
    navigate("/login");
  };

  if (!isVisible) return null;

  return (
    <>
      <a
        href='#'
        onClick={(e) => {
          e.preventDefault();
          handleCloseAndRedirect();
        }}>
        Bravo
      </a>

      {isVisible && (
        <div className='modal-background'>
          <div className='modal-container'>
            <div className='modal-header'>
              <span>Congratulations!</span>
              <button onClick={handleCloseAndRedirect}>&times;</button>
            </div>
            <div className='modal-content'>
              Congratulation you signed in successfully, you can now login with
              your email and password
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Bravo;
