import { useState } from "react";
import "./ModalInput.css";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

const ModalInput = (props) => {
  const {
    label,
    name,
    onChange,
    value,
    placeholder,
    type = "text",
    isRequired = true,
  } = props;

  const [inputType, setInputType] = useState(type);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setInputType(showPassword ? type : "text");
  };

  return (
    <div className="element-container relative">
      <div>

        <label className="input-label">{label}</label>
      </div>
      <input
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        type={showPassword ? "text" : type}
      />

      {type === "password" && (
        <button
          type="button" // Add this line to specify that it's not a submit button
          className="eye-icon absolute right-4 bottom-3"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <RiEyeFill size={20} /> : <RiEyeOffFill size={20} />}
        </button>
      )}
    </div>
  );
};

export default ModalInput;
