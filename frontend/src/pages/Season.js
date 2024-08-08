import React, { useState } from "react";
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
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createSeasonDetail } from "../Apis/seasonDetails"; // Import the API function

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
  const [tabValue, setTabValue] = useState(0);
  const [formValues, setFormValues] = useState({
    startDate: "",
    endDate: "",
    league: "",
    season: "",
  });

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await createSeasonDetail(formValues);
      console.log("Season detail created successfully:", response);
      alert("Season created successfully!");
    } catch (error) {
      console.error("Error creating season detail:", error);
  
      // Check if there's a response from the server
      if (error.response) {
        // The server responded with a status code outside the 2xx range
        console.error("Server responded with:", error.response.status, error.response.data);
        alert(`Failed to create season: ${error.response.data?.message || error.response.statusText}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        alert("Failed to create season: No response from the server.");
      } else {
        // Something else happened in setting up the request
        console.error("Error setting up the request:", error.message);
        alert(`Failed to create season: ${error.message}`);
      }
    }
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
                    name="startDate"
                    value={formValues.startDate}
                    onChange={handleInputChange}
                    style={{ backgroundColor: '#212227' }}
                    InputLabelProps={{
                      shrink: true,
                      style: { color: '#ffffff' },
                    }}
                    InputProps={{
                      style: { color: '#ffffff' },
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
                    name="endDate"
                    value={formValues.endDate}
                    onChange={handleInputChange}
                    style={{ backgroundColor: '#212227' }}
                    InputLabelProps={{
                      shrink: true,
                      style: { color: '#ffffff' },
                    }}
                    InputProps={{
                      style: { color: '#ffffff' },
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
                      name="league"
                      value={formValues.league}
                      onChange={handleInputChange}
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
                      <MenuItem value="MLB">MLB</MenuItem>
                      <MenuItem value="NBA">NBA</MenuItem>
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
                      name="season"
                      value={formValues.season}
                      onChange={handleInputChange}
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
              <Box sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Create Season
                </Button>
              </Box>
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
