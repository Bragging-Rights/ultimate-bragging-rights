import React from "react";

const Switches = (props) => {
  const { league, season } = props;

  if (league === "NHL" && season === "Regular") {
    return (
      <div className="flex gap-5">
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="Regular" />
          <label className="card-label">Reg</label>
        </div>
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="O/T" />
          <label className="card-label">O/T</label>
        </div>
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="S/O" />
          <label className="card-label">S/O</label>
        </div>
      </div>
    );
  }

  if (league === "NHL" && season === "Playoffs") {
    return (
      <div className="flex gap-5">
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="Regular" />
          <label className="card-label">Reg</label>
        </div>
      </div>
    );
  }

  if (league === "NBA" && season === "Regular") {
    return (
      <div className="flex gap-5">
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="Regular" />
          <label className="card-label">Reg</label>
        </div>
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="OT" />
          <label className="card-label">OT</label>
        </div>
        <div className="flex mt-4 gap-1 items-center">
          <select>
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i}>{i + 1}</option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  if (league === "NBA" && season === "Playoffs") {
    return (
      <div className="flex gap-5">
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="Regular" />
          <label className="card-label">Reg</label>
        </div>
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="OT" />
          <label className="card-label">OT</label>
        </div>
        <div className="flex mt-4 gap-1 items-center">
          <select>
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i}>{i + 1}</option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  if (league === "NFL" && season === "Regular") {
    return (
      <div className="flex gap-5">
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="Regular" />
          <label className="card-label">Reg</label>
        </div>
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="OT" />
          <label className="card-label">OT</label>
        </div>
      </div>
    );
  }

  if (league === "NFL" && season === "Playoffs") {
    return (
      <div className="flex gap-5">
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="Regular" />
          <label className="card-label">Reg</label>
        </div>
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="OT" />
          <label className="card-label">OT</label>
        </div>
        <div className="flex mt-4 gap-1 items-center">
          <select>
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i}>{i + 1}</option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  if (league === "MLB" && season === "Regular") {
    return (
      <div className="flex gap-5">
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="Regular" />
          <label className="card-label">Reg</label>
        </div>
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="EI" />
          <label className="card-label">EI</label>
        </div>
        <div className="flex mt-4 gap-1 items-center">
          <select>
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i}>{i + 1}</option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  if (league === "MLB" && season === "Playoffs") {
    return (
      <div className="flex gap-5">
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="Regular" />
          <label className="card-label">Reg</label>
        </div>
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="EI" />
          <label className="card-label">EI</label>
        </div>
        <div className="flex mt-4 gap-1 items-center">
          <select>
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i}>{i + 1}</option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  return null;
};

export default Switches;
