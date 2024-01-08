import React, { useEffect, useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import "./Registration.css";

const TEST_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
const DELAY = 1500;

const Captcha = (props) => {
  const { setCaptchaState, captchaState } = props;
  const captchaRef = useRef();

  const handleChange = (newValue) => {
    setCaptchaState(true);
  };

  return (
    <div className="Captcha">
      <ReCAPTCHA
        style={{ display: "inline-block" }}
        theme="dark"
        ref={captchaRef}
        sitekey={"6Lc4-0ApAAAAAKr36N10JM08ji9hK6qJm1jJt7nq"}
        onChange={handleChange}
      />
    </div>
  );
};

export default Captcha;
