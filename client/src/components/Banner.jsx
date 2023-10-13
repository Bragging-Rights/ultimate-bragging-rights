import React from "react";

const Banner = ({ date, label }) => {
  return (
    <div
      className="h-14 w-full flex items-center my-5"
      style={{
        background:
          "linear-gradient(180deg, #BE8200 0%, #FEF098 47.4%, #EFD261 100%)",
      }}
    >
      <div className="w-full md:w-2/3 flex flex-col md:flex-row justify-center md:justify-between text-center md:text-left">
        <div className="md:ml-8 text-lg font-bold md:text-xl lg:text-2xl">
          {date}
        </div>
        <div className="md:ml-8 text-lg font-bold md:text-xl lg:text-2xl">
          {label}
        </div>
      </div>
    </div>
  );
};

export default Banner;
