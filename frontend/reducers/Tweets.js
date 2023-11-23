import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: { token: null, username: null },
};

export const tweetSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addTweetToStore: (state, action) => {
            state.value.token = action.payload.token;
            state.value.username = action.payload.username;
        }
    },
});

export const { addTweetToStore } = tweetSlice.actions;
export default tweetSlice.reducer;
