import React from "react";

const ResultTabs = ({ changeTab, CurrentTab }) => {
  const tabs = ["Game Breakdowns", "Nightly Results"];
  const additionalTabs = ["MINE", "BUDDIES", "LEAGUE"];

  return (
    <div>
      <ul className="flex h-12 items-center gap-5 border-b-[#393939] border-b-[1px] mb-2">
        {tabs?.map((tab, ind) => (
          <li
            className={`h-full cursor-pointer text-base font-medium ${
              CurrentTab === ind
                ? "text-[#FEF098] border-b-[1px] border-b-[#BE8200]"
                : "text-white"
            }`}
            key={ind}
            onClick={() => changeTab(ind)}
          >
            {tab}
          </li>
        ))}
      </ul>

      <ul className="flex h-12 items-center gap-5 border-b-[#393939] border-b-[1px] mb-2">
        {additionalTabs?.map((tab, ind) => (
          <li
            className={`h-full cursor-pointer text-base font-medium ${
              CurrentTab === ind + tabs.length
                ? "text-[#FEF098] border-b-[1px] border-b-[#BE8200]"
                : "text-white"
            }`}
            key={ind + tabs.length}
            onClick={() => changeTab(ind + tabs.length)}
          >
            {tab}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultTabs;
