import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    access: {
        isAuth: false,
        userInfo: undefined,
    },
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserAccess: (state, actions) => {
            state.access = { ...state.access, ...actions.payload };
        },
    },
});

export const { setUserAccess } = userSlice.actions;

export default userSlice.reducer;
