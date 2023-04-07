import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const getTodoList = createAsyncThunk(
    'todo/fetch',
    async (_, thunkAPI) => {
        try {
            const {sortType, sortDirection, currentPage} = thunkAPI.getState().todoReducer;
            const response = await axios.get('http://localhost:4000/api/todo/', {
                params: {
                    type: sortType,
                    direction: sortDirection,
                    page: currentPage
                }
            });
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
)
export const updateTodoItem = createAsyncThunk(
    'todo/update',
    async (_, thunkAPI) => {
        try {
            const {sortType, sortDirection, currentPage} = thunkAPI.getState().todoReducer;
            const response = await axios.put(`http://${window.location.hostname}:4000/api/todo/${_.id}`,
                {
                    id: _.id,
                    text: _.text,
                    isready: _.isready,
                    ischanged: _.ischanged
                },
                {
                    params: {
                        type: sortType,
                        direction: sortDirection,
                        page: currentPage
                    },
                });
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const createTodoItem = createAsyncThunk(
    'todo/create',
    async (_, thunkAPI) => {
        try {
            const {sortType, sortDirection, currentPage} = thunkAPI.getState().todoReducer;
            const response = await axios.post(`http://${window.location.hostname}:4000/api/todo/`,
                {
                    name: _.name,
                    email: _.email,
                    text: _.text
                },
                {
                    params: {
                        type: sortType,
                        direction: sortDirection,
                        page: currentPage
                    },
                });
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
)

export const sendAuth = createAsyncThunk(
    'auth/send',
    async (_, thunkAPI) => {
        try {
            const response = await axios.post(`http://${window.location.hostname}:4000/api/login/`,
                {
                    login: _.login,
                    password: _.password,
                },
                {
                });
            if (!response.status === 200){
                throw new Error('error');
            }
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue('Неверное значение логин/пароль');
        }
    }
)