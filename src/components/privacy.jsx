import React, { useState } from "react";

const Privacy = () => {
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
        Privacy Policy
      </a>

      {isOpen && (
        <div className='modal-background'>
          <div className='modal-container'>
            <div className='modal-header'>
              <h2>Our fake Privacy Policy</h2>
              <button onClick={closeModal}>&times;</button>
            </div>
            <div className='modal-content'>
              <h2>Privacy Policy</h2>
              <p>Last Updated: [Month Day, Year]</p>

              <h3>1. Introduction</h3>
              <p>
                Welcome to [Your Company Name]. This privacy policy outlines how
                we collect, use, and protect your personal data.
              </p>

              <h3>2. Data Collection</h3>
              <p>
                We collect information you provide directly to us, such as when
                you create an account, request services, or otherwise
                communicate with us.
              </p>

              <h3>3. Use of Data</h3>
              <p>
                We may use the information we collect to provide, maintain, and
                improve our services, to develop new services, and to protect
                [Your Company Name] and our users.
              </p>

              <h3>4. Data Sharing</h3>
              <p>
                We do not share your personal data with third parties without
                your consent, except where required by law.
              </p>

              <h3>5. Data Security</h3>
              <p>
                We work hard to protect [Your Company Name] and our users from
                unauthorized access or unauthorized alteration, disclosure, or
                destruction of information we hold.
              </p>

              <h3>6. Cookies</h3>
              <p>
                We may use cookies and similar technologies to recognize you
                and/or your device(s). You can control or opt out of the use of
                cookies through your browser settings.
              </p>

              <h3>7. Policy Updates</h3>
              <p>
                We may change this privacy policy from time to time. We
                encourage you to review the privacy policy whenever you access
                our services to stay informed about our information practices
                and the ways you can help protect your privacy.
              </p>

              <h3>8. Contact Us</h3>
              <p>
                If you have questions about this privacy policy, please contact
                [Your Company Name] via our [Contact Form/Email].
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Privacy;
