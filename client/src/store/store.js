import {combineReducers, configureStore} from "@reduxjs/toolkit";
import todoReducer from './reducers/todoSlice'

const rootReducer = combineReducers(
    {
        todoReducer,
    }
)

export const setupStore = () => {
    return configureStore({
        reducer:rootReducer,
    })
}