import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

describe("App Component Integration Tests", () => {
  beforeEach(() => {
    mock.reset();
  });

  test("loads todos and displays them in the TodoList", async () => {
    // Mock initial GET request
    const todos = [
      { id: 1, title: "First Todo", completed: false, userId: 1 },
      { id: 2, title: "Second Todo", completed: false, userId: 1 },
    ];
    mock.onGet("http://localhost:4002/todos").reply(200, todos);

    render(<App />);

    // Wait for the todos to be rendered
    await waitFor(() => expect(screen.getByText(/first todo/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/second todo/i)).toBeInTheDocument());
  });

  test("adds a new todo and displays it in the list", async () => {
    // Mock GET and POST requests
    const todos = [{ id: 1, title: "First Todo", completed: false, userId: 1 }];
    const newTodo = { id: 2, title: "New Todo", completed: false, userId: 1 };
    mock.onGet("http://localhost:4002/todos").reply(200, todos);
    mock.onPost("http://localhost:4002/todos").reply(200, newTodo);

    render(<App />);

    const input = screen.getByPlaceholderText(/add new todo/i);
    const addButton = screen.getByRole("button", { name: /add/i });

    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.click(addButton);

    // Wait for the new todo to appear in the list
    await waitFor(() => expect(screen.getByText(/new todo/i)).toBeInTheDocument());
  });
});
