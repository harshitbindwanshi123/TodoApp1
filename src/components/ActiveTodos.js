import React, { useEffect, useState } from 'react'
import './activetodo.css'
import { AiFillDelete } from "react-icons/ai";
import axios from 'axios';



const ActiveTodos = () => {
    const [todos,setTodos]=useState([])
    const [todo,setTodo]=useState([])  
    const [loading, setLoading] = useState(true);
    const BASE_URL='http://localhost:5000/todos'


    useEffect(()=>
    {
      setLoading(true);
      axios.get(BASE_URL)
      .then((response) => {       
        setTodos(response.data);
        console.log(response.data)
        setLoading(false);
      })
      .catch((error) => {       
        console.error('Error fetching data:', error);
        setLoading(false);
      });
    },[todo])




    const addTodo = () => {    
      console.log(todo)       
         axios.post(`${BASE_URL}`,{id:Math.floor(Math.random()*100),todo:todo})
        .then((response) => {       
          // setTodos(response.data);
          console.log(response.data)          
          setTodo("")
        })
        .catch((error) => {      
          console.error('Error fetching data:', error);
         
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