import { ITodo } from "@/App";
import Todo from "../Todo";


export default function TodoList({ todos, deleteTodo }: {todos: ITodo[], deleteTodo: (id: number) => void}) {
  return (
    <ul>
      {todos.length > 0 ? (
        todos.map((todo) => (
         <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} />
        ))
      ) : (
        <p>No todos available.</p>
      )}
    </ul>
  );
}
