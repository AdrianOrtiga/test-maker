import { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoRef = useRef()
  

  useEffect(() => {
    const todosStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(todosStorage) setTodos(todosStorage)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function addTodo() {
    const text = todoRef.current.value
    if (text === '') return
    setTodos(
      prevTodos => {
        return [...prevTodos, { id: uuidv4(), text: text, complete: false }]
      }
    )

    todoRef.current.value = null
  }

  function removeCompleteTodos(){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  function countTodos(){
    return todos.filter(todo => !todo.complete).length
  }

  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input type="text" ref={todoRef} />
      <button onClick={addTodo}>Add Todo</button>
      <button onClick={removeCompleteTodos}>Clear Completed Todos</button>
      <div> {countTodos()} left to do</div>
    </>
  )
}

export default App;
