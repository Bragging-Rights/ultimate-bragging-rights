import React from "react";
import { Box, Typography, Container } from "@mui/material";

const Banner = ({ date, label }) => {
  return (
    <Box
      component="div"
      className="h-14 my-5 justify-start"
      sx={{
        backgroundColor: "#FF0000",
        // background:
        //   "linear-gradient(180deg, #BE8200 0%, #FEF098 47.4%, #EFD261 100%)",
        color: "white",
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            fontSize={{ xs: "lg", md: "xl", lg: "2xl" }}
          >
            {date}
          </Typography>
          {/* Uncomment the lines below if you want to display the 'label' */}
          {/* <Typography
            variant="h6"
            fontWeight="bold"
            fontSize={{ xs: "lg", md: "xl", lg: "2xl" }}
          >
            {label}
          </Typography> */}
        </Box>
      </Container>
    </Box>
  );
};

export default Banner;
