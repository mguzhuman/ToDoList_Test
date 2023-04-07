import {createSlice} from "@reduxjs/toolkit";
import {createTodoItem, getTodoList, sendAuth, updateTodoItem} from "./ActionCreators";
import {setCookie} from "../../utils";

const initialState = {
    currentPage: 0,
    totalPages: 0,
    sortType: 'name',
    sortDirection: 'ASC',
    todoItems: [],
    isLoading: false,
    error: '',
    textAlert:'',
    isAdmin:false,
    errorAuth: false,
    needAuth: false
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        updateCurrentPage(state, action) {
            state.currentPage = action.payload
        },
        updateSortType(state, action) {
            state.sortType = action.payload
        },
        updateSortDirection(state, action) {
            state.sortDirection = action.payload
        },
        setTextAlert(state, action) {
            state.textAlert = action.payload
        },
        updateAuth(state, action){
            state.isAdmin = action.payload;
        },
        updateErrorAuth(state, action){
            state.errorAuth = false
        },
        updateNeedAuth(state, action){
            state.needAuth = action.payload
        }
    },
    extraReducers: {
        [getTodoList.fulfilled.type]: (state, action) => {
            const payload = action.payload
            state.isLoading = false;
            state.error = ''
            state.todoItems = payload.rows
            state.currentPage = payload.currentPage
            state.totalPages = payload.totalPages
        },
        [getTodoList.pending.type]: (state, action) => {
            state.isLoading = true;
        },
        [getTodoList.rejected.type]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        },
        [updateTodoItem.fulfilled.type]: (state, action) => {
            const payload = action.payload
            state.isLoading = false;
            state.error = ''
            state.textAlert = 'Задача успешно обновлена'
            state.todoItems = payload.rows
            state.currentPage = payload.currentPage
            state.totalPages = payload.totalPages
        },
        [updateTodoItem.pending.type]: (state, action) => {
            state.isLoading = true;
        },
        [updateTodoItem.rejected.type]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        },
        [createTodoItem.fulfilled.type]: (state, action) => {
            const payload = action.payload
            state.isLoading = false;
            state.error = ''
            state.textAlert = 'Задача успешно создана'
            state.todoItems = payload.rows
            state.currentPage = payload.currentPage
            state.totalPages = payload.totalPages
        },
        [createTodoItem.pending.type]: (state, action) => {
            state.isLoading = true;
        },
        [createTodoItem.rejected.type]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [sendAuth.fulfilled.type]: (state, action) => {
            state.isAdmin = true;
            setCookie('isAdmin','true');
        },
        [sendAuth.pending.type]: (state, action) => {
            state.isLoading = true;

        },
        [sendAuth.rejected.type]: (state, action) => {
            state.isAdmin = false;
            state.errorAuth = true
            setCookie('isAdmin','false');
        }
    }
})

export default todoSlice.reducer;