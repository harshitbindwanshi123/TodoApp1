import React, { useEffect, useState } from 'react'
import './activetodo.css'
import { AiFillDelete } from "react-icons/ai";
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { AiFillEdit } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

 
const ActiveTodos = (a,b) => {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

    const [todos,setTodos]=useState([])    
    const [name,setName]=useState("")
    const [loading, setLoading] = useState(true);
    const BASE_URL='http://localhost:8000/todos'
    const [editValue,setEditValue]=useState("")
    const [id,setId]=useState(0)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(()=>
    {    
      setName("")
      getTodos();
    },[])

     const getTodos=()=>
     {
      axios.get('http://localhost:8000/todos')
      .then((response) => {       
        setTodos(response.data);
        console.log(response.data)        
      })
      .catch((error) => {       
        console.error('Error fetching data:', error);        
      });
     }


    const addTodo = () => {             
         axios.post('http://localhost:8000/todos',{id : Math.floor(Math.random()*100), name:name})
        .then((response) => {         
          console.log(response.data)          
          setName("")
          getTodos();
          handleClose();
        })
        .catch((error) => {      
          console.error('Error fetching data:', error);
         
        });     
     }

     const updateTodo = () => {             
      axios.put(`http://localhost:8000/todos/${id}`,{id :id , name:editValue})
     .then((response) => {     

       console.log(response.data)  
       handleClose(); 
       setName("")
       getTodos();
     })
     .catch((error) => {      
       console.error('Error fetching data:', error);
      
     });     
  }


     const deleteTodo=async(id)=>
     {
      axios.delete(`http://localhost:8000/todos/${id}`)
      .then((response) => {        
       console.log("delete ho gya")
       getTodos();
      })
      .catch((error) => {      
        console.error('Error fetching data:', error);       
      });    
     }



const handleEditButton = (id,name) => { 
 setId(id)
  setEditValue(name)
  handleOpen();
 }


  return (
    <div className='todos_main'>
<TextField  label="Todo" variant="outlined" value={name} onChange={(e)=>setName(e.target.value)} />

        <button onClick={()=>addTodo()}>Add</button>
        <div className="todos">
        {
            todos.map((item ,index)=>
                     
                   
                    <div key={index} className="item">
                      <div>{item.name}</div>
                      <div className="buttons">
                        <div className='delete_button'onClick={()=>deleteTodo(item.id)}><AiFillDelete/></div> 
                      <div className="edit_button" onClick={()=>handleEditButton(item.id,item.name)}><AiFillEdit/></div>
                      </div>
                      
                      </div>                   
             
           )
        }</div>

<div>      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Todo
          </Typography>
          <TextField  label="Todo" variant="outlined" value={editValue} onChange={(e)=>setEditValue(e.target.value)} />
          <Button style={{margin:"10px",marginLeft:"20px"}} variant="contained" onClick={()=>updateTodo()}>Save</Button>
          <div className="close_button" onClick={()=>handleClose()}><AiOutlineClose/></div>
        </Box>
      </Modal>
    </div>
    </div>
  )
}

export default ActiveTodos