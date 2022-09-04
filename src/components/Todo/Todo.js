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

const getIsFinishedTodosCount = (todos) => todos.reduce((acc, curr) => {
  acc.total = todos.length;

  if (curr.isFinished) {
    acc.finished = acc.finished + 1;
  }
  return acc;
}, {total: 0, finished: 0});
const setFilterTab = (tab, todos) => {
  if (tab === 0) {
    return todos;
  } else if (tab === 1) {
    return todos.filter((todo) => !todo.isFinished);
  } else if (tab === 2) {
    return todos.filter((todo) => todo.isFinished);
  }
};

const Todo = () => {
  const [tab, setTab] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDisplayTodo, setisOpenDisplayTodo] = useState(false);
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('items')) || []
  );
  const [formData, SetFormData] = useState(initialFormData);

  const totalCount = getIsFinishedTodosCount(todos);

  const sortedTodos = setFilterTab(tab, todos);
  
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
        totalCount = {totalCount}
      />

      <TodoActions handleChangeTab = {handleChangeTab} tab = {tab}/>

      <TodoRender 
      todos = {sortedTodos}
      handleMarkTodo = {handleMarkTodo}
      handleOpenTodo = {handleOpenTodo}
      />
    </div>
  )
}
export default Todo;
