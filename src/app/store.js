import { configureStore, createSelectorCreator } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import themeReducer from '../features/theme/themeSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        theme: themeReducer,
    },
});
