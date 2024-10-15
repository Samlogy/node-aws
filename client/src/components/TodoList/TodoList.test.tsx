import { render, screen } from "@testing-library/react";
import TodoList from "./index.tsx";
import { ITodo } from "@/App.tsx";


describe("TodoList Test", () => {
    test("should renders a list of 2 todos when todos length is greater than 0", () => {
        const todos: ITodo[] = [
            { id: 1, title: "Learn React", completed: false, userId: 1 },
            { id: 2, title: "Write Tests", completed: false, userId: 1 },
        ];

        render(<TodoList todos={todos} deleteTodo={jest.fn()} />);

        const todoItems = screen.getAllByRole("listitem");
        expect(todoItems).toHaveLength(2);

        expect(screen.getByText("Learn React")).toBeInTheDocument();
        expect(screen.getByText("Write Tests")).toBeInTheDocument();
    });
    
    test('should renders "No todos available" when todos length is 0', () => {
        const todos: ITodo[] = [];

        render(<TodoList todos={todos} deleteTodo={jest.fn()} />);
        expect(screen.getByText("No todos available.")).toBeInTheDocument();
    });
})

