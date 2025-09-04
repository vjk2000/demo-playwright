import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TodoList from "../components/TodoList";

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

    fireEvent.change(input, { target: { value: "Old Task" } });
    fireEvent.click(button);

    fireEvent.click(screen.getByText(/Edit/i));
    const editInput = screen.getByDisplayValue("Old Task");

    fireEvent.change(editInput, { target: { value: "Updated Task" } });
    fireEvent.click(screen.getByText(/Save/i));

    expect(screen.getByText("Updated Task")).toBeInTheDocument();
  });

  it("deletes a todo", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/Enter a task/i);
    const button = screen.getByText(/Add/i);

    fireEvent.change(input, { target: { value: "Temporary Task" } });
    fireEvent.click(button);

    fireEvent.click(screen.getByText(/Delete/i));

    expect(screen.queryByText("Temporary Task")).not.toBeInTheDocument();
  });

  it("clears completed todos", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/Enter a task/i);
    const button = screen.getByText(/Add/i);

    fireEvent.change(input, { target: { value: "Completed Task" } });
    fireEvent.click(button);

    const todoItem = screen.getByText("Completed Task");
    fireEvent.click(todoItem); // mark as completed

    fireEvent.click(screen.getByText(/Clear Completed/i));

    expect(screen.queryByText("Completed Task")).not.toBeInTheDocument();
  });
});