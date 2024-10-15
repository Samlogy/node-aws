import { render, screen, fireEvent } from "@testing-library/react";
import TodoForm from "../../components/TodoForm";

describe("TodoList Test", () => {
    test('should renders input field and button', () => {
        const addTodo = jest.fn();
        render(<TodoForm addTodo={addTodo} />)

        const input = screen.getByPlaceholderText(/add new todo/i)
        const button = screen.getByRole('button', {name: /add/i})

        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute("type", "submit");
    });

    test('should add a new todo when input filled, button clicked', () => {
        const addTodo = jest.fn();
        render(<TodoForm addTodo={addTodo} />);

        const input = screen.getByLabelText(/Add new todo/i) as HTMLInputElement;
        const button = screen.getByRole("button", { name: /add/i });

        fireEvent.change(input, { target: { value: "New Todo" } });
        fireEvent.click(button);

        expect(addTodo).toHaveBeenCalledWith("New Todo");
        expect(input.value).toBe("");        
    });  
})

