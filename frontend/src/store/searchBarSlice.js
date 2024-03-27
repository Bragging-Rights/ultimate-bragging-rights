// alertReducer.js
import { createSlice } from "@reduxjs/toolkit";
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "ALL MONTHS",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
const currentDate = new Date();
const day = daysOfWeek[currentDate.getDay()];

const searchBarSlice = createSlice({
  name: "searchBar",
  initialState: {
    week: "WEEK",
    day: day,
    date: currentDate.getDate(),
    month: months[currentDate.getMonth() + 1],
    year: currentDate.getFullYear(),
    season: "current season",
    team: "All Teams",
    division: "All Divisions",
    conference: "ALl conference",
  },
  reducers: {
    setSearchBar: (state, action) => {
      state[action.payload.fieldName] = action.payload.value;
    },
    resetSearchBar: (state, action) => {
      state[action.payload.fieldName] = action.payload.value;
    },
  },
});

export const { setSearchBar } = searchBarSlice.actions;
export default searchBarSlice.reducer;
