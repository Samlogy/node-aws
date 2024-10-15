import { render, screen, fireEvent } from "@testing-library/react";
import Todo from "./";
import { ITodo } from "@/App";

describe('Todo Test', () => {
    test('should render a todo title', () => {
        const todo: ITodo = { id: 1, title: "Test Todo", completed: false, userId: 1 };
        const deleteTodo = jest.fn(); 
        
        render(<Todo todo={todo} deleteTodo={deleteTodo} />);
        const todoTitle = screen.getByText(/test todo/i);
        
        expect(todoTitle).toBeInTheDocument();
    });
      
    test('should call deleteTodo when delete button is clicked', () => {
        const todo: ITodo = { id: 1, title: "Test Todo", completed: false, userId: 1 };
        const deleteTodo = jest.fn(); 
        
        render(<Todo todo={todo} deleteTodo={deleteTodo} />);
        const deleteButton = screen.getByText(/delete/i);
        fireEvent.click(deleteButton);
        
        expect(deleteTodo).toHaveBeenCalledWith(1);
    });
})


