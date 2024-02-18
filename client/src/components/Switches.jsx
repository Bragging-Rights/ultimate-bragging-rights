import React, { useState } from "react";
import "./Switches.css";

const Switches = (props) => {
  const {
    league,
    season,
    setPick_num_ot,
    setPick_so,
    setPick_ot,
    setPick_Reg,
    setPick_Ei,
  } = props;

  const [regChecked, setRegChecked] = useState(true);
  const [otChecked, setOtChecked] = useState(false);
  const [soChecked, setSoChecked] = useState(false);
  const [eiChecked, setEiChecked] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-5">
      {(league === "NHL" &&
        (season === "Regular" || season === "Pre Season")) ||
      (league === "NHL" && season === "Playoffs") ? (
        <>
          <div className="flex mt-4 gap-1 items-center">
            <input
              type="radio"
              name="radio-group"
              onChange={() => {
                setRegChecked(true);
                setOtChecked(false);
                setSoChecked(false);
                setPick_Reg(true);
                setPick_ot(false);
                setPick_so(false);
              }}
              checked={regChecked}
            />
            <label className="card-label">Reg</label>
          </div>
          <div className="flex mt-4 gap-1 items-center">
            <input
              type="radio"
              name="radio-group"
              onChange={() => {
                setRegChecked(false);
                setOtChecked(true);
                setSoChecked(false);
                setPick_Reg(false);
                setPick_ot(true);
                setPick_so(false);
              }}
              checked={otChecked}
            />
            <label className="card-label">O/T</label>
          </div>
          <div className="flex mt-4 gap-1 items-center">
            <input
              type="radio"
              name="radio-group"
              onChange={() => {
                setRegChecked(false);
                setOtChecked(false);
                setSoChecked(true);
                setPick_Reg(false);
                setPick_ot(false);
                setPick_so(true);
              }}
              checked={soChecked}
            />
            <label className="card-label">S/O</label>
          </div>
          <select
            className="mt-4"
            onChange={(e) => setPick_num_ot(e.target.value)}
            disabled={regChecked}
          >
            {Array.from({ length: 30 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </>
      ) : null}

      {league === "NBA" && (
        <>
          <div className="flex mt-4 gap-1 items-center">
            <input
              type="radio"
              name="radio-group"
              value="Regular"
              onChange={() => {
                setRegChecked(true);
                setOtChecked(false);
                setPick_Reg(true);
                setPick_ot(false);
              }}
              checked={true}
            />
            <label className="card-label">Reg</label>
          </div>
          <div className="flex mt-4 gap-1 items-center">
            <input
              type="radio"
              name="radio-group"
              value="O/T"
              onChange={() => {
                setRegChecked(false);
                setOtChecked(true);
                setPick_Reg(false);
                setPick_ot(true);
              }}
            />
            <label className="card-label">O/T</label>
          </div>
          <select
            className="mt-4"
            onChange={(e) => setPick_num_ot(e.target.value)}
            disabled={regChecked}
          >
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </>
      )}

      {league === "MLB" && (
        <>
          <div className="flex mt-4 gap-1 items-center">
            <input
              type="radio"
              name="radio-group"
              onChange={() => {
                setRegChecked(true);
                setEiChecked(false);
                setPick_Reg(true);
                setPick_Ei(false);
              }}
              checked={true}
            />
            <label className="card-label">Reg</label>
          </div>
          <div className="flex mt-4 gap-1 items-center">
            <input />
            <label className="card-label">E/I</label>
          </div>

          <select
            className="mt-4"
            onChange={(e) => setPick_num_ot(e.target.value)}
          >
            {Array.from({ length: 20 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
};

export default Switches;
