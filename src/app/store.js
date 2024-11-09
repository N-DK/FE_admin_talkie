import { configureStore, createSelectorCreator } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import themeReducer from '../features/theme/themeSlice';
import systemReducer from '../features/system/systemSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        theme: themeReducer,
        system: systemReducer,
    },
});
