import React from "react";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  line: {
    width: "100%",
    height: "2px",
    borderRadius: "4px",
    opacity: "0.5",
    background:
      "linear-gradient(180deg, #BE8200 0%, #FEF098 47.4%, #EFD261 100%)",
  },
}));

const Line = () => {
  const classes = useStyles();

  return <Box className={classes.line}></Box>;
};

export default Line;
