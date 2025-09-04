import React, { useState } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    setTodos([
      ...todos,
      { id: Date.now(), text: input, completed: false },
    ]);
    setInput("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const saveEdit = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editingText } : todo
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg transition-all duration-300">
        <h1 className="text-3xl font-extrabold text-purple-700 mb-6 text-center tracking-wide">
          Todo List
        </h1>

        {/* Input Form */}
        <form onSubmit={addTodo} className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a task..."
            className="flex-1 px-4 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
          <button
            type="submit"
            className="px-5 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all"
          >
            Add
          </button>
        </form>

        {/* Filters */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                filter === "all"
                  ? "bg-purple-600 text-white"
                  : "bg-purple-100 text-purple-700"
              }`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                filter === "active"
                  ? "bg-purple-600 text-white"
                  : "bg-purple-100 text-purple-700"
              }`}
              onClick={() => setFilter("active")}
            >
              Active
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                filter === "completed"
                  ? "bg-purple-600 text-white"
                  : "bg-purple-100 text-purple-700"
              }`}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
          </div>
          <span className="text-gray-500 text-sm">
            {activeCount} active
          </span>
        </div>

        {/* Todo Items */}
        <ul className="space-y-3 mb-4">
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className={`flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg shadow-sm transition-all duration-200 ${
                todo.completed ? "opacity-60" : ""
              }`}
            >
              {editingId === todo.id ? (
                <div className="flex-1 flex gap-2 items-center">
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="flex-1 px-2 py-1 border rounded focus:outline-none"
                  />
                  <button
                    onClick={() => saveEdit(todo.id)}
                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-2 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-xs"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <span
                    onClick={() => toggleTodo(todo.id)}
                    className={`flex-1 cursor-pointer select-none transition-all ${
                      todo.completed
                        ? "line-through text-gray-400"
                        : "text-gray-800"
                    }`}
                  >
                    {todo.text}
                  </span>
                  <button
                    onClick={() => startEditing(todo.id, todo.text)}
                    className="ml-2 px-2 py-1 text-xs bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="ml-2 px-2 py-1 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>

        {/* Clear Completed Button */}
        <div className="flex justify-end">
          <button
            onClick={clearCompleted}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all text-sm"
            disabled={todos.filter((t) => t.completed).length === 0}
          >
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
}
