import React, { useState } from "react";
import Line from "../components/Line";
import ResultTabs from "../components/ResultTabs";
import TableComponent from "../components/TableComponent/TableComponent";
import NightlyStatsTable from "../components/NightlyStatsTable/NightlyStatsTable";
import NightResult from "../components/NightResult/NightResult";
import { Grid } from "@mui/material";

const Results = () => {
  const [CurrentTab, setCurrentTab] = useState(0);

  const changeTab = (val) => {
    setCurrentTab(val);
  };

  return (
    <>
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item xs={12}>
          <Line />
        </Grid>

        {/* <Grid item xs={12} display="flex" justifyContent="center">
          <ResultTabs changeTab={changeTab} CurrentTab={CurrentTab} />
        </Grid> */}
        <Grid item xs={12}>
          {CurrentTab === 0 ? (
            <TableComponent />
          ) : CurrentTab === 1 ? (
            <NightResult />
          ) : CurrentTab === 2 ? (
            <NightlyStatsTable />
          ) : (
            ""
          )}
        </Grid>
        <Grid item xs={12}>
          <Line />
        </Grid>
      </Grid>
    </>
  );
};

export default Results;
