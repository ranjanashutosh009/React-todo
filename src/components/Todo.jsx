import { useState } from 'react'
import './css/Todo.css'
import { useRef } from 'react';
import { useEffect } from 'react';
import Todoitems from './Todoitems';
var count = 0;
function Todo() {


    const [todos, settodos] = useState([]);
    const inputref = useRef(null);
    const add = () => {
        settodos([...todos, { no: count++, text: inputref.current.value, display: "" }]);
        inputref.current.value = "";
        localStorage.setItem("todos_count", count);
    };
    useEffect(() => {
        settodos(JSON.parse(localStorage.getItem("todos")));
        count = localStorage.getItem("todos_count");
    }, []);
    useEffect(() => {
        setTimeout(() => {
            console.log(todos);
            localStorage.setItem("todos", JSON.stringify(todos));
        }, 100);
    }, [todos]);

    return (
        <div className='todo'>
            <div className='todo-header'>To-Do List</div>
            <div className='todo-add'>
                <input ref={inputref} type="text" placeholder='Add Your Task' className='todo-input' />
                <div onClick={() => { add(); }} className="todo-add-btn">Add</div>
            </div>
            <div className="todo-list">
                {todos.map((item, index) => {
                    return <Todoitems key={index} settodos={settodos} no={item.no} display={item.display} text={item.text} />;
                })}
            </div>
        </div>
    );
}

export default Todo

