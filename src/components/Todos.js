import React, { useState, useEffect } from 'react';
import './todo.css';
import ActiveTodos from './ActiveTodos';
import CompletedTodos from './CompletedTodos';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [active, setActive] = useState(true);

  useEffect(() => {
    console.log(active);
  }, [active]);

  return (
    <div className="main_todo">
      <div className="tabs">
        <div
          className={active ? "Active" : " "}
          onClick={() => !active && setActive(true)}
          style={{
            backgroundColor: active ? "lightblue" : "lightgray",
            width: "50%",
            height: "50px",
            borderRadius: "20px 0px 0px 0px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Active 
        </div>
        <div
          className={!active ? "completed" : ""}
          onClick={() => active && setActive(false)}
          style={{
            backgroundColor: !active ? "lightblue" : "lightgray",
            width: "50%",
            height: "50px",
            borderRadius: "0px 20px 0px 0px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Completed 
        </div>
      </div>
      <div className="todo">
        {active ? (
          <div className="todo_active"><ActiveTodos/></div>
        ) : (
          <div className="todo_completed"><CompletedTodos/></div>
        )}
      </div>
    </div>
  );
};

export default Todos;
