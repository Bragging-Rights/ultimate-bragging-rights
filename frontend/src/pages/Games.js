import React, { useEffect, useState } from "react";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";

import HeroSection from "../components/HeroSection.js";
import MainNavBar from "../components/MainNavBar";
import Line from "../components/Line.js";
import Banner from "../components/Banner.js";
import GameCard from "../components/GameCard/GameCard.js";
import img1 from "../assets/card.png";
import img2 from "../assets/card2.png";
import GamerCardRight from "../components/GameCard/GamerCardRight/GamerCardRight.js";
import { getGames } from "../Apis/games.js";
import { useQuery } from "react-query";
import { format, add } from "date-fns";
import { useLeagueContext } from "../components/LeagueContext.js";
import imgBasketball1 from "../assets/Basketball-1.png";
import imgBasketball5 from "../assets/Basketball-5.png";
import imgFootball1 from "../assets/Football-1.png";
import imgFootball6 from "../assets/Football-6.png";
import imgHosckey1 from "../assets/Hockey-1.png";
import imgHosckey4 from "../assets/Hockey-4.png";
import banner from "../assets/banner.png";

const images = [
  imgBasketball1,
  imgBasketball5,
  imgFootball1,
  imgFootball6,
  imgHosckey1,
  imgHosckey4,
];

const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

const Games = () => {
  const gridStyles = {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    // gap: "1rem", // You can adjust the gap value accordingly
  };
  const [heroImg, setHeroImg] = useState(getRandomImage());
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const isAdmin = true; // Set this value based on whether the user is an admin or not
  const { selectedLeague } = useLeagueContext();
  const [gameData, setGameData] = useState([]);
  const [openRow, setOpenRow] = useState(null);
  const [tomorrowGameData, setTomorrowGameData] = useState([]); // Store tomorrow's games separately

  const date = new Date();

  const formattedDateForAPI = format(date, "MM-dd-yyyy");

  const getNextDate = (dateString, daysToAdd) => {
    const currentDate = new Date(dateString);
    const nextDate = add(currentDate, { days: daysToAdd });
    return nextDate;
  };

  const {
    isLoading: loadingTeams,
    isError: teamError,
    refetch: refetchTodayGame,
  } = useQuery(["teams", formattedDateForAPI, selectedLeague], getGames, {
    onSuccess: (fetchedData) => {
      setGameData(fetchedData.data);
    },
    enabled: false,
    onError: (error) => {
      console.error("An error occurred:", error);
    },
  });

  const tomorrow = add(date, { days: 1 });
  const formattedDateForTomorrow = format(tomorrow, "MM-dd-yyyy");

  const {
    isLoading: loadingTomorrowGames,
    isError: tomorrowGamesError,
    data: tomorrowGamesData,
    refetch: refetchTomorrowGame,
  } = useQuery(["teams", formattedDateForTomorrow, selectedLeague], getGames, {
    onSuccess: (fetchedData) => {
      setTomorrowGameData(fetchedData.data);
    },
    onError: (error) => {
      console.error("An error occurred:", error);
    },
  });

  // const options = {
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  // };

  // const formattedDate = date.toLocaleDateString("en-US", options);
  // const nextFormattedDate = getNextDate(formattedDate, 1).toLocaleDateString(
  //   "en-US",
  //   options
  // );

  useEffect(() => {
    refetchTodayGame();
    refetchTomorrowGame();
  }, [selectedLeague]);

  const handleToggle = (index) => {
    setOpenRow(openRow === index ? null : index);
  };

  //Images

  useEffect(() => {
    setHeroImg(getRandomImage());
  }, []);
  return (
    <Grid container spacing={2} direction="column">
      <img src={banner} alt="img1" className="w-full" />
      {/* <Grid item>
        <HeroSection imgUrl={heroImg} />
      </Grid>
      <Grid item>
        <MainNavBar />
      </Grid> */}
      <Grid item>
        <Line />
      </Grid>
      {/* <Grid item>
        <Banner date={formattedDate} label="Upcoming Games" />
      </Grid> */}
      <Grid
        className="game-grid"
        container
        item
        spacing={0.5}
        justifyContent="flex-start"
        sx={{
          width: isMobile ? "98%" : "110%",
          border: "hidden",
          marginBottom: "0%",
          marginTop: "0%",
          marginLeft: isMobile ? "0px" : "-60px",
        }}
      >
        {gameData && gameData.length > 0 ? (
          gameData.map((game, index) => (
            <Grid key={game.id} item xs={12} md={6}>
              {index % 2 === 0 ? (
                <GameCard
                  gameData={game}
                  isOpen={openRow === index}
                  onToggle={() => handleToggle(index)}
                  isAdmin={isAdmin}
                />
              ) : (
                // ""
                <GamerCardRight gameData={game}
                isOpen={openRow === index}
                  onToggle={() => handleToggle(index)}
                   />
              )}
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary">
            No games available.
          </Typography>
        )}
      </Grid>

      <Grid item>
        <Line />
      </Grid>
      <Grid container item spacing={2} justifyContent="flex-start">
        <Grid item xs={12} md={6}>
          <img src={img1} alt="img1" className="w-full" />
        </Grid>
        <Grid item xs={12} md={6}>
          <img src={img2} alt="img2" className="w-full" />
        </Grid>
      </Grid>
      {/* <Grid item>
        <Banner date={nextFormattedDate} label="Tomorrow's Games" />
      </Grid> */}
      {/* <Grid
        className="game-grid"
        container
        item
        spacing={2}
        justifyContent="flex-start"
        sx={{
          width: isMobile ? "80%" : "110%",
          marginLeft: isMobile ? "20px" : "-60px",
        }}
      >
        {" "}
        {tomorrowGameData ? (
          tomorrowGameData.length > 0 ? (
            tomorrowGameData.map((game, index) => (
              <Grid key={game.id} item xs={12} md={6}>
                {index % 2 === 0 ? (
                  <GameCard gameData={game} isAdmin={isAdmin} />
                ) : (
                  <GamerCardRight gameData={game} />
                )}
              </Grid>
            ))
          ) : (
            <Typography variant="body1" color="textSecondary">
              No games available for tomorrow.
            </Typography>
          )
        ) : (
          <Typography variant="body1" color="textSecondary">
            Loading tomorrow's games...
          </Typography>
        )}
      </Grid> */}
      <Box m={3} />
    </Grid>
  );
};

export default Games;
