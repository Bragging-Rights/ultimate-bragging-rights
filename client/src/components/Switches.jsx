import React from "react";

const Switches = (props) => {
  const { leage, season } = props;

  if (leage === "Hocky" && season === "Regular") {
    return (
      <div className=" flex gap-5">
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="Regular" />
          <label className="card-label">REG</label>
        </div>
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="Regular" />
          <label className="card-label">REG</label>
        </div>
      </div>
    );
  }
  if (leage === "Football" && season === "Regular") {
    return (
      <div className=" flex gap-5">
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="Regular" />
          <label className="card-label">REG</label>
        </div>
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="Regular" />
          <label className="card-label">REG</label>
        </div>
      </div>
    );
  }

  if (leage === "Baseball") {
    return (
      <div className=" flex gap-5">
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="Regular" />
          <label className="card-label">REG</label>
        </div>
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="Regular" />
          <label className="card-label">REG</label>
        </div>
      </div>
    );
  }

  if (leage === "Basketball") {
    return (
      <div className=" flex gap-5">
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="Regular" />
          <label className="card-label">REG</label>
        </div>
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="Regular" />
          <label className="card-label">REG</label>
        </div>
      </div>
    );
  }
  if (leage === "Football" && season === "Playoffs") {
    return (
      <div className=" flex gap-5">
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="Regular" />
          <label className="card-label">REG</label>
        </div>
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="Regular" />
          <label className="card-label">REG</label>
        </div>
      </div>
    );
  }

  if (leage === "Hocky" && season === "Playoffs") {
    return (
      <div className=" flex gap-5">
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="Regular" />
          <label className="card-label">REG</label>
        </div>
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="Regular" />
          <label className="card-label">REG</label>
        </div>
      </div>
    );
  }
};

export default Switches;
