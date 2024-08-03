import React from "react";
import Line from "../components/Line";
import {
  Box,
  Container,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1d1d1d",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#ffffff",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "#ffffff",
        },
        input: {
          color: "#ffffff",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: "#ffffff",
        },
      },
    },
  },
});

const Season = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="w-full text-white">
        <Grid item xs={12}>
          <Line />
        </Grid>
        <br />
        <Container>
          <Tabs value={tabValue} onChange={handleChange} aria-label="season tabs">
            <Tab label="Season Settings" />
          </Tabs>
          {tabValue === 0 && (
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <TextField
                    label="Start Date"
                    type="date"
                    style={{backgroundColor : '#212227'}}
                    InputLabelProps={{
                      shrink: true,
                      style: { color: '#ffffff' },
                    }}
                    InputProps={{
                      style: { color: '#ffffff' },
                      inputProps: { style: { color: '#ffffff' } },
                    }}
                    fullWidth
                    variant="outlined"
                    
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ffffff',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ffffff',
                      },
                      '& .MuiSvgIcon-root': {
                        color: '#ffffff',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="End Date"
                    type="date"
                    style={{backgroundColor : '#212227'}}
                    InputLabelProps={{
                      shrink: true,
                      style: { color: '#ffffff' },
                    }}
                    InputProps={{
                      style: { color: '#ffffff' },
                      inputProps: { style: { color: '#ffffff' } },
                    }}
                    fullWidth
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ffffff',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ffffff',
                      },
                      '& .MuiSvgIcon-root': {
                        color: '#ffffff',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="league-select-label">League</InputLabel>
                    <Select
                      labelId="league-select-label"
                      label="League"
                      sx={{
                        color: '#ffffff',
                        '.MuiOutlinedInput-notchedOutline': {
                          borderColor: '#ffffff',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#ffffff',
                        },
                        '.MuiSvgIcon-root': {
                          color: '#ffffff',
                        },
                      }}
                    >
                      <MenuItem value="NFL">NFL</MenuItem>
                      <MenuItem value="NHL">NHL</MenuItem>
                      <MenuItem value="CFL">CFL</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="season-select-label">Season</InputLabel>
                    <Select
                      labelId="season-select-label"
                      label="Season"
                      sx={{
                        color: '#ffffff',
                        '.MuiOutlinedInput-notchedOutline': {
                          borderColor: '#ffffff',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#ffffff',
                        },
                        '.MuiSvgIcon-root': {
                          color: '#ffffff',
                        },
                      }}
                    >
                      <MenuItem value="pre-season">Pre Season</MenuItem>
                      <MenuItem value="reg-season">Regular Season</MenuItem>
                      <MenuItem value="playoffs">Playoffs</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          )}
        </Container>
        <br/>
        <Grid item xs={12}>
          <Line />
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default Season;
