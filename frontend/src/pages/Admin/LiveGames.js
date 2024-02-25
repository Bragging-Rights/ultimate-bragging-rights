import React, { useState } from "react";
import { getGames } from "../../Apis/games";
import { useQuery } from "react-query";
import displayToast from "../../components/Alert/Alert";
import GameCard from "../../components/GameCard/GameCard";
import GamerCardRight from "../../components/GameCard/GamerCardRight/GamerCardRight";
import { format } from "date-fns";

const LiveGames = () => {
  // const [selectedDate, setSelectedDate] = useState("2023-10-18"); // Example date
  // const [selectedLeague, setSelectedLeague] = useState("yourLeague"); // Default league

  const [gameData, setGameData] = useState([]);

  const date = new Date();

  const formattedDateForAPI = format(date, "yyyy-MM-dd");

  const {
    isLoading: loadingTeams,
    isError: teamError,
    data: teamsData,
  } = useQuery(["teams", formattedDateForAPI, "NHL"], getGames, {
    onSuccess: (fetchedData) => {
      console.log("fetchedData", fetchedData);
      setGameData(fetchedData.data);
    },
    onError: (error) => {
      console.error("An error occurred:", error);
    },
  });

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = date.toLocaleDateString("en-US", options);

  const generateLeagueOptions = () => {
    return (
      <>
        <option value="">Select a league</option>
        <option value="NFL">NFL</option>
        <option value="NBA">NBA</option>
        <option value="NHL">NHL</option>
        <option value="MLB">MLB</option>
      </>
    );
  };

  return (
    <div>
      <h2 className="text-white text-xl mb-4 align-items-center">Live Games</h2>
      <div className="flex flex-wrap -mx-2">
        <div className=" grid grid-cols-2 gap-4 ">
          {gameData?.map((game, index) =>
            index % 2 === 0 ? (
              <GameCard gameData={game} />
            ) : (
              <GamerCardRight gameData={game} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveGames;
