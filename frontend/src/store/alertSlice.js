// alertReducer.js
import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: {
    showToast: false,
    message: "",
    type: "",
  },
  reducers: {
    showToast: (state, action) => {
      state.showToast = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    hideAlert: (state, action) => {
      state.showToast = false;
      state.message = "";
      state.type = "";
    },
  },
});

export const { showToast, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
