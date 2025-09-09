import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import TodoList from "../components/TodoList";

// describe("TodoList Component", () => {
//   // Clean up after each test to prevent DOM pollution
//   afterEach(() => {
//     cleanup();
//   });
describe("TodoList Component", () => {
  it("adds a new todo", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/Enter a task/i);
    const button = screen.getByText(/Add/i);

    fireEvent.change(input, { target: { value: "Learn Vitest" } });
    fireEvent.click(button);

    expect(screen.getByText("Learn Vitest")).toBeInTheDocument();
  });

  it("toggles todo completion", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/Enter a task/i);
    const button = screen.getByText(/Add/i);

    fireEvent.change(input, { target: { value: "Finish project" } });
    fireEvent.click(button);

    const todoItem = screen.getByText("Finish project");
    fireEvent.click(todoItem);

    expect(todoItem).toHaveClass("line-through");
  });

  it("edits a todo", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/Enter a task/i);
    const button = screen.getByText(/Add/i);

    // Add a todo first
    fireEvent.change(input, { target: { value: "Old Task" } });
    fireEvent.click(button);

    // Click edit button
    fireEvent.click(screen.getByText(/Edit/i));

    // Find the edit input and change its value
    const editInput = screen.getByDisplayValue("Old Task");
    fireEvent.change(editInput, { target: { value: "Updated Task" } });
    
    // Save the edit
    fireEvent.click(screen.getByText(/Save/i));

    expect(screen.getByText("Updated Task")).toBeInTheDocument();
    expect(screen.queryByText("Old Task")).not.toBeInTheDocument();
  });

  it("deletes a todo", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/Enter a task/i);
    const button = screen.getByText(/Add/i);

    // Add a todo first
    fireEvent.change(input, { target: { value: "Temporary Task" } });
    fireEvent.click(button);

    // Delete the todo
    fireEvent.click(screen.getByText(/Delete/i));

    expect(screen.queryByText("Temporary Task")).not.toBeInTheDocument();
  });

  it("clears completed todos", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/Enter a task/i);
    const button = screen.getByText(/Add/i);

    // Add a todo
    fireEvent.change(input, { target: { value: "Completed Task" } });
    fireEvent.click(button);

    // Mark todo as completed by clicking on it
    const todoItem = screen.getByText("Completed Task");
    fireEvent.click(todoItem);

    // Verify it's marked as completed
    expect(todoItem).toHaveClass("line-through");

    // Clear completed todos
    const clearButton = screen.getByText(/Clear Completed/i);
    expect(clearButton).not.toBeDisabled(); // Should be enabled now
    fireEvent.click(clearButton);

    // Verify the completed todo is removed
    expect(screen.queryByText("Completed Task")).not.toBeInTheDocument();
  });

  it("filters todos correctly", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/Enter a task/i);
    const addButton = screen.getByText(/Add/i);

    // Add two todos
    fireEvent.change(input, { target: { value: "Active Task" } });
    fireEvent.click(addButton);
    
    fireEvent.change(input, { target: { value: "Completed Task" } });
    fireEvent.click(addButton);

    // Mark second todo as completed
    const completedTodo = screen.getByText("Completed Task");
    fireEvent.click(completedTodo);

    // Test "Active" filter
    const activeFilter = screen.getByText("Active");
    fireEvent.click(activeFilter);
    expect(screen.getByText("Active Task")).toBeInTheDocument();
    expect(screen.queryByText("Completed Task")).not.toBeInTheDocument();

    // Test "Completed" filter
    const completedFilter = screen.getByText("Completed");
    fireEvent.click(completedFilter);
    expect(screen.queryByText("Active Task")).not.toBeInTheDocument();
    expect(screen.getByText("Completed Task")).toBeInTheDocument();

    // Test "All" filter
    const allFilter = screen.getByText("All");
    fireEvent.click(allFilter);
    expect(screen.getByText("Active Task")).toBeInTheDocument();
    expect(screen.getByText("Completed Task")).toBeInTheDocument();
  });

  it("shows correct active count", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/Enter a task/i);
    const addButton = screen.getByText(/Add/i);

    // Initially should show 0 active
    expect(screen.getByText("0 active")).toBeInTheDocument();

    // Add one todo
    fireEvent.change(input, { target: { value: "Task 1" } });
    fireEvent.click(addButton);
    expect(screen.getByText("1 active")).toBeInTheDocument();

    // Add another todo
    fireEvent.change(input, { target: { value: "Task 2" } });
    fireEvent.click(addButton);
    expect(screen.getByText("2 active")).toBeInTheDocument();

    // Complete one todo
    const firstTodo = screen.getByText("Task 1");
    fireEvent.click(firstTodo);
    expect(screen.getByText("1 active")).toBeInTheDocument();
  });

  it("cancels editing a todo", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/Enter a task/i);
    const button = screen.getByText(/Add/i);

    // Add a todo
    fireEvent.change(input, { target: { value: "Original Task" } });
    fireEvent.click(button);

    // Start editing
    fireEvent.click(screen.getByText(/Edit/i));

    // Change the edit input value
    const editInput = screen.getByDisplayValue("Original Task");
    fireEvent.change(editInput, { target: { value: "Changed Task" } });

    // Cancel the edit
    fireEvent.click(screen.getByText(/Cancel/i));

    // Verify original text is preserved
    expect(screen.getByText("Original Task")).toBeInTheDocument();
    expect(screen.queryByText("Changed Task")).not.toBeInTheDocument();
  });
});