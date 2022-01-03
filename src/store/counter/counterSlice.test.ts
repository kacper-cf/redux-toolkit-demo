import { configureStore } from "@reduxjs/toolkit";
import { AppDispatch, rootStore } from "../store"
import counterSlice, { CounterState, decrement, decrementByValue, increment, incrementByValue } from "./counterSlice"

describe('store - counter - counterSlice', () => {
    let getCounter: () => CounterState;
    let dispatch: AppDispatch

    beforeEach(() => {
        const fakeStore = configureStore({ reducer: counterSlice })
        getCounter = fakeStore.getState
        dispatch = fakeStore.dispatch
    })

    it('should have a value equal to 0 initially', () => {

        expect(getCounter()).toEqual({ value: 0 })

    });

    it('should increment a value by 1', () => {
        dispatch(increment())

        expect(getCounter()).toEqual({ value: 1 })
    })

    it('should decrement a value by 1', () => {
        dispatch(decrement())

        expect(getCounter()).toEqual({ value: -1 })
    })

    it('should increment a value by given number', () => {
        dispatch(incrementByValue(5))

        expect(getCounter()).toEqual({ value: 5 })
    })

    it('should decrement a value by given number', () => {
        dispatch(decrementByValue(5))

        expect(getCounter()).toEqual({ value: -5 })
    })
})