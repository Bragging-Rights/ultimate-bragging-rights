import React, { useState } from "react";

const ResultTabs = ({ changeTab, CurrentTab }) => {
  const tabs = [
    { label: "Game Breakdown", options: ["MINE", "BUDDIES", "LEAGUE"] },
    { label: "Nightly Results", options: ["MINE2", "FRIENDS", "TEAM"] },
  ];

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabClick = (index) => {
    setSelectedTab(index);
    changeTab(index);
  };

  return (
    <div style={{ marginRight: "55vh" }}>
      <ul className="flex h-12 items-center gap-5 border-b-[#393939] border-b-[1px] mb-2">
        {tabs.map((tab, index) => (
          <li
            className={`h-full cursor-pointer text-base font-medium ${
              selectedTab === index
                ? "text-white bg-[#FF0000] border-b-[1px] border-b-[#BE8200]"
                : "text-white"
            }`}
            key={index}
            onClick={() => handleTabClick(index)}
            style={{
              width: "19vh",
              borderRadius: "3px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s ease", // Add transition for smooth animation
              display: "flex",
              justifyContent: "center", // Center the text horizontally
              alignItems: "center", // Center the text vertically
            }}
          >
            {tab.label}
          </li>
        ))}
      </ul>
      <ul className="flex h-12 items-center gap-5 border-b-[#393939] border-b-[1px] mb-2">
        {tabs[selectedTab].options.map((option, index) => (
          <li
            className={`h-full cursor-pointer text-base font-medium ${
              CurrentTab === index + tabs.length
                ? "text-white bg-[#FF0000] border-b-[1px] border-b-[#BE8200]"
                : "text-white"
            }`}
            key={index + tabs.length}
            onClick={() => changeTab(index + tabs.length)}
            style={{
              width: "13vh",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s ease", // Add transition for smooth animation
              display: "flex",
              justifyContent: "center", // Center the text horizontally
              alignItems: "center", // Center the text vertically
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultTabs;
