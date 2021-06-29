import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { oneMiReducer } from "./oneMiSlice";
import { staffReducer } from "./staffSlice";
import { oneStaffReducer } from "./oneStaffSlice";

const comReducer = combineReducers({
  oneMi: oneMiReducer,
  staff: staffReducer,
  oneStaff: oneStaffReducer,
});

const store = configureStore({
  reducer: comReducer,
});

export type RootState = ReturnType<typeof comReducer>;

export default store;
