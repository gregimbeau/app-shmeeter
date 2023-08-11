import React, { useState } from "react";

const Faq = () => {
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
        FAQ
      </a>

      {isOpen && (
        <div className='modal-background'>
          <div className='modal-container'>
            <div className='modal-header'>
              <h2>A fake FAQ</h2>
              <button onClick={closeModal}>&times;</button>
            </div>
            <div className='modal-content'>
              <section class='faq-section'>
                <h1>Frequently Asked Questions</h1>
                
                <div class='faq-item'>
                  <h2>What is YourAppName?</h2>
                  <p>
                    YourAppName is a cutting-edge platform designed to
                    revolutionize how users interact with digital content,
                    offering seamless integration and unparalleled user
                    experience.
                  </p>
                </div>

                <div class='faq-item'>
                  <h2>How do I create an account on YourAppName?</h2>
                  <p>
                    To create an account, simply navigate to the "Sign Up" page,
                    fill in the required details, and follow the on-screen
                    instructions.
                  </p>
                </div>

                <div class='faq-item'>
                  <h2>I forgot my password. What do I do?</h2>
                  <p>
                    Click on the "Forgot Password" link on the login page and
                    enter your registered email. You'll receive a link to reset
                    your password.
                  </p>
                </div>

                <div class='faq-item'>
                  <h2>Is there a mobile version of YourAppName?</h2>
                  <p>
                    Yes! YourAppName is available on both Android and iOS
                    platforms. Download it from the respective app stores and
                    stay connected on the go.
                  </p>
                </div>

                <div class='faq-item'>
                  <h2>Can I change my user details after registering?</h2>
                  <p>
                    Absolutely! You can edit your profile details from the "My
                    Account" section once you're logged in.
                  </p>
                </div>

                <div class='faq-item'>
                  <h2>Are my details secure with YourAppName?</h2>
                  <p>
                    Yes, user security is our top priority. We employ the latest
                    encryption techniques and never share your details with
                    third parties without explicit consent.
                  </p>
                </div>

                <div class='faq-item'>
                  <h2>How do I contact customer support?</h2>
                  <p>
                    You can reach out to our dedicated support team via the
                    "Contact Us" page or drop us an email at
                    support@yourappname.com.
                  </p>
                </div>

                <div class='faq-item'>
                  <h2>Is YourAppName free?</h2>
                  <p>
                    While basic features of YourAppName are free for all users,
                    we offer a premium subscription for advanced features and
                    enhanced support.
                  </p>
                </div>

                <div class='faq-item'>
                  <h2>How can I deactivate my account?</h2>
                  <p>
                    We're sad to see you go! But if you wish to deactivate,
                    please go to "Settings" and choose "Deactivate Account".
                    Remember, this action is irreversible.
                  </p>
                </div>

                <div class='faq-item'>
                  <h2>Do you have any partnerships or integrations?</h2>
                  <p>
                    Yes, we're constantly expanding and partnering with various
                    industry leaders. Check out our "Partnerships" page for more
                    details.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Faq;
