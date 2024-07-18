import React, { useState, useEffect } from "react";

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

  const [regChecked, setRegChecked] = useState(true);
  const [otChecked, setOtChecked] = useState(false);
  const [soChecked, setSoChecked] = useState(false);
  const [eiChecked, setEiChecked] = useState(false);

  useEffect(() => {
    if (regChecked) {
      setPick_Reg(true);
      setPick_ot(false);
      setPick_so(false);
      setPick_Ei(false);
    }
  }, [regChecked]);

  const handleRadioChange = (endingType) => {
    setGameEnding(endingType);
    setRegChecked(endingType === "Reg");
    setOtChecked(endingType === "O/T");
    setSoChecked(endingType === "SO");
    setEiChecked(endingType === "E/I");
  };

  return (
    <div className="flex md:flex-row gap-5">
      {league === "NHL" && (
        <>
          <div className="flex mt-4 gap-1 items-center">
            <input
              type="radio"
              name={`gameEnding-${uniqueId}`}
              onClick={() => handleRadioChange("Reg")}
              checked={regChecked}
              className={`${glowing ? "glowing-border" : ""}`}
            />
            <label className="card-label">Reg</label>
          </div>
          <div className="flex mt-4 gap-1 items-center">
            <input
              type="radio"
              name={`gameEnding-${uniqueId}`}
              onClick={() => handleRadioChange("O/T")}
              checked={otChecked}
              className={`${glowing ? "glowing-border" : ""}`}
            />
            <label className="card-label">O/T</label>
          </div>
          <div className="flex mt-4 gap-1 items-center">
            <input
              type="radio"
              name={`gameEnding-${uniqueId}`}
              onClick={() => handleRadioChange("SO")}
              checked={soChecked}
              className={`${glowing ? "glowing-border" : ""}`}
            />
            <label className="card-label">SO</label>
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

      {league === "NBA" && (
        <>
          <div className="flex mt-4 gap-1 items-center">
            <input
              type="radio"
              name={`gameEnding-${uniqueId}`}
              onClick={() => handleRadioChange("Reg")}
              checked={regChecked}
              className={`${glowing ? "glowing-border" : ""}`}
            />
            <label className="card-label">Reg</label>
          </div>
          <div className="flex mt-4 gap-1 items-center">
            <input
              type="radio"
              name={`gameEnding-${uniqueId}`}
              onClick={() => handleRadioChange("O/T")}
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
              onClick={() => handleRadioChange("Reg")}
              checked={regChecked}
              className={`${glowing ? "glowing-border" : ""}`}
            />
            <label className="card-label">Reg</label>
          </div>
          <div className="flex mt-4 gap-1 items-center">
            <input
              type="radio"
              name={`gameEnding-${uniqueId}`}
              onClick={() => handleRadioChange("E/I")}
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

      {league === "NFL" && (
        <>
          <div className="flex mt-4 gap-1 items-center">
            <input
              type="radio"
              name={`gameEnding-${uniqueId}`}
              onClick={() => handleRadioChange("Reg")}
              checked={regChecked}
              className={`${glowing ? "glowing-border" : ""}`}
            />
            <label className="card-label">Reg</label>
          </div>
          <div className="flex mt-4 gap-1 items-center">
            <input
              type="radio"
              name={`gameEnding-${uniqueId}`}
              onClick={() => handleRadioChange("O/T")}
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
    </div>
  );
};

export default Switches;
