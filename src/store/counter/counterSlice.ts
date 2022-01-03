import { AnyAction, createSlice, ThunkAction } from "@reduxjs/toolkit";

export interface CounterState {
    value: number
}

export type defaultCounterThunk = ThunkAction<void, CounterState, unknown, AnyAction>

export const counterSlice = createSlice({
    name: "counter",
    initialState: {
        value: 0
    },
    reducers: {
        increment: state => {
            state.value += 1
        },
        decrement: state => {
            state.value -= 1
        },
        incrementByValue: (state, action) => {
            state.value += action.payload
        },
        decrementByValue: (state, action: { payload: { value: number } }) => {
            state.value -= action.payload.value
        }
    }
})

export const { incrementByValue, increment, decrementByValue, decrement } = counterSlice.actions

export const incrementAsync = (amount: number): defaultCounterThunk => dispatch => {
    setTimeout(() => {
        dispatch(incrementByValue(amount))
    })
}

export default counterSlice.reducer;

