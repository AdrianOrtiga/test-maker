import React from 'react'

export default function Todo({todo, toggleTodo}) {
    function handleCheckTodo(){
        toggleTodo(todo.id)
    }

    return (
        <li>
            <input type={"checkbox"} checked={todo.complete} onChange={handleCheckTodo}/>
            {todo.text} 
        </li>
    )
}
