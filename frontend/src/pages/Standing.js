import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { standingPageReducer } from "../store/searchBarSlice";
import Line from "../components/Line";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import NightlyBoardTabs from "../components/NightlyBoardTabs";


import StandingsTables from "../components/StandingsTables/StandingsTables";
import SeasonTables from "../components/SeasonTables/SeasonTables";

const Standing = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(standingPageReducer());
  }, [dispatch]);

  const [CurrentTab, setCurrentTab] = useState(0);

  const changeTab = (val) => {
    setCurrentTab(val);
  };

  return (
    <div className=" w-full text-white">
      <Grid item xs={12}>
        <Line />
      </Grid>
      <br />
      <Grid>
        <NightlyBoardTabs changeTab={changeTab} CurrentTab={CurrentTab}/>
      </Grid>
      <br />
      <Grid item xs={12}>
          {CurrentTab === 0 ? (
            <StandingsTables />
          ) : CurrentTab === 1 ? (
            <SeasonTables />
          ) : CurrentTab === 2 ? (
            <StandingsTables />
          ) : (
            ""
          )}
        </Grid>
        <br/>
    </div>
  );
};

export default Standing;
