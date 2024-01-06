import React from "react";
import { CountryDropdown } from "react-country-region-selector";
import CustomSelect from "../CustomSelect/CustomSelect";
import { Country } from "country-state-city";

const CountrySelect = ({ value, onChange }) => {
  const result = Country.getAllCountries();

  return (
    <div className="element-container">
      <div>
      <label>
  <h2
    id="heading"
    className="signup-heading"
    style={{ fontSize: "14px", color: "#FFAE00" }}
  >
    * Country
  </h2>
</label>

      </div>
      <CustomSelect
        options={result?.map((country) => ({
          label: country?.name,
          value: country.isoCode,
        }))}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};

export default CountrySelect;
