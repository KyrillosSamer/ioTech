// src/redux/languageSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "EN",
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    toggleLanguage: (state) => {
      state.value = state.value === "EN" ? "AR" : "EN";
    },
    setLanguage: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { toggleLanguage, setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
