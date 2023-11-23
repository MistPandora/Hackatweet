import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: [],
};

export const tweetSlice = createSlice({
    name: 'tweets',
    initialState,
    reducers: {
        addTweetToStore: (state, action) => {
            state.value.push(action.payload)
        },
        removeTweetToStore: (state, action) => {
            state.value = []

        }
    },
});

export const { addTweetToStore, removeTweetToStore } = tweetSlice.actions;
export default tweetSlice.reducer;
