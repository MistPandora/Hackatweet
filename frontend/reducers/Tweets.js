import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: { token: null, username: null },
};

export const tweetSlice = createSlice({
    name: 'tweets',
    initialState,
    reducers: {
        addTweetToStore: (state, action) => {

        }
    },
});

export const { addTweetToStore } = tweetSlice.actions;
export default tweetSlice.reducer;
