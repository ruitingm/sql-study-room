import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Profile/userSlice";
import problemReducer from "../Problem/problemSlice";
const store = configureStore({
  reducer: { userReducer, problemReducer },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
