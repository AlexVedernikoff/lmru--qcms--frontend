import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IState {
    filters: {};
}

const initialState: IState = {
    filters: {
        page: 1,
        size: 10,
    },
};

export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setFilters(state, action: PayloadAction<IState['filters']>) {
            state.filters = action.payload;
        },
        clearFilters(state) {
            state.filters = initialState.filters;
        },
    },
});
