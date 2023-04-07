import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import classes from './App.module.css';
import WrapperTodoList from "./components/WrapperTodoList/WrapperTodoList";
import TodoItemPopup from "./components/TodoItemPopup/TodoItemPopup";
import MyAlert from "./components/MyAlert/MyAlert";
import {getCookie, setCookie} from "./utils";
import {useDispatch, useSelector} from "react-redux";
import {todoSlice} from "./store/reducers/todoSlice";
import LoginPopup from "./components/LoginPopup/LoginPopup";


const App = () => {
    const dispatch = useDispatch();
    const {updateAuth} = todoSlice.actions;
    const {isAdmin} = useSelector(state => state.todoReducer);
    const [openCreatePopup, setOpenCreatePopup] = useState(false);
    const [loginPopup, setLoginPopup] = useState(false);

    useEffect(()=>{
        const isAdmin = getCookie('isAdmin');
        if (isAdmin === 'true'){
           dispatch(updateAuth(true));
        }
    },[])

    useEffect(()=>{
        setOpenCreatePopup(false);
    },[isAdmin])
    const handleOpenCreatePopup = () => {
        setOpenCreatePopup(true);
    }
    const handleCloseCreatePopup = () => {
        setOpenCreatePopup(false);
    }
    const handleOpenLoginPopup = () => {
        setLoginPopup(true);
    }
    const handleCloseLoginPopup = () => {
        setLoginPopup(false);
    }
    const handleExit= () => {
        setLoginPopup(false);
        setCookie('isAdmin','false');
        dispatch(updateAuth());
    }

    return (
        <div className={classes.App}>
            <div className={classes.Header}>
                <Button variant="contained" onClick={handleOpenCreatePopup} >Создать задачу</Button>
                {isAdmin ?
                    <Button variant="outlined" onClick={handleExit}>Выйти</Button>
                    :
                    <Button variant="contained" onClick={handleOpenLoginPopup}>Войти</Button>
                }
            </div>
            <WrapperTodoList/>
            <TodoItemPopup
                open={openCreatePopup}
                handleClose={handleCloseCreatePopup}
                title='Создать задачу'
            />
            {
                !isAdmin &&
                <LoginPopup
                    open={loginPopup}
                    handleClose={handleCloseLoginPopup}
                />
            }
            <MyAlert/>
        </div>
    );
}

export default App;
