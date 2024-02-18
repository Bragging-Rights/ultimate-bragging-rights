import React from "react";

const items = ["Ranking", "Accuracy", "Odds", "Streaks", "Endings"];
const NightStateTopBar = () => {
  return (
    <div
      className=" flex w-full h-10 justify-between
      rounded
      items-center
      my-4
      border
      bg-[#1B1C21]
      border-[rgb(98,98,98)]
    "
    >
      {items.map((item, indx) => {
        return (
          <div
            className={` px-7  text-lg font-medium
                    
                   ${indx === 0 ? "bg-[#737373] text-[#EFD261]" : " text-white"}
                    h-full
                    flex
                    justify-center
                    items-center
                    gap-5
                    cursor-pointer
                  `}
            kye={indx}
          >
            {indx === 0 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={13}
                height={13}
                viewBox="0 0 13 13"
                fill="none"
              >
                <path
                  d="M11.4951 7.67903C12.7698 7.03509 12.7698 5.21491 11.4951 4.57097L3.16886 0.364702C2.01081 -0.220322 0.642717 0.621298 0.642717 1.91873V10.3313C0.642717 11.6287 2.01081 12.4703 3.16885 11.8853L11.4951 7.67903Z"
                  fill="url(#paint0_linear_323_5751)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_323_5751"
                    x1="14.5713"
                    y1="6.125"
                    x2="-4.00014"
                    y2="6.125"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#BE8200" />
                    <stop offset="0.473958" stopColor="#FEF098" />
                    <stop offset={1} stopColor="#EFD261" />
                  </linearGradient>
                </defs>
              </svg>
            )}
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default NightStateTopBar;
