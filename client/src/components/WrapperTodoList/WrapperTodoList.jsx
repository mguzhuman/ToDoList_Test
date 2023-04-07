import React from 'react';
import classes from './WrapperTodoList.module.css';
import SortElement from "../SortElement/SortElement";
import ItemList from "../ItemList/ItemList";

const WrapperTodoList = () => {
    return (
        <div className={classes.wrapper}>
            <SortElement/>
            <ItemList/>
        </div>
    );
};

export default WrapperTodoList;