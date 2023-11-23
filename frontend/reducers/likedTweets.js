import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: { token: null, username: null },
};

export const likedTweetSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addLikedTweetToStore: (state, action) => {
            state.value.token = action.payload.token;
            state.value.username = action.payload.username;
        }
    },
});

export const { addLikedTweetToStore } = likedTweetSlice.actions;
export default likedTweetSlice.reducer;
