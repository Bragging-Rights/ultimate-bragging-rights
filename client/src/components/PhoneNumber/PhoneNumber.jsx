import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
const PhoneNumber = ({ value, onChange, onCountryChange }) => {
  return (
    <div className="element-container">
      <div>
        <label className="star">*</label>
        <label className="input-label">Phone</label>
      </div>
      <PhoneInput
        placeholder="Enter phone number"
        value={value}
        onCountryChange={onCountryChange}
        onChange={onChange}
        limitMaxLength={true}
      />
    </div>
  );
};

export default PhoneNumber;
