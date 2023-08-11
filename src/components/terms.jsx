import React, { useState } from "react";

const Terms = () => {
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
        Terms and Conditions
      </a>

      {isOpen && (
        <div className='modal-background'>
          <div className='modal-container'>
            <div className='modal-header'>
              <h2>Our fake T&Cs</h2>
              <button onClick={closeModal}>&times;</button>
            </div>
            <div className='modal-content'>
              <h2>Terms of Service</h2>
              <p>Last Updated: [Month Day, Year]</p>

              <h3>1. Introduction</h3>
              <p>
                Welcome to [Your Company Name] ("we", "our", or "us"). By using
                our services, you agree to these Terms of Service ("Terms").
                Please read them carefully.
              </p>

              <h3>2. Use of Our Services</h3>
              <p>
                You must follow any guidelines or policies associated with the
                Services. You must not misuse or interfere with our Services or
                try to access them using a method other than the interface and
                the instructions that we provide.
              </p>

              <h3>3. Privacy</h3>
              <p>
                Our privacy policies explain how we treat your personal data and
                protect your privacy when you use our Services. By using our
                Services, you agree that we can use such data in accordance with
                our privacy policies.
              </p>

              <h3>4. Modifications</h3>
              <p>
                We may revise these Terms at any time by updating this posting.
                By using our Services, you agree to be bound by any such
                revisions.
              </p>

              <h3>5. Termination</h3>
              <p>
                We reserve the right to suspend or terminate our Services to you
                if you do not comply with our terms or policies, or if we are
                investigating suspected misconduct.
              </p>

              <h3>6. Limitation of Liability</h3>
              <p>
                [Your Company Name] will not be responsible for lost profits,
                revenues, or data, financial losses, or indirect, special,
                consequential, exemplary, or punitive damages.
              </p>

              <h3>7. Governing Law</h3>
              <p>
                The laws of [Your State/Country], excluding its conflict of laws
                rules, will apply to any disputes arising out of or relating to
                these Terms or the Services.
              </p>

              <h3>8. Feedback</h3>
              <p>
                We appreciate your feedback or other suggestions about our
                services, but you understand that we may use them without any
                obligation to compensate you for them.
              </p>

              <p>
                If you do not comply with these terms, and we don't take action
                right away, this doesn’t mean that we are giving up any rights
                that we may have, such as taking action in the future.
              </p>

              <p>
                For information about how to contact [Your Company Name], please
                visit our contact page.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Terms;
