import { createSlice } from '@reduxjs/toolkit';

export const dateSlice = createSlice({
  name: 'date',
  initialState: {
    selectedDates: [],
  },
  reducers: {
    setSelectedDates: (state, action) => {
      state.selectedDates = action.payload;
    },
  },
});

export const { setSelectedDates } = dateSlice.actions;
export default dateSlice.reducer;
