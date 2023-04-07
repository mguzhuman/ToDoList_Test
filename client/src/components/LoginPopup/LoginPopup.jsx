import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText';
import classes from './LoginPopup.module.css';
import {useDispatch, useSelector} from "react-redux";
import { sendAuth} from "../../store/reducers/ActionCreators";
import {checkEmptyValue} from "../../utils";
import {todoSlice} from "../../store/reducers/todoSlice";

const LoginPopup = ({open, handleClose}) => {
    const dispatch = useDispatch();
    const {updateErrorAuth} = todoSlice.actions;
    const {errorAuth, isAdmin} = useSelector(state => state.todoReducer);
    const [login, setLogin] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [password, setPassword] = useState('');
    const [isPassword, setIsPassword] = useState(true);

    useEffect(()=>{
        if(!errorAuth && isAdmin){
            handleClose();
            dispatch(updateErrorAuth());
        }
    },[errorAuth,isAdmin]);
    const handleChangeLogin = (event) => {
        setIsLogin(true);
        setLogin(event.target.value);
        dispatch(updateErrorAuth());
    };

    const handleChangePassword = (event) => {
        setIsPassword(true);
        setPassword(event.target.value);
        dispatch(updateErrorAuth());
    };
    const handleSuccess = () => {
        const isValid = checkValidFields();
        if (isValid) {
            dispatch(sendAuth({login, password}));
            setLogin('');
            setPassword('');
        }
    };

    const checkValidFields = () => {
        let isValid = true;
        if (!checkEmptyValue(login)) {
            isValid = false;
            setIsLogin(false);
        }
        if (!checkEmptyValue(password)) {
            isValid = false;
            setIsPassword(false);
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
                <DialogTitle>Авторизироваться</DialogTitle>
                <DialogContent>
                    <FormControl className={classes.container}>
                        <TextField
                            className={classes.field}
                            value={login}
                            error={!isLogin}
                            margin="dense"
                            variant='outlined'
                            type="login"
                            label='Логин'
                            helperText={!isLogin ? 'Введите логин' : ''}
                            onChange={handleChangeLogin}
                        />
                        <TextField
                            className={classes.field}
                            value={password}
                            error={!isPassword}
                            margin="dense"
                            type="password"
                            variant='outlined'
                            label='Пароль'
                            helperText={!isPassword ? 'Введите пароль' : ''}
                            onChange={handleChangePassword}
                        />
                        {
                            errorAuth &&
                            <FormHelperText error> Неправильно ввведен логин/пароль </FormHelperText>
                        }
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Отмена</Button>
                    <Button onClick={handleSuccess}>Войти</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default LoginPopup;