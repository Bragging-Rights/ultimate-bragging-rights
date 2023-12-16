import React from "react";
import CustomSelect from "../CustomSelect/CustomSelect";

import { State } from "country-state-city";

const StateSelect = ({ country, onChange }) => {
  const result = State.getStatesOfCountry(country);

  return (
    <div className="element-container">
      <div>
        <label className="input-label">State / Province</label>
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
