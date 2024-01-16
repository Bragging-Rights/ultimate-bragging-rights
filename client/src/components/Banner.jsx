import React from "react";

const Banner = ({ date, label }) => {
  return (
    <div
      className="h-14 my-5 justify-center" // Update className to "justify-center"
      style={{
        backgroundColor: "#FF0000",
        // background:
        //   "linear-gradient(180deg, #BE8200 0%, #FEF098 47.4%, #EFD261 100%)",
        color: "white",
      }}
    >
      <div className="w-full md:w-3/3 ">
        <div className="md:ml-8 text-lg font-bold md:text-xl lg:text-2xl text-center">
          {date}
        </div>
        {/* <div className="md:ml-8 text-lg font-bold md:text-xl lg:text-2xl">
        {label}
      </div> */}
      </div>
    </div>
  );
};

export default Banner;
