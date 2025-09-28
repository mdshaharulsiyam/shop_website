import { configureStore } from "@reduxjs/toolkit";
import baseApis from './baseApi';


export const store = configureStore({
  reducer: {
    [baseApis.reducerPath]: baseApis.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      baseApis.middleware
    ),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
