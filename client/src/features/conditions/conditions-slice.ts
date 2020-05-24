import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Condition } from './condition';

export interface ConditionsState {
    conditions: Condition[];
    isLoading: boolean;
    error: string | null;
}

export const initialConditionsState: ConditionsState = {
    conditions: [],
    error: null,
    isLoading: false,
};

const conditionsSlice = createSlice({
    name: 'conditions',
    initialState: initialConditionsState,
    reducers: {
        fetchConditionsStart: (state: ConditionsState, action: PayloadAction<void>) => {
            state.isLoading = true;
            state.error = null;
            state.conditions = [];
        },
        fetchConditionsSuccess: (state: ConditionsState, action: PayloadAction<Condition[]>) => {
            state.isLoading = false;
            state.conditions = action.payload;
        },
        fetchConditionsFailure: (state: ConditionsState, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchConditionsStart, fetchConditionsSuccess, fetchConditionsFailure } = conditionsSlice.actions;

export default conditionsSlice.reducer;
