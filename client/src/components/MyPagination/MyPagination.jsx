import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {useDispatch, useSelector} from "react-redux";
import {getTodoList} from "../../store/reducers/ActionCreators";
import {todoSlice} from "../../store/reducers/todoSlice";


const MyPagination = () => {
    const dispatch = useDispatch();
    const {updateCurrentPage} = todoSlice.actions;
    const {totalPages, currentPage} = useSelector(state => state.todoReducer);
    const handleChange = (event, value) =>{
        console.log(value);
        dispatch(updateCurrentPage(value-1));
        dispatch(getTodoList());
    }
    return (
        <div>
            <Stack spacing={2}>
                <Pagination
                    size="large"
                    count={totalPages}
                    page={currentPage+1}
                    boundaryCount={2}
                    onChange={handleChange}
                />
            </Stack>
        </div>
    );
};

export default MyPagination;