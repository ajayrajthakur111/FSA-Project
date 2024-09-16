import { createSlice, } from '@reduxjs/toolkit';


const initialState: AuthState = {
    token: null,
    isAuthenticated: false,
    username: ""
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.username = action.payload
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.username=""
        },
    },
});
export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;