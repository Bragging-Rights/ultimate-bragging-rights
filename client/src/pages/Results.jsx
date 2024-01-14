import React, { useState } from "react";
import MainNavBar from "../components/MainNavBar";
import resultHero from "../assets/resultHero.png";
import HeroSection from "../components/HeroSection";
import GamesPageSelect from "../components/GamesPageSelect";
import Line from "../components/Line";
import Banner from "../components/Banner";
import ResultTabs from "../components/ResultTabs";
import TableComponent from "../components/tableComponent/TableComponent";
import NightlyStatsTable from "../components/NightlyStatsTable/NightlyStatsTable";

import img1 from "../assets/card.png";
import img2 from "../assets/card2.png";
import NightResult from "../components/NightResult/NightResult";

const Results = () => {
  const [CurrentTab, setCurrentTab] = useState(0);

  const changeTab = (val) => {
    setCurrentTab(val);
  };

  const date = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = date.toLocaleDateString("en-US", options);

  return (
    <>
      <MainNavBar />

      <div className="flex flex-wrap gap-1 items-center">
        {/* <GamesPageSelect
          options={[
            "Season",
            "Pre-Season",
            "Regular",
            "Playoffs",
            "Play-In",
            "Wild Card",
          ]}
        />
        <GamesPageSelect
          options={[
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ]}
          label={"DAY"}
        />
        <GamesPageSelect
          options={[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ]}
          label={"MONTH"}
        />
        <GamesPageSelect
          options={["2023-2024", "2023-2024", "2023-2024", "2023-2024"]}
          label={"2023-2024"}
        />
        <GamesPageSelect
          options={[
            "Season",
            "Pre-Season",
            "Regular",
            "Playoffs",
            "Play-In",
            "Wild Card",
          ]}
        />
        <GamesPageSelect
          options={[
            "Season",
            "Pre-Season",
            "Regular",
            "Playoffs",
            "Play-In",
            "Wild Card",
          ]}
          label={"SEASON"}
        />
        <GamesPageSelect
          options={[
            "Season",
            "Pre-Season",
            "Regular",
            "Playoffs",
            "Play-In",
            "Wild Card",
          ]}
          label={"TEAMS"}
        />
        <GamesPageSelect
          options={[
            "Season",
            "Pre-Season",
            "Regular",
            "Playoffs",
            "Play-In",
            "Wild Card",
          ]}
          label={"ALL DIVISIONS"}
        />
        <GamesPageSelect
          options={[
            "Season",
            "Pre-Season",
            "Regular",
            "Playoffs",
            "Play-In",
            "Wild Card",
          ]}
          label={"ALL CONFERE..."}
        />
        <button className="w-32 h-10 rounded bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300 cursor-pointer text-[#1B1C21] text-xs font-extrabold">
          Reset
        </button> */}

        <HeroSection imgUrl={resultHero} alt="img" />
        <Line />
          <Banner date={formattedDate} label={"Game Breakdowns"} />
        <ResultTabs changeTab={changeTab} CurrentTab={CurrentTab} />
        {CurrentTab === 0 ? (
          <TableComponent />
        ) : CurrentTab === 1 ? (
          <NightResult />
        ) : CurrentTab === 2 ? (
          <NightlyStatsTable />
        ) : (
          ""
        )}
        <Line />

        <div className=" flex gap-8 my-4">
          <div>
            <img src={img1} alt="img1" className=" w-full" />
          </div>
          <div>
            <img src={img2} alt="img2" className=" w-full" />
          </div>
        </div>
        <Banner date={formattedDate} label={"Game Breakdowns"} />

        <ResultTabs changeTab={changeTab} CurrentTab={CurrentTab} />
        {CurrentTab === 0 ? (
          <TableComponent />
        ) : CurrentTab === 1 ? (
          <NightResult />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Results;
