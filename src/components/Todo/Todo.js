import React, {useState} from 'react';
import TodoActions from '../TodoActions/TodoActions';
import TodoHeader from '../TodoHeader/TodoHeader';
import TodoRender from '../TodoRender/TodoRender';
import uuid from 'react-uuid';
import './Todo.css';
const initialFormData = {
  isEdit: false,
  todoName: '',
  todoNote: '',
  isFinished: '',
  id: '',
  index: null
};
const Todo = () => {
  const [tab, setTab] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDisplayTodo, setisOpenDisplayTodo] = useState(false);
  const [todos, setTodos] = useState([]);
  const [formData, SetFormData] = useState(initialFormData);
  
  const resetAll = () => {
    setIsOpen(false);
    setisOpenDisplayTodo(false);
    SetFormData(initialFormData);
  };

  const handleOpenDialog = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleChangeTab = (tabValue) => {
    setTab(tabValue);
  };

  const handleSetFieldValue = (fieldName, value) => {
    SetFormData((prevState) => ({...prevState, [fieldName]: value}));
  };

  const handleSetTodoOnSubmit = (e) => {
    e.preventDefault();
    
    if (formData.isEdit) {
      const editedTodos = todos;
      editedTodos.splice(formData.index, 1, { ...formData, isEdit: false, index: null });
      setTodos(editedTodos);
    } else {
      setTodos((prevState) => [...prevState, {...formData, id: uuid()}]);
    }
    resetAll();
  };

  const handleMarkTodo = (isChecked, index) => {
    const updatedTodos = todos.slice();
    updatedTodos.splice(index, 1, {...todos[index], isFinished: isChecked});
    setTodos(updatedTodos);
  };

  const handleOpenTodo = (todo) => {
    setisOpenDisplayTodo(true);
    SetFormData(todo);
  };

  const handleEditTodo = () => {
    SetFormData((prevState) => ({...prevState, isEdit: true}));
    setisOpenDisplayTodo(false);
    handleOpenDialog();
  };

  const handleRemoveTodo = () => {
    setTodos(todos.filter((item) => item.id !== formData.id));
    resetAll();
  };

  return (
    <div className='todo-wrapper'>
      <TodoHeader 
        handleOpenDialog = {handleOpenDialog}
        isOpen = {isOpen}
        handleSetFieldValue = {handleSetFieldValue}
        formData = {formData}
        handleSetTodoOnSubmit = {handleSetTodoOnSubmit}
        handleEditTodo = {handleEditTodo}
        handleRemoveTodo = {handleRemoveTodo}
        isOpenDisplayTodo = {isOpenDisplayTodo}
        handleCloseButton = {resetAll}
      />

      <TodoActions handleChangeTab = {handleChangeTab} tab = {tab}/>

      <TodoRender 
      todos = {todos}
      handleMarkTodo = {handleMarkTodo}
      handleOpenTodo = {handleOpenTodo}
      />
    </div>
  )
}
export default Todo;
