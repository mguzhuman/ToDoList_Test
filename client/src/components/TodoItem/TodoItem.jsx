import React, {useState} from 'react';
import classes from './TodoItem.module.css'
import Paper from "@mui/material/Paper";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton'
import TodoItemPopup from "../TodoItemPopup/TodoItemPopup";
import {useSelector} from "react-redux";

const TodoItem = ({item}) => {
    const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
    const {isAdmin} = useSelector(state => state.todoReducer);
    const handleOpenUpdatePopup = () => {
        setOpenUpdatePopup(true);
    }
    const handleCloseUpdatePopup = () => {
        setOpenUpdatePopup(false);
    }
    return (
        <Paper className={classes.block} elevation={6}>
            <div className={classes.header}>
                <div className={classes.about}>
                    <p className={classes.text_field}>Имя: {item.name}</p>
                    <p className={classes.text_field}>Email: {item.email}</p>
                </div>
                <div className={classes.buttons}>
                    {isAdmin &&
                        <IconButton color='success' aria-label="edit" size="large" onClick={handleOpenUpdatePopup}>
                            <EditIcon fontSize="inherit"/>
                        </IconButton>
                    }
                    <TodoItemPopup
                        open={openUpdatePopup}
                        handleClose={handleCloseUpdatePopup}
                        isChange={true}
                        title='Обновить задачу'
                        data={item}
                    />
                </div>
            </div>
            <div className={classes.text}>
                <p className={classes.text_field}>Текст задачи:</p>
                {item.text}
            </div>

            <div className={classes.status}>
                Статус: {item.ischanged ? 'отредактировано администратором ' : ''}{item.isready ? ' выполнено' : ''}
            </div>
        </Paper>
    );
};

export default TodoItem;