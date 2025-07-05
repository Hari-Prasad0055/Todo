import { useState } from "react";
import axios from 'axios';
import { useAuth } from './context/authContext';
import "./todo.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Todo() {
  const [Todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = user._id;

        const res = await axios.get(`${BACKEND_URL}/todo/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTodos(res.data); // set to state
      } catch (err) {
        console.error("Failed to load todos:", err);
        alert("Error fetching todos.");
      }
    };

    if (user) fetchTodos();
  }, [user]);

  const Task = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!user || !token) {
        navigate("/login")
        alert("User not logged in.");

      }

      const res = await axios.post(`${BACKEND_URL}/todo`,
        {
          task: newTodo,
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Task added:", res.data);
      setTodos([...Todos, res.data]);
      setNewTodo("");
    } catch (err) {
      console.error("Error adding task:", err);
      alert("Failed to add task.");
    }
  };
  let deleteTodo = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(`${BACKEND_URL}/todo/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      console.log("Deleted:", res.data);
      setTodos((prevTodos) => prevTodos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete todo.");
    }
  };
  let markDone = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(`${BACKEND_URL}/todos/done/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === id ? { ...todo, isDone: true } : todo
      ))
    } catch (err) {
      console.error("failed to mark", err);
      alert("Failed to mark todo.");
    }
  }

   let logoutUser=()=>{
       localStorage.removeItem("token");
      navigate("/");
   }

  return (
    <div className="full">
      <div className="logout ">
      <h5><i class="fa-solid fa-user" ></i>:  {user.username}</h5>
      <h5>Email :{user.email}</h5>
      <button onClick={logoutUser} className="btn submit-button px-4 py-2 mt-2" >LogOut</button>
      </div>
      <div className="todototal">
     <h4 className="title"><b>MAKE YOUR TODOs</b></h4>
      <div className="top">
        <input
          placeholder="Type Your Todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="input-box"
        />
        <button onClick={Task} className="submit-button">Add Task</button>
      </div>

      <div className="task">
        <ul>
          {Todos.map(todo => (
            <li key={todo._id}>
              <span style={todo.isDone ? { textDecorationLine: "line-through" } : {}}>
                {todo.task}
              </span>
              &nbsp;&nbsp;
              <button onClick={() => deleteTodo(todo._id)}>Delete</button>
              &nbsp;
              <button onClick={() => markDone(todo._id)}>Mark As Done</button>
            </li>
          ))}
        </ul>
        </div>
      </div>
    </div>
  );
}
