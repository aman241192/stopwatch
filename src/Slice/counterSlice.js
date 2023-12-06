import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    currentTimeAction: (state, action) => {
      state.list.push(action.payload);
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { currentTimeAction } = counterSlice.actions;

export default counterSlice.reducer;
