import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: { token: null, username: null },
};

export const likedTweetSlice = createSlice({
    name: 'likedTweets',
    initialState,
    reducers: {
        addLikedTweetToStore: (state, action) => {

        }
    },
});

export const { addLikedTweetToStore } = likedTweetSlice.actions;
export default likedTweetSlice.reducer;
