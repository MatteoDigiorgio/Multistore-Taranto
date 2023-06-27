import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface GoogleDataState {
  value: object;
}

const initialState: GoogleDataState = {
  value: {},
};

export const googleSlice = createSlice({
  name: "google",
  initialState,
  reducers: {
    update: (state, action: PayloadAction<object>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { update } = googleSlice.actions;

export default googleSlice.reducer;
