import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./ModalInput.css";

const ModalPassword = (props) => {
  const { label, name, onChange, value, placeholder, type = "text" } = props;
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="element-container">
      <div>
        <label className="input-label">{label}</label>
      </div>
      <div className="password-input-container">
        <input
          name={name}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          type={showPassword ? "text" : "password"}
          className="password-input"
        />
        <span
          className="password-toggle-icon"
          onClick={togglePasswordVisibility}
        >
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </span>
      </div>
    </div>
  );
};

export default ModalPassword;
