import React, { useState } from "react";
import Modal from "react-modal";
import ModalInput from "./ModalInput";
import logoImg from "../assets/logo.png";
import { login } from "../services/auth";
import { useMutation } from "react-query";
import displayToast from "../components/Alert/Alert";

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

  const { mutate, isLoading, isError, data, error, reset } = useMutation(
    (data) => login(data),
    {
      onError: (err) => {
        console.log(err);
        displayToast("An error occurred in the login", "error");
      },
      onSuccess: (rec) => {
        if (rec?.data?.hasErrors) {
          displayToast(rec?.data?.message, "error");
        } else {
          displayToast("Login successfully.", "success");

          localStorage.setItem("username", rec.data.username);
          localStorage.setItem("email", rec.data.email);
          localStorage.setItem("_id", rec.data._id);
        }
      },
    }
  );

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log("formData", formData);

    mutate(formData);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div className="r-modal-header">
        <h2 className="title">SIGN IN</h2>

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
        {/* <button className="reset-password-btn" onClick={handleResetPassword}>
          Forgot Password? Reset Here
        </button> */}
      </div>
      <button className="submit-btn" onClick={handleSignIn}>
        SIGN IN
      </button>
    </Modal>
  );
};

export default SignInModal;
