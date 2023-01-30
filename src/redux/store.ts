import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './reducers/auth/auth.slice';
import pageReducer from './reducers/page/page.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    page: pageReducer,
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
