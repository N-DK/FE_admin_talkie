import { createSlice } from '@reduxjs/toolkit';
import storage from '../../utils/storage';

const initState = {
    theme: 'light',
};

const themeSlice = createSlice({
    name: 'theme',
    initialState: initState,
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload;
            storage.setItem('theme', action.payload);
        },
    },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
