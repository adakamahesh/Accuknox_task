import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dashboardSlice } from "./redux_store/slices/dashboardSlice";


export const { addWidget, removeWidget } = dashboardSlice.actions;

export const store = configureStore({
  reducer: { dashboard: dashboardSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;