import React from 'react';
import {Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import classes from './SortElement.module.css';
import {useDispatch, useSelector} from "react-redux";
import {todoSlice} from "../../store/reducers/todoSlice";
import {getTodoList} from "../../store/reducers/ActionCreators";

const SortElement = () => {
    const dispatch = useDispatch();
    const {updateSortType,updateSortDirection} = todoSlice.actions;
    const {sortType, sortDirection} = useSelector(state => state.todoReducer);
    const handleChangeSortType = (event) => {
        dispatch(updateSortType(event.target.value));
        dispatch(getTodoList());
    }
    const handleChangeSortDirection = (event) => {
        dispatch(updateSortDirection(event.target.value));
        dispatch(getTodoList());
    }
    return (
        <div>
            <FormControl>
                <InputLabel id='label-id-sort-Type'>Сортировка по:</InputLabel>
                <Select
                    autoWidth
                    labelId='label-id-sort-Type'
                    className={classes.select}
                    label='Сортировка по:'
                    value={sortType}
                    onChange={handleChangeSortType}
                >
                    <MenuItem value='name'>Имя</MenuItem>
                    <MenuItem value='email'>Email</MenuItem>
                    <MenuItem value='status'>Статус</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id='label-id-sort-Direction'>Направление сортировки:</InputLabel>
                <Select
                    autoWidth
                    labelId='label-id-sort-Direction'
                    className={classes.select}
                    label='Направление сортировки:'
                    value={sortDirection}
                    onChange={handleChangeSortDirection}
                >
                    <MenuItem value='ASC'>Возрастаниe</MenuItem>
                    <MenuItem value='DESC'>Убываниe</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};

export default SortElement;