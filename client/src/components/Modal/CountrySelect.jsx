import React from "react";
import { CountryDropdown } from "react-country-region-selector";

const CountrySelect = ({ value, onChange }) => {
  return (
    <div className="element-container">
      <div>
        <label className="star">*</label>
        <label className="input-label">Country</label>
      </div>
      <CountryDropdown value={value} onChange={onChange} />
    </div>
  );
};

export default CountrySelect;
