import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Checkbox from '@mui/material/Checkbox';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import classes from './TodoItemPopup.module.css'
import {useDispatch, useSelector} from "react-redux";
import {createTodoItem, updateTodoItem} from "../../store/reducers/ActionCreators";
import {checkEmail, checkEmptyValue, getCookie} from "../../utils";
import FormHelperText from "@mui/material/FormHelperText";
import {todoSlice} from "../../store/reducers/todoSlice";

const TodoItemPopup = ({open, handleClose, isChange = false, title, data}) => {
    const dispatch = useDispatch();
    const {updateNeedAuth, updateAuth} = todoSlice.actions;
    const {needAuth} = useSelector(state => state.todoReducer);
    const [name, setName] = useState(data?.name || '');
    const [isName, setIsName] = useState(true);
    const [email, setEmail] = useState(data?.email || '');
    const [isEmail, setIsEmail] = useState(true);
    const [text, setText] = useState(data?.text || '');
    const [isText, setIsText] = useState(true);
    const [checked, setChecked] = useState(data?.isready || false);

    const handleChangeName = (event) => {
        setIsName(true);
        setName(event.target.value);
    }

    const handleChangeEmail = (event) => {
        setIsEmail(true);
        setEmail(event.target.value);

    }
    const handleChangeText = (event) => {
        setIsText(true);
        setText(event.target.value);
    }
    const handleChangeCheckbox = (event) => {
        setChecked(event.target.checked);
    };

    const handleSuccess = () => {
        const isValid = checkValidFields();
        if (isValid) {
            if (isChange) {
                const isAdminCookie = getCookie('isAdmin');
                if (isAdminCookie !== 'true'){
                    dispatch(updateNeedAuth(true));
                    dispatch(updateAuth(false));
                    return;
                }
                dispatch(updateTodoItem({
                    id: data.id,
                    text,
                    isready: checked,
                    ischanged: text != data.text
                }));
            } else {
                dispatch(createTodoItem({
                    name,
                    email,
                    text
                }))
                setName('')
                setEmail('')
                setText('');
            }
            handleClose();
        }
    }

    const checkValidFields = () => {
        let isValid = true;
        if (!checkEmail(email)) {
            isValid = false;
            setIsEmail(false);
        }
        if (!checkEmptyValue(name)) {
            isValid = false;
            setIsName(false);
        }
        if (!checkEmptyValue(text)) {
            isValid = false;
            setIsText(false);
        }
        return isValid;
    }


    return (
        <div>
            <Dialog
                fullWidth
                maxWidth='md'
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <FormControl className={classes.container}>
                        <TextField
                            className={classes.about_field}
                            value={name}
                            error={!isName}
                            variant='outlined'
                            margin="dense"
                            disabled={isChange}
                            label='Имя'
                            helperText={!isText ? 'Введите имя' : ''}
                            onChange={handleChangeName}
                        />
                        <TextField
                            className={classes.about_field}
                            value={email}
                            error={!isEmail}
                            margin="dense"
                            variant='outlined'
                            disabled={isChange}
                            label='Email'
                            helperText={!isEmail ? 'Введите корректный email' : ''}
                            onChange={handleChangeEmail}
                        />
                        <TextField
                            className={classes.text_field}
                            value={text}
                            fullWidth
                            margin="dense"
                            error={!isText}
                            variant='outlined'
                            label='Текст'
                            helperText={!isText ? 'Введите текст' : ''}
                            multiline
                            maxRows={6}
                            onChange={handleChangeText}
                        />
                        {
                            isChange &&
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={handleChangeCheckbox}
                                    />
                                }
                                label="Выполнено"
                            />

                        }
                        {
                            needAuth &&
                            <FormHelperText error> Вам необходимо авторизоваться </FormHelperText>
                        }
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Отмена</Button>
                    <Button onClick={handleSuccess}>Готово</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default TodoItemPopup;