import React, {useEffect} from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Checkbox from '@mui/material/Checkbox';
import './TodoRender.css';

const Todo = ({
    todo,
    handleMarkTodo,
    index,
    handleOpenTodo
}) => {
    const isFinishedTodo = todo.isFinished && 'todo-finished';
    return(
        <div className='todo-container'>
            <span>
                <Checkbox 
                    icon={<RadioButtonUncheckedIcon />} 
                    checkedIcon={<CheckCircleOutlineIcon color = 'primary'/>} 
                    onClick = {(e) => handleMarkTodo(e.target.checked, index)}
                    checked = {todo.isFinished}
                />
            </span>

            <div className='todo-item' onClick={() => handleOpenTodo({...todo, index})}>
                <span className={isFinishedTodo}>{todo.todoName || todo.todoNote}</span>
                <ArrowForwardIosIcon fontSize='small'/>
            </div>
        </div>
    )
};
const TodoRender = ({
    todos,
    handleMarkTodo,
    handleOpenTodo
}) => {
    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(todos), [todos])
    })
    return (
        <div className='todos-renderer-wrapper'>
            {todos.map((todo, index) => (
                <Todo
                    key = {todo.id}
                    todo = {todo}
                    handleMarkTodo = {handleMarkTodo}
                    index = {index}
                    handleOpenTodo = {handleOpenTodo}
                />
            ))}
        </div>
    )
}
export default TodoRender;