import { createSlice } from "@reduxjs/toolkit";

export interface CounterSlice {
    data: number;
    title: string;
}

const initialState: CounterSlice = {
    data: 42,
    title: 'YARC (yet another redux counter with redux toolkit)'
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        incrementCounter: (state, action) => {
            state.data += action.payload
        },
        decrementCounter: (state, action) => {
            state.data -= action.payload
        },
    }
})

export const {incrementCounter, decrementCounter} = counterSlice.actions;