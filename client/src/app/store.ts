import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import notificationReducer from "../features/notification/notificationSlice";
import chatReducer from "../features/chat/chatSlice";
import categoryReducer from "../features/category/categorySlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer,
    chat: chatReducer,
    category: categoryReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
