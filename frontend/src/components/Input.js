import React, { useState, useEffect } from "react";

const Input = (props) => {
  return (
    <div className="form-group">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        name={props.name}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        className={`form-control ${props.className}`}
        required={props.required}
      />
    </div>
  );
};

export default Input;
