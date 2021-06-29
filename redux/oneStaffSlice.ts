import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { oneStaffDataType, oneStaffType } from "../globalType";

const initialState: oneStaffType = {
  loading: false,
  error: false,
  errorMessage: "",
  message: {
    content: "",
    update: 0,
  },
  miAffiliation: [],
  navListSave: [],
  oriId_s: "",
  lastLogin: 0,
  isLogin: false,
  staffName: {
    name: "",
    hira: "",
  },
  workSpace: {
    mi: "",
    space: "",
  },
};

const oneStaffSlice = createSlice({
  name: "oneMi",
  initialState: initialState,
  reducers: {
    setStaff(state, action: PayloadAction<oneStaffDataType>) {
      const staffData = {
        loading: false,
        error: false,
        errorMessage: "",
        ...action.payload,
      };

      Object.assign(state, staffData);
    },
    cleanStaff(state) {
      Object.assign(state, initialState);
    },
  },

  extraReducers: (builder) => {},
});

export const { setStaff, cleanStaff } = oneStaffSlice.actions;

export const oneStaffReducer = oneStaffSlice.reducer;
