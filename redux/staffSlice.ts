import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { staffDataType, staffType } from "../globalType";

const initialState: staffType = {
  error: false,
  loading: false,
  errorMessage: "",
  staff: [],
};

export const fetchStaff = createAsyncThunk<any, any>(
  "staff/fetchStaff",
  (oriId_m: string) => {
    return axios
      .post("/api/staff/read/miAffiliation", {
        oriId_m: oriId_m,
      })
      .then((result) => result.data)
      .catch((err) => err);
  }
);

export const searchStaff = createAsyncThunk<
  any,
  { searchCategory: string; search: string; oriId_m: string }
>("staff/searchStaff", (params) => {
  return axios
    .post("/api/staff/read/search", {
      searchCategory: params.searchCategory,
      search: params.search,
      oriId_m: params.oriId_m,
    })
    .then((result) => result.data)
    .catch((err) => err);
});

const staffSlice = createSlice({
  name: "staff",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStaff.pending, (state) => {
      Object.assign(state, { loading: true });
    });
    builder.addCase(
      fetchStaff.fulfilled,
      (state, action: PayloadAction<staffDataType[]>) => {
        Object.assign(state, { loading: false, staff: action.payload });
      }
    );
    builder.addCase(fetchStaff.rejected, (state, action) => {
      Object.assign(state, {
        loading: false,
        error: true,
        errorMessage: action.payload,
      });
    });

    builder.addCase(searchStaff.pending, (state) => {
      Object.assign(state, { loading: true });
    });
    builder.addCase(
      searchStaff.fulfilled,
      (state, action: PayloadAction<staffDataType[]>) => {
        Object.assign(state, { loading: false, staff: action.payload });
      }
    );
    builder.addCase(searchStaff.rejected, (state, action) => {
      Object.assign(state, {
        loading: false,
        error: true,
        errorMessage: action.payload,
      });
    });
  },
});

export const {} = staffSlice.actions;

export const staffReducer = staffSlice.reducer;
