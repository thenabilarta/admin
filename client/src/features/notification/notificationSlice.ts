import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { notificationTimeout } from "./notificationTimeout";

export interface NotificationState {
  open: boolean;
  message: string;
}

const initialState: NotificationState = {
  open: false,
  message: "",
};

export const notiTimeout = createAsyncThunk("counter/fetchCount", async () => {
  const response = await notificationTimeout();
  // The value we return becomes the `fulfilled` action payload
  return response;
});

export const notifcationSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    openNotification: (state, action: PayloadAction<string>) => {
      state.open = true;
      state.message = action.payload || "Action successfull";
    },
    closeNotification: (state) => {
      state.open = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(notiTimeout.pending, (state) => {
        state.open = true;
      })
      .addCase(notiTimeout.fulfilled, (state) => {
        state.open = false;
      })
      .addCase(notiTimeout.rejected, (state) => {
        state.open = false;
      });
  },
});

export const { openNotification, closeNotification } = notifcationSlice.actions;

export const getNotificationStatus = (state: RootState) => state.notification;

export default notifcationSlice.reducer;
