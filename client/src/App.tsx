import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm/index.tsx";
import TodoList from "./components/TodoList/index.tsx";

export interface ITodo {
  id: number
  title: string
  completed: boolean
  userId: number
}

export default function App() {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const addTodo = (todoText: string) => {
    axios
      .post("http://localhost:4002/todos", {
        title: todoText,
        userId: 1,
        completed: false,
      })
      .then((res) => setTodos([...todos, res.data]))
      .catch((err) => console.error("Error adding todo:", err));
  };

  const deleteTodo = (id: number) => {
    axios
      .delete(`http://localhost:4002/todos/${id}`)
      .then(() => setTodos(todos.filter((todo) => todo.id !== id)))
      .catch((err) => console.error("Error deleting todo:", err));
  };

  const loadTodos = () => {
    axios
      .get("http://localhost:4002/todos")
      .then((res) => setTodos(res.data))
      .catch((err) => console.error("Error fetching todos:", err));
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div className="App">
      <h1>Todo App</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} />
    </div>
  );
}