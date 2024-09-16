import { configureStore } from '@reduxjs/toolkit'
import blogSlice from '../slices/blogSlice';
import authSlice from '../slices/authSlice';
import toastSlice from '../slices/toastSlice';


export const store = configureStore({
    reducer: {
        blog: blogSlice,
        auth: authSlice,
        toastInfo:toastSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;