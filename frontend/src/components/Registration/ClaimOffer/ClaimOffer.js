import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./ClaimOffer.css";

const ClaimOffer = () => {
  const [otpEnabled, setOtpEnabled] = useState(false);
  const [buttonText, setButtonText] = useState("Send OTP");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [emailDisabled, setEmailDisabled] = useState(false);
  const [timer, setTimer] = useState(120); // 2 minutes in seconds
  const [resendAvailable, setResendAvailable] = useState(false);
  const [otpInputs, setOtpInputs] = useState(Array(6).fill(""));

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otpEnabled) {
      Swal.fire({
        title: "OTP Sent",
        text: "Please check your email for the OTP.",
        icon: "success",
        color: "white",
        timer: 2000, // 2 seconds
        timerProgressBar: true,
        didClose: () => {
          setOtpEnabled(true);
          setButtonText("Verify");
          setEmailDisabled(true);
          setTimer(120); // Reset the timer
          setResendAvailable(false);
        },
      });
    } else {
      // Handle OTP verification here
      setButtonDisabled(true);
    }
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
        timer: 2000, // 2 seconds
        timerProgressBar: true,
      });
      setTimer(120); // Reset the timer
      setOtpEnabled(true);
      setButtonText("Verify");
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
    setButtonText("Send OTP");
    setButtonDisabled(false);
    setResendAvailable(false);
  };

  const formatTime = (time) => {
    // Ensure `time` is a non-negative integer
    if (isNaN(time) || time < 0) {
      return "00:00";
    }

    // Calculate minutes and seconds
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    // Format minutes and seconds as two digits
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    // Return the formatted time string
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div className="claim-container">
      <form className="claim" onSubmit={handleSubmit}>
        {otpEnabled && (
          <span className="span-claim">
            <a href="#" onClick={handleChangeEmail}>
              Change Email
            </a>
          </span>
        )}
        <span className="input-span-claim">
          <label htmlFor="email" className="label-claim">
            Email
          </label>
          <input
            type="email"
            name="email-claim"
            id="email"
            required
            disabled={emailDisabled}
            className={emailDisabled ? "disabled" : ""}
          />
        </span>

        {otpEnabled && (
          <div className="otp-input-container">
            {[0, 1, 2, 3].map((i) => (
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
    </div>
  );
};

export default ClaimOffer;
