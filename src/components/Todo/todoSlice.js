import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  isEditItems: "",
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addItem: (state, action) => {
      let arr = [...state.items];
      arr.push(action.payload);
      state.items = arr;
    },
    deleteItem: (state, action) => {
      const index = state.items.findIndex((val) => val.id === action.payload);
      let arr = [...state.items];
      arr.splice(index, 1);
      state.items = arr;
    },
    editItem: (state, action) => {
      let arr = [...state.items];
      arr.splice(action.payload.id, 1, action.payload.data);
      state.items = arr;
    },
  },
});

export const { addItem, deleteItem, editItem } = todoSlice.actions;

export default todoSlice.reducer;
