import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = (todoText) => {
    axios.post('http://localhost:4002/todos', { title: todoText, userId: 1, completed: false })
      .then(res => setTodos([...todos, res.data]))
      .catch(err => console.error('Error adding todo:', err));
  };

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:4002/todos/${id}`)
      .then(() => setTodos(todos.filter(todo => todo.id !== id)))
      .catch(err => console.error('Error deleting todo:', err));
  };

  const loadTodos = () => {
    axios.get('http://localhost:4002/todos')
      .then(res => {
        console.log('data => ', res.data);
        setTodos(res.data);
      })
      .catch(err => console.error('Error fetching todos:', err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addTodo(inputValue);
      setInputValue('');  // clear input after adding
    }
  };

  useEffect(() => {
    loadTodos()
  }, []);

  console.log(todos)

  return (
    <div className="App">
      <h1>Todo App</h1>

      <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add new todo"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>

      <ul>
      { Array.isArray(todos) && todos.length > 0 ? (
        todos?.map(todo => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))
      ) : (
        <p>No todos available.</p>
      )}
    </ul>
      {/* <TodoForm addTodo={addTodo} /> */}
      {/* <TodoList todos={todos} deleteTodo={deleteTodo} /> */}
    </div>
  );
}

export default App;


// function TodoForm({ addTodo }) {
//   const [inputValue, setInputValue] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (inputValue.trim()) {
//       addTodo(inputValue);
//       setInputValue('');  // clear input after adding
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="Add new todo"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//       />
//       <button type="submit">Add</button>
//     </form>
//   );
// }

// function TodoList({ todos, deleteTodo }) {
//   return (
//     <ul>
//       {todos.length > 0 ? (
//         todos.map(todo => (
//           <li key={todo.id}>
//             {todo.title}
//             <button onClick={() => deleteTodo(todo.id)}>Delete</button>
//           </li>
//         ))
//       ) : (
//         <p>No todos available.</p>
//       )}
//     </ul>
//   );
// }
