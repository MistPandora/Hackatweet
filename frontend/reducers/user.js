import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: { token: null, username: null },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.value.token = action.payload.token;
            state.value.username = action.payload.username;
        },
        logoutUser: (state) => {
            state.value.token = null;
            state.value.username = null;
        },
    },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
