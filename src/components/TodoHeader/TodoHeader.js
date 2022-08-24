import React from 'react';
import moment from 'moment';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './TodoHeader.css';
import DialogModal from '../Dialog/DialogModal';
import DisplayTodo from '../DisplayTodo/DisplayTodo';

const styles = {
    finshed: {
        fontSize: "46px",
        color: "#fff"
    },
    total: {
        display: "flex",
        flexDirection: "column",
        color: "#fff",
    },
    weekDay: {
        color: "#fff",
        fontSize: "28px"
    },
    date: {
        color: "#fff",
        fontSize: "28px",
        marginLeft: 10
    }
    
};
const TodoHeader = ({
    handleOpenDialog,
    isOpen,
    handleSetFieldValue,
    formData,
    handleSetTodoOnSubmit,
    isOpenDisplayTodo,
    handleCloseButton,
    handleEditTodo,
    handleRemoveTodo
}) => {
    const weekDay = moment().format('dddd');
    const date = moment().date();

    return (
        <div className='todo-header'>
            <div className='todo-date'>
                <div className='todos-count'>
                    <span style={styles.finshed}>2</span>

                    <div style={styles.total}>
                        <span>Tasks</span>
                        <span>/ 10</span>
                    </div>

                </div>

                <div>
                    <span style={styles.weekDay}>{weekDay}</span>
                    <span style={styles.date}>{date}</span>
                </div>
            </div>

            <div className='add-todo' onClick = {handleOpenDialog}>
                <AddCircleIcon color = "primary"/>
                <span className='icon-background'></span>
            </div>

            <DialogModal 
                isOpen = {isOpen}
                handleOpenDialog = {handleOpenDialog}
                handleSetFieldValue = {handleSetFieldValue}
                formData = {formData}
                handleSetTodoOnSubmit = {handleSetTodoOnSubmit}
            />

            <DisplayTodo
                formData={formData}
                isOpen={isOpenDisplayTodo}
                handleCloseButton={handleCloseButton}
                handleEditTodo={handleEditTodo}
                handleRemoveTodo={handleRemoveTodo}
            />
        </div>
    )
}
export default TodoHeader;