import React, {useEffect} from 'react';
import TodoItem from "../TodoItem/TodoItem";
import {useDispatch, useSelector} from "react-redux";
import {getTodoList} from "../../store/reducers/ActionCreators";
import classes from './ItemList.module.css';
import MyPagination from "../MyPagination/MyPagination";

const ItemList = () => {
    const dispatch = useDispatch();
    const {todoItems} = useSelector(state => state.todoReducer);

    useEffect(() => {
        dispatch(getTodoList());
    }, []);

    return (
        <div className={classes.item_list}>
            {
                todoItems && todoItems.map((item) => <TodoItem key={item.id} item={item}/>)
            }
            <MyPagination/>
        </div>
    );
};

export default ItemList;