import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JS
import "./games.css"; // Import your custom CSS file
import { useLeagueContext } from "../services/LeagueContext";

import banner from "../assets/ad1.png";
import GamesBanner from "./GamesBanner/GamesBanner";
import GameCard from "./GameCard/GameCard";

const Games = () => {
  const { selectedLeague, gameData } = useLeagueContext();

  return (
    <div className="container-fluid">
      <img className="banner" src={banner} />
      <GamesBanner/>
      <div className=' row mt-4'
       style={{
        marginLeft:"-2px",
        gap:"32px"
       }}
     >
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <div className="row"
             style={{
              marginLeft:"-2px",
              gap:"32px"
             }}
        >
         <div className=" col-5" >
            <img src={require("../assets/gamesb1.png")}   alt="baner"
              style={{
                width:"100%"
              }}
            />
            
         </div>
         <div className=" col-5">
         <img src={require("../assets/gamesb2.jpeg")}   alt="baner" 
            style={{
              width:"100%"
            }}
         />

         </div>
         
         
      </div>
     </div>
     <GamesBanner/>
     <div className=' row mt-4'
       style={{
        marginLeft:"-2px",
        gap:"32px"
       }}
     >
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
     
     </div>
    </div>
  );
};

export default Games;
