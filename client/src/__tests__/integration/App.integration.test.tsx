import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import App from "../../App";


describe("App Component Integration Tests", () => {
  beforeAll(() => {
    const newTodo = {
      title: 'Initial Todo => test',
      userId: 1,
      completed: false,
    }
    axios
      .post("http://localhost:4002/todos", newTodo)
      .catch((err) => console.error("Error adding todo:", err));

  });

  test('should render heading, todo form & todo list components', () => {
    render(<App />)
 
    const heading = screen.getByRole("heading", { name: "Todo App" });
 
    const input = screen.getByPlaceholderText(/add new todo/i);
    const addButton = screen.getByRole("button", { name: /add/i });
 
    expect(heading).toBeInTheDocument();
 
   //  expect(todoList).to
 
    expect(input).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
   });

  test('should delete a todo when "deleteTodo" is triggered', async () => {
    render(<App />);
  
    await waitFor(async () => {
      const deleteButton = screen.getByRole("button", { name: /delete/i });
      fireEvent.click(deleteButton);

      await waitFor(() => expect(screen.queryByText(/Initial Todo => test/i)).not.toBeInTheDocument());
    })
  });  

  test("should add a new todo and display it in the list", async () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/add new todo/i);
    const addButton = screen.getByRole("button", { name: /add/i });
  
    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.click(addButton);
  
    await waitFor(() => expect(screen.getByText(/New Todo/i)).toBeInTheDocument());
  }); 

  test("should load todos and display them in the TodoList", async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText(/New Todo/i)).toBeInTheDocument());
  });
  
  afterAll(async () => {
    await axios.delete("http://localhost:4002/todos/truncate");
  });
});
