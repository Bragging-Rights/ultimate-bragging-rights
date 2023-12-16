import React from "react";

import { City } from "country-state-city";
import CustomSelect from "../CustomSelect/CustomSelect";

const CitySelect = ({ countryCode, stateCode, onChange }) => {
  const result = City.getCitiesOfState(countryCode, stateCode);

  return (
    <div className="element-container">
      <div>
        <label className="input-label">Select City</label>
      </div>
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
