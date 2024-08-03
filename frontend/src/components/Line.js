import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import goldline from "../assets/goldline.png"
const useStyles = makeStyles((theme) => ({
  // line: {
  //   width: "80%",
  //   height: "4px",
  //   borderRadius: "4px",
  //   background: "linear-gradient(180deg, #BE8200 0%, #FEF098 47.4%, #EFD261 100%)",
  //   margin: "0 auto", 
  // }
  
}));

const Line = () => {
  const classes = useStyles();

  // return <Box className={classes.line}>
  return  <Box>
    <img src={goldline} style={{width:"95%", margin:"0 auto", display:"flex"}} />
  </Box>;
};

export default Line;
