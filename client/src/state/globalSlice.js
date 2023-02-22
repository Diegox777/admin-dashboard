import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: 'dark',
  userId: '63701cc1f03239c72c000180'
}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    toggleThemeMode: state => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    }
  }
});

export const { toggleThemeMode } = globalSlice.actions;
export default globalSlice.reducer;