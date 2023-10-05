import React from "react";

const ResultTabs = ({ changeTab, CurrentTab }) => {
  const tabs = ["Game Breakdowns", "Nightly Results", "Nightly Stats"];
  return (
    <ul className=" flex h-12 items-center gap-5 border-b-[#393939] border-b-[1px]  mb-2">
      {tabs?.map((tab, ind) => (
        <li
          className={` h-full cursor-pointer text-base font-medium ${
            CurrentTab === ind
              ? " text-[#FEF098] border-b-[1px] border-b-[#BE8200]"
              : " text-white"
          }`}
          key={ind}
          onClick={() => changeTab(ind)}
        >
          {tab}
        </li>
      ))}
    </ul>
  );
};

export default ResultTabs;
