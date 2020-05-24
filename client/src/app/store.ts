import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import conditionsSliceReducer from '../features/conditions/conditions-slice';

export const store = configureStore({
    reducer: {
        conditionsSlice: conditionsSliceReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export type AppDispatch = typeof store.dispatch;
