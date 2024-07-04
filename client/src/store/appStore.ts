import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import drawerReducer from "../features/drawer/drawerSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    drawer: drawerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
