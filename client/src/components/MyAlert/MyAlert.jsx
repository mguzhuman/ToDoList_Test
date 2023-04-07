import React from 'react';
import Alert from "@mui/material/Alert";
import Fade from "@mui/material/Fade";
import {useDispatch, useSelector} from "react-redux";
import {todoSlice} from "../../store/reducers/todoSlice";
import classes from './MyAlert.module.css';

const MyAlert = () => {
    const dispatch = useDispatch();
    const {setTextAlert} = todoSlice.actions;
    const {textAlert} = useSelector(state => state.todoReducer);

    return (
        <Fade
            in={!!textAlert}
            timeout={{enter: 500, exit: 50}}
            addEndListener={() => {
                setTimeout(() => {
                    dispatch(setTextAlert(''))
                }, 4000);
            }}
        >
            <Alert classes={{root:classes.alert}} severity="success" variant="standard" className="alert">
                {textAlert}
            </Alert>
        </Fade>
    )
};

export default MyAlert;