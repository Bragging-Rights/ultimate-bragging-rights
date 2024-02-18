import React from "react";

import { City } from "country-state-city";
import CustomSelect from "../CustomSelect/CustomSelect";

const CitySelect = ({ countryCode, stateCode, onChange }) => {
  const result = City.getCitiesOfState(countryCode, stateCode);

  return (
    <div className="element-container">
      <label>
        <h2
          id="heading"
          className="signup-heading"
          style={{ fontSize: "14px", color: "#FFAE00" }}
        >
          * Select City
        </h2>
      </label>

      <CustomSelect
        options={result?.map((city) => ({
          label: city?.name,
          value: city.name,
        }))}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};

export default CitySelect;
