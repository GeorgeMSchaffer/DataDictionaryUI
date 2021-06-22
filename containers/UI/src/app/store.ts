import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import instanceReducer from '../features/instances/InstanceSlice';
export const store = configureStore({
  reducer: {
    instances: instanceReducer
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
