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
    editDataAction: (state, action) => {
      let edit = state.list.map((item) => {
        if (item.id == action.payload.id) {
          return action.payload;
        } else {
          return item;
        }
      });

      state.list = edit;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { currentTimeAction, editDataAction } = counterSlice.actions;

export default counterSlice.reducer;
