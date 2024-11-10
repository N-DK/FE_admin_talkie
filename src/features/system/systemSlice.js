import { createSlice } from '@reduxjs/toolkit';

const initState = {
    system: {},
};

const systemSlice = createSlice({
    name: 'system',
    initialState: initState,
    reducers: {
        setSystem: (state, action) => {
            state.system = { ...state.system, ...action.payload };
        },
    },
});

export const { setSystem } = systemSlice.actions;

export default systemSlice.reducer;
