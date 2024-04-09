import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./alertSlice";
import searchBarReducer from "./searchBarSlice";
const store = configureStore({
  reducer: {
    alert: alertReducer,
    searchBar: searchBarReducer,
  },
});

export default store;
