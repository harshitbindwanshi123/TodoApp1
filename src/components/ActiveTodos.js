import React, { useEffect, useState } from 'react'
import './activetodo.css'
import { AiFillDelete } from "react-icons/ai";



const ActiveTodos = () => {
    const [todos,setTodos]=useState([])
    const [todo,setTodo]=useState([])  


    const addTodo = async() => {
        setTodos([...todos,{id:"3",todo:todo}])
        setTodo("")

        await fetch('http://localhost:8000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id:Math.random(),todo:todo}), 
      });
     }
     const deleteTodo=async(id)=>
     {
      console.log(id)
      await fetch(`http://localhost:8000/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },        
      });
     }
useEffect(()=>
{
  fetch('http://localhost:8000/todos').then(
    responce=>responce.json()
  ).then(
    responce=>setTodos(responce)
  ) 
},[todo,todos])

  return (
    <div className='todos_main'>

        <input type="text" value={todo} onChange={(e)=>setTodo(e.target.value)} />
        <button onClick={()=>addTodo()}>Add</button>
        <div className="todos">
        {
            todos.map((item ,index)=>
                     
                   
                    <div key={index} className="item">
                      <div>{item.todo}</div>
                      <div className='delete_button'onClick={()=>deleteTodo(item.id)}><AiFillDelete/></div> 
                      </div>                   
             
           )
        }</div>
    </div>
  )
}

export default ActiveTodos