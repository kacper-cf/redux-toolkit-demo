import { AnyAction, createSlice, ThunkAction } from "@reduxjs/toolkit";


const initialState = {
    value: 0
}
export interface CounterState {
    value: number
}

export type defaultCounterThunk = ThunkAction<void, CounterState, unknown, AnyAction>

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: state => {
            state.value += 1
        },
        decrement: state => {
            state.value -= 1
        },
        incrementByValue: (state, action: { payload: number }) => {
            state.value += action.payload
        },
        decrementByValue: (state, action: { payload: number }) => {
            state.value -= action.payload
        }
    }
})

export const { incrementByValue, increment, decrementByValue, decrement } = counterSlice.actions
export default counterSlice.reducer;



