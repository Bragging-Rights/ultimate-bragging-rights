import React from "react";
import { Grid } from "@material-ui/core";

const HeroSection = ({ imgUrl }) => {
  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <img
          src={imgUrl}
          alt="img"
          style={{ width: "100%", height: "auto",  }}
        />
      </Grid>
    </Grid>
  );
};

export default HeroSection;
