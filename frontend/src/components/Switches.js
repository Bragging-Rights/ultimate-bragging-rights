import React, { useState } from "react";

const Switches = (props) => {
  const {
    league,
    season,
    setPick_num_ot,
    setPick_so,
    setPick_ot,
    setPick_Reg,
    setPick_Ei,
    uniqueId,
    glowing,
    setGameEnding,
  } = props;

  const [regChecked, setRegChecked] = useState(false);
  const [otChecked, setOtChecked] = useState(false);
  const [soChecked, setSoChecked] = useState(false);
  const [eiChecked, setEiChecked] = useState(false);

  const handleRadioChange = (endingType) => {
    setGameEnding(endingType); // Update gameEnding in the parent
    setRegChecked(endingType === "Reg");
    setOtChecked(endingType === "O/T");
    setSoChecked(endingType === "S/O");
    setEiChecked(endingType === "E/I");
  };

  return (
    <div className="flex md:flex-row gap-5">
      {(league === "NHL" &&
        (season === "Regular" || season === "Pre Season")) ||
      (league === "NHL" && season === "Playoffs") ? (
        <>
          <div className="flex mt-4 gap-1 items-center">
            <input
              type="radio"
              name={`gameEnding-${uniqueId}`}
              onClick={() => {
                handleRadioChange("Reg");
                setRegChecked(true);
                setOtChecked(false);
                setSoChecked(false);
                setPick_Reg(true);
                setPick_ot(false);
                setPick_so(false);
              }}
              checked={regChecked}
              className={`${glowing ? "glowing-border" : ""}`}
            />
            <label className="card-label">Reg</label>
          </div>
          <div className="flex mt-4 gap-1 items-center">
            <input
              type="radio"
              name={`gameEnding-${uniqueId}`}
              onClick={() => {
                handleRadioChange("O/T");
                setRegChecked(false);
                setOtChecked(true);
                setSoChecked(false);
                setPick_Reg(false);
                setPick_ot(true);
                setPick_so(false);
              }}
              checked={otChecked}
              className={`${glowing ? "glowing-border" : ""}`}
            />
            <label className="card-label">O/T</label>
          </div>
          <div className="flex mt-4 gap-1 items-center">
            <input
              type="radio"
              name={`gameEnding-${uniqueId}`}
              onClick={() => {
                handleRadioChange("S/O");
                setRegChecked(false);
                setOtChecked(false);
                setSoChecked(true);
                setPick_Reg(false);
                setPick_ot(false);
                setPick_so(true);
              }}
              checked={soChecked}
              className={`${glowing ? "glowing-border" : ""}`}
            />
            <label className="card-label">S/O</label>
          </div>
          <select
            className="mt-4"
            onChange={(e) => setPick_num_ot(e.target.value)}
            disabled={regChecked}
          >
            {Array.from({ length: 11 }, (_, i) => (
              <option key={i} value={i}>
                {i}
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
              name={`gameEnding-${uniqueId}`}
              onClick={() => {
                handleRadioChange("Reg");
                setRegChecked(true);
                setOtChecked(false);
                setPick_Reg(true);
                setPick_ot(false);
              }}
              checked={regChecked}
              className={`${glowing ? "glowing-border" : ""}`}
            />
            <label className="card-label">Reg</label>
          </div>
          <div className="flex mt-4 gap-1 items-center">
            <input
              type="radio"
              name={`gameEnding-${uniqueId}`}
              onClick={() => {
                handleRadioChange("O/T");
                setRegChecked(false);
                setOtChecked(true);
                setPick_Reg(false);
                setPick_ot(true);
              }}
              checked={otChecked}
              className={`${glowing ? "glowing-border" : ""}`}
            />
            <label className="card-label">O/T</label>
          </div>
          <select
            className="mt-4"
            onChange={(e) => setPick_num_ot(e.target.value)}
            disabled={regChecked}
          >
            {Array.from({ length: 11 }, (_, i) => (
              <option key={i} value={i}>
                {i}
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
              name={`gameEnding-${uniqueId}`}
              onClick={() => {
                handleRadioChange("Reg");
                setRegChecked(true);
                setEiChecked(false);
                setPick_Reg(true);
                setPick_Ei(false);
              }}
              checked={regChecked}
              className={`${glowing ? "glowing-border" : ""}`}
            />
            <label className="card-label">Reg</label>
          </div>
          <div className="flex mt-4 gap-1 items-center">
            <input
              type="radio"
              name={`gameEnding-${uniqueId}`}
              onClick={() => {
                handleRadioChange("E/I");
                setRegChecked(false);
                setEiChecked(true);
                setPick_Reg(false);
                setPick_Ei(true);
              }}
              checked={eiChecked}
              className={`${glowing ? "glowing-border" : ""}`}
            />
            <label className="card-label">E/I</label>
          </div>

          <select
            className="mt-4"
            onChange={(e) => setPick_num_ot(e.target.value)}
            disabled={!eiChecked}
          >
            {Array.from({ length: 11 }, (_, i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
};

export default Switches;
