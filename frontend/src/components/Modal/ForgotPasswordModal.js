import React, { useState } from "react";
import Modal from "react-modal";
import displayToast from "../Alert/Alert";
import ModalInput from "./ModalInput";
// import { sendPasswordResetEmail } from "../../Apis/auth";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "8px",
    border: "1px solid #BE8200",
    boxShadow: "0px 4px 40px 0px rgba(190, 130, 0, 0.60)",
    height: "55vh",
    width: "50%",
    background: "#212227",
    padding: "30px",
  },
  overlay: {
    background: "rgba(33, 34, 39, 0.90)",
  },
};
const mobileStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    // marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "8px",
    border: "1px solid #BE8200",
    boxShadow: "0px 4px 40px 0px rgba(190, 130, 0, 0.60)",
    height: "30vh",
    width: "80vw",
    background: "#212227",
    padding: "15px",
  },
  overlay: {
    background: "rgba(33, 34, 39, 0.90)",
  },
};

export const ForgotPasswordModal = (props) => {
  const { modalIsOpen, closeModal } = props;
  const isMobile = window.innerWidth <= 600;

  const [email, setEmail] = useState("");
  const [code, setCode] = useState(""); // New state for the code input
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [emailError, setEmailError] = useState(""); // State to handle email errors

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(""); // Clear error when user starts typing
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  // Function to validate email format
  const validateEmail = (email) => {
    // Simple email validation regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSendPasswordResetEmail = async () => {
    // Check if email is empty or invalid
    if (!email) {
      setEmailError("Email is required");
      return;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    try {
      // Simulate sending email
      // await sendPasswordResetEmail(email);
      setIsEmailSent(true); // Email sent successfully
      displayToast("Password reset email sent.", "success");
      setShowCodeInput(true); // Show code input after email is sent
      setCode(""); // Clear the code input field when switching steps
    } catch (error) {
      displayToast("Error sending password reset email.", "error");
    }
  };

  const handleBackToSignIn = () => {
    // Close the modal and return to the sign-in screen
    closeModal();
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={isMobile ? mobileStyles : customStyles}
    >
      <h2 className="title">Forgot Password</h2>
      {isEmailSent && !showCodeInput ? (
        <p>Password reset email sent. Check your inbox.</p>
      ) : (
        <div>
          {!showCodeInput ? (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ color: "white" }}>
                  Enter your email to reset your password:<br />
                  AND We'll Get You Back In The Game
                </p>
              </div>

              <ModalInput
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
              {emailError && <p style={{ color: "red" }}>{emailError}</p>} {/* Display email error */}
              <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  onClick={handleSendPasswordResetEmail}
                  style={{
                    backgroundColor: "#ffb300",
                    color: "black",
                    border: "none",
                    borderRadius: "5px",
                    padding: "8px 10px",
                    cursor: "pointer",
                    fontSize: "16px",
                    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  Send Email
                </button>
                <button
                  onClick={handleBackToSignIn}
                  style={{
                    backgroundColor: "Red",
                    color: "black",
                    border: "none",
                    borderRadius: "5px",
                    padding: "8px 10px",
                    cursor: "pointer",
                    fontSize: "16px",
                    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                  }}
                  className="back-button"
                >
                  Back
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p>Please enter the code sent to your email: {email}</p>
              <ModalInput
                type="text"
                placeholder="Enter code"
                value={code} // Bind the code state to the input
                onChange={handleCodeChange}
              />
              <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                // Handle verification of code
                style={{
                  backgroundColor: "#ffb300",
                  color: "black",
                  border: "none",
                  borderRadius: "5px",
                  padding: "8px 10px",
                  cursor: "pointer",
                  fontSize: "16px",
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                }}
              >
                Verify Code
              </button>
              <button
                onClick={handleBackToSignIn}
                style={{
                  backgroundColor: "Red",
                  color: "black",
                  border: "none",
                  borderRadius: "5px",
                  padding: "8px 10px",
                  cursor: "pointer",
                  fontSize: "16px",
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                }}
                className="back-button"
              >
                Back
              </button>
            </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};
