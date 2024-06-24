import { createSlice } from '@reduxjs/toolkit';

export const languageSlice = createSlice({
  name: 'language',
  initialState: {
    selectedLanguage: 'en',
  },
  reducers: {
    setSelectedLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
    },
  },
});

export const { setSelectedLanguage } = languageSlice.actions;

export default languageSlice.reducer;
