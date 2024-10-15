import { ITodo } from "@/App";


export default function Todo({ todo, deleteTodo }: {todo: ITodo, deleteTodo: (id: number) => void}) {
  return(
  <li>
    <p>{todo.title}</p>
    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
  </li>
  )
}