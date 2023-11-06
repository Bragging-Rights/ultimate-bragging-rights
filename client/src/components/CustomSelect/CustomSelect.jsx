import React from "react";
import Select from "react-select";

const customStyles = {
  control: (provided) => ({
    ...provided,
    padding: "10px 20px",
    borderRadius: "5px",
    border: "1px solid #3C3C3C",
    background: "#2C2C2C",
    color: "white",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "white",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "white" : "black",
    background: state.isSelected ? "#3C3C3C" : "white",
  }),
  input: (provided) => ({
    ...provided,
    color: "white",
  }),
};

const CustomSelect = (props) => {
  const { options, onChange } = props;
  return <Select options={options} onChange={onChange} styles={customStyles} />;
};

export default CustomSelect;
