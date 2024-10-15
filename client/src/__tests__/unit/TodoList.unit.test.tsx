import { render, screen } from "@testing-library/react";
import TodoList from "../../components/TodoList";
import {ITodo} from "../../App"

describe("TodoList Component", () => {
    test('should render a list of todos', () => {
        const MockTodos: ITodo[] = [{ id: 1, title: "Todo 1", completed: false, userId: 1 }, { id: 2, title: "Todo 2", completed: false, userId: 1 }];
        const deleteTodo = jest.fn();

        render(<TodoList todos={MockTodos} deleteTodo={deleteTodo} /> )

        const todos = screen.getAllByRole("listitem");
        expect(todos.length).toBe(2);
        expect(screen.getByText("Todo 1")).toBeInTheDocument();
        expect(screen.getByText("Todo 2")).toBeInTheDocument();
    });
    test('should render "No todos available" when todo list is empty', () => {
        const MockTodos :ITodo[] = [];
        const deleteTodo = jest.fn();

        render(<TodoList todos={MockTodos} deleteTodo={deleteTodo} /> )
        expect(screen.getByText('No todos available.')).toBeInTheDocument();
    });
});
