import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Modal from "react-modal";
import "./ClaimOffer.css";
import { claimOffer } from "../../../Apis/auth"; // Import your API functions
import ClaimRegistration from "./ClaimRegistration"; // adjust the path as necessary

const customModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    borderRadius: "8px",
    border: "1px solid #BE8200",
    boxShadow: "0px 4px 40px 0px rgba(190, 130, 0, 0.60)",
    background: "#212227",
    padding: "30px",
  },
  overlay: {
    background: "rgba(33, 34, 39, 0.90)",
  },
};

const ClaimOffer = () => {
  const [otpEnabled, setOtpEnabled] = useState(false);
  const [buttonText, setButtonText] = useState("Send Access Code");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [emailDisabled, setEmailDisabled] = useState(false);
  const [timer, setTimer] = useState(120);
  const [resendAvailable, setResendAvailable] = useState(false);
  const [otpInputs, setOtpInputs] = useState(Array(6).fill(""));
  const [email, setEmail] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false); // State to handle modal visibility
  const [labelText, setLabelText] = useState(
    "PLEASE ENTER YOUR EMAIL ADDRESS SO WE CAN SEND YOU AN ACCESS CODE THAT YOU WILL NEED TO ACTIVATE YOUR FREE LIFETIME MEMBERSHIP!"
  );
  const [generatedOtp, setGeneratedOtp] = useState(""); // State to store the generated OTP

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    let intervalId;

    if (otpEnabled && timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalId);
            setButtonDisabled(true);
            setResendAvailable(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [otpEnabled, timer]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpEnabled) {
      // Send OTP
      try {
        const response = await claimOffer({ email });
        console.log("OTP Verification Response:", response);

        setGeneratedOtp(response.data.otp); // Store the generated OTP

        Swal.fire({
          title: "Access Code Sent",
          text: "Please check your email for the Access code.",
          icon: "success",
          color: "white",
          timer: 5000,
          timerProgressBar: true,
          didClose: () => {
            setOtpEnabled(true);
            setButtonText("CONTINUE");
            setEmailDisabled(true);
            setTimer(120);
            setResendAvailable(false);

            // Update the label text after the access code is sent
            setLabelText(
              "We have sent an access code to the email you provided. Please go check your email and get the access code we sent you and enter it below! This is a time-sensitive offer, so please go get the code now!"
            );
          },
        });
      } catch (error) {
        console.error("An error occurred while sending OTP:", error);
        Swal.fire({
          title: "Error",
          text: "An error occurred while sending OTP.",
          icon: "error",
          color: "white",
        });
      }
    } else {
      // Verify OTP
      const enteredOtp = otpInputs.join("");
      if (enteredOtp === generatedOtp) {
        console.log("OTP Verified Successfully!");

        // After OTP verification, pass the email to the registration component
        openModal(); // Open the ClaimRegistration modal

        // Call handleVerify to proceed with further logic if needed
        handleVerify();
      } else {
        Swal.fire({
          title: "Invalid OTP",
          text: "The OTP you entered is incorrect. Please try again.",
          icon: "error",
          color: "white",
        });
      }
    }
  };

  const handleVerify = () => {
    // Open the ClaimRegistration modal when the OTP is verified successfully
    setModalIsOpen(true);
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (value.length > 1) {
      e.target.value = value.slice(0, 1);
    }
    const newOtpInputs = [...otpInputs];
    newOtpInputs[index] = value;
    setOtpInputs(newOtpInputs);

    if (value.length === 1 && index < otpInputs.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleOtpBackspace = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleResendCode = () => {
    if (resendAvailable) {
      Swal.fire({
        title: "OTP Resent",
        text: "A new OTP has been sent to your email.",
        color: "white",
        icon: "info",
        timer: 2000,
        timerProgressBar: true,
      });
      setTimer(120);
      setOtpEnabled(true);
      setButtonText("CONTINUE");
      setResendAvailable(false);
    } else {
      Swal.fire({
        title: "Cannot Resend Code",
        text: "The code has expired. Please request a new one.",
        icon: "warning",
        color: "white",
      });
    }
  };

  const handleChangeEmail = () => {
    setOtpEnabled(false);
    setEmailDisabled(false);
    setTimer(120);
    setButtonText("Send Access Code");
    setButtonDisabled(false);
    setResendAvailable(false);
    setLabelText(
      "PLEASE ENTER YOUR EMAIL ADDRESS SO WE CAN SEND YOU AN ACCESS CODE THAT YOU WILL NEED TO ACTIVATE YOUR FREE LIFETIME MEMBERSHIP!"
    );
  };

  const formatTime = (time) => {
    if (isNaN(time) || time < 0) {
      return "00:00";
    }
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div className="claim-container">
      <form className="claim" onSubmit={handleSubmit}>
        <label className="label-text-claim">{labelText}</label>
        <br />
        <span className="input-span-claim">
          <label htmlFor="email" className="label-claim">
            EMAIL
          </label>
          <input
            type="email"
            name="email-claim"
            id="email"
            required
            disabled={emailDisabled}
            className={emailDisabled ? "disabled" : ""}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </span>

        {otpEnabled && (
          <>
            <br />
            <hr />
            <br />
            <label className="label-claim">ENTER YOUR ACCESS CODE BELOW</label>

            <div className="otp-input-container">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  maxLength="1"
                  onChange={(e) => handleOtpChange(e, i)}
                  onKeyDown={(e) => handleOtpBackspace(e, i)}
                  disabled={!otpEnabled}
                  className="otp-input"
                />
              ))}
            </div>
          </>
        )}

        <input
          className={`submit-claim ${buttonDisabled ? "disabled" : ""}`}
          type="submit"
          value={buttonText}
          disabled={buttonDisabled}
        />

        {otpEnabled && (
          <div className="timer">
            Time left: {formatTime(timer)}
            {resendAvailable && (
              <button
                className="resend-code-button"
                type="button"
                onClick={handleResendCode}
              >
                Resend Code
              </button>
            )}
          </div>
        )}
      </form>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customModalStyles}
      >
        <div>
          <button onClick={openModal}>Open Registration</button>
          <ClaimRegistration
            modalIsOpen={modalIsOpen}
            closeModal={closeModal}
            email={email} // Pass email as a prop
          />
        </div>
      </Modal>
    </div>
  );
};

export default ClaimOffer;
