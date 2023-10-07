import React, { useState } from "react";
import Modal from "react-modal";
import ModalInput from "./ModalInput";
import logoImg from "../assets/logo.png";

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

const SignInModal = (props) => {
  const { modalIsOpen, closeModal } = props;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/signin", formData);
      if (response.data.success) {
        // Sign-in successful, you can redirect or perform other actions
        console.log("Sign in successful");
        closeModal();
      } else {
        // Sign-in failed, handle the error message
        console.error("Sign in failed: ", response.data.error);
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error: ", error);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/reset-password", {
        email: formData.email,
      });
      if (response.data.success) {
        // Password reset email sent successfully
        console.log("Password reset email sent");
      } else {
        // Password reset failed, handle the error message
        console.error("Password reset failed: ", response.data.error);
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error: ", error);
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div className="r-modal-header">
        <h2 className="title">SIGN IN</h2>
        <img
          src={logoImg}
          alt="logo-img"
          style={{
            width: "99px",
            height: "76px",
          }}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={25}
          viewBox="0 0 24 25"
          fill="none"
          className="cross-btn"
          onClick={closeModal}
        >
          <path
            d="M7 7.5L17 17.5M7 17.5L17 7.5"
            stroke="#E61C1C"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div
        className="modal-form-container"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {/* Email input */}
        <ModalInput
          label={"Email"}
          placeholder={"Email"}
          type="email"
          name="email"
          value={formData.email}
          onChange={inputChangeHandler}
        />

        {/* Password input */}
        <ModalInput
          label={"Password"}
          placeholder={"Password"}
          type="password"
          name="password"
          value={formData.password}
          onChange={inputChangeHandler}
        />
      </div>
      <div className="password-reset-container text-white">
        <button className="reset-password-btn" onClick={handleResetPassword}>
          Forgot Password? Reset Here
        </button>
      </div>
      <button className="submit-btn" onClick={handleSignIn}>
        SIGN IN
      </button>
    </Modal>
  );
};

export default SignInModal;
