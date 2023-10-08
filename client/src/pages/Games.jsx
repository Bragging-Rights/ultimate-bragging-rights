import React, { useState } from "react";
import heroImg from "../assets/gamesHero.png";
import HeroSection from "../components/HeroSection";
import MainNavBar from "../components/MainNavBar";
import Line from "../components/Line";
import Banner from "../components/Banner";
import GameCard from "../components/GameCard/GameCard";
import img1 from "../assets/card.png";
import img2 from "../assets/card2.png";
import GamerCardRight from "../components/GameCard/GamerCardRight/GamerCardRight";
import { getGames } from "../services/games";
import { useQuery } from "react-query";

const Games = () => {
  const [gameData, setGameData] = useState([]);

  const { isLoading, isError, data, error, reset } = useQuery(
    "getGames",
    getGames,
    {
      onSuccess: (fetchedData) => {
        setGameData(fetchedData.data.data);
      },
      onError: (error) => {
        console.error("An error occurred:", error);
      },
    }
  );

  const date = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = date.toLocaleDateString("en-US", options);

  return (
    <div className=" w-full">
      <HeroSection imgUrl={heroImg} />
      <MainNavBar />
      <Line />
      <Banner date={formattedDate} label={"Upcoming Games"} />
      <div className=" grid grid-cols-2 gap-4 ">
        <GameCard />
        <GamerCardRight />
      </div>
      <div className=" grid grid-cols-2 gap-4 ">
        <GameCard />
        <GamerCardRight />
      </div>
      <div className=" my-2">
        <Line />
      </div>

      <div className=" flex gap-8 my-4">
        <div>
          <img src={img1} alt="img1" className=" w-full" />
        </div>
        <div>
          <img src={img2} alt="img2" className=" w-full" />
        </div>
      </div>
      <Banner date={formattedDate} label={"Upcoming Games"} />
      <div className=" grid grid-cols-2 gap-4 ">
        <GameCard />
        <GamerCardRight />
      </div>
      <div className=" grid grid-cols-2 gap-4 ">
        <GameCard />
        <GamerCardRight />
      </div>
    </div>
  );
};

export default Games;
