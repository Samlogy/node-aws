import { fireEvent, render, screen } from "@testing-library/react";
import { ITodo } from "../../App";
import Todo from "../../components/Todo";

describe("Todo Component", () => {
  test("should render a todo title", () => {
    const MockTodo: ITodo = {
      id: 1,
      title: "Todo 1",
      completed: false,
      userId: 1,
    };
    const deleteTodo = jest.fn();

    render(<Todo todo={MockTodo} deleteTodo={deleteTodo} />);
    const todo = screen.getByText(/Todo 1/i);
    expect(todo).toBeInTheDocument();
  });
  test('should delete when button is clicked" when todo list is empty', () => {
    const MockTodo: ITodo = {
      id: 1,
      title: "Todo 1",
      completed: false,
      userId: 1,
    };
    const deleteTodo = jest.fn();

    render(<Todo todo={MockTodo} deleteTodo={deleteTodo} />);

    const deleteButton = screen.getByText(/delete/i);
    fireEvent.click(deleteButton);
    expect(deleteTodo).toHaveBeenCalledWith(1);
  });
});
