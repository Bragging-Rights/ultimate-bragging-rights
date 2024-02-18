import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
const PhoneNumber = ({ value, onChange, onCountryChange }) => {
  const defaultCountry = "CA"; // Set the default country to Canada (CA)

  return (
    <div className="element-container">
      <div>
        <label>
          <h2
            id="heading"
            className="signup-heading"
            style={{ fontSize: "14px", color: "#FFAE00" }}
          >
            * Phone
          </h2>
        </label>
      </div>
      <PhoneInput
        placeholder="Enter phone number"
        value={value}
        defaultCountry={defaultCountry}
        onCountryChange={onCountryChange}
        onChange={onChange}
        limitMaxLength={true}
      />
    </div>
  );
};

export default PhoneNumber;
