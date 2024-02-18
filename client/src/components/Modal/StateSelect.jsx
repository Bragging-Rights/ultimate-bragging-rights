import React from "react";
import CustomSelect from "../CustomSelect/CustomSelect";

import { State } from "country-state-city";

const StateSelect = ({ country, onChange }) => {
  const result = State.getStatesOfCountry(country);

  return (
    <div className="element-container">
      <div>
      <label>
  <h2
    id="heading"
    className="signup-heading"
    style={{ fontSize: "14px", color: "#FFAE00" }}
  >
   * State / Province
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

export default StateSelect;
