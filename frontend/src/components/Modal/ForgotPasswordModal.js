import React, { useState } from "react";
import Modal from "react-modal";
import displayToast from "../Alert/Alert";
import ModalInput from "./ModalInput";
//  import { sendPasswordResetEmail } from "../../Apis/auth"; 

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
      height: "65vh",
      width: "50%",
      background: "#212227",
      padding: "30px",
    },
    overlay: {
      background: "rgba(33, 34, 39, 0.90)",
    },
  };
  
  export const ForgotPasswordModal = (props) => {
    const { modalIsOpen, closeModal } = props;
  
    const [email, setEmail] = useState("");
    const [isEmailSent, setIsEmailSent] = useState(false);
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handleSendPasswordResetEmail = async () => {
      try {
        // await sendPasswordResetEmail(email);
        setIsEmailSent(true);
        displayToast("Password reset email sent.", "success");
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
        style={customStyles}
      >
        <h2 className="title">Forgot Password</h2>
        {isEmailSent ? (
          <p>Password reset email sent. Check your inbox.</p>
        ) : (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{ color: "white" }}>
                Enter your email to reset your password:
              </p>
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
  
            <ModalInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
            <br></br>
            <button
              onClick={handleSendPasswordResetEmail}
              style={{
                backgroundColor: "#ffb300", // Blue background color
                color: "black", // White text color
                border: "none", // Remove the button border
                borderRadius: "5px", // Add rounded corners
                padding: "8px 10px", // Add padding to the button
                cursor: "pointer", // Show a pointer cursor on hover
                fontSize: "16px", // Adjust the font size
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)", // Add a subtle shadow
              }}
            >
              Send Email
            </button>
          </div>
        )}
      </Modal>
    );
  };
  