import React, { useState } from "react";
import { CheckSquare, Plus, Filter, Trash2, Calendar, Target, Users, TrendingUp } from "lucide-react";
import TodoList from "../components/TodoList";

// Your existing TodoList component (you can replace this with the import above)
// function TodoList() {
//   const [todos, setTodos] = useState([]);
//   const [input, setInput] = useState("");
//   const [filter, setFilter] = useState("all");
//   const [editingId, setEditingId] = useState(null);
//   const [editingText, setEditingText] = useState("");

//   const addTodo = (e) => {
//     e.preventDefault();
//     if (input.trim() === "") return;
//     setTodos([
//       ...todos,
//       { id: Date.now(), text: input, completed: false },
//     ]);
//     setInput("");
//   };

//   const toggleTodo = (id) => {
//     setTodos(
//       todos.map((todo) =>
//         todo.id === id
//           ? { ...todo, completed: !todo.completed }
//           : todo
//       )
//     );
//   };

//   const deleteTodo = (id) => {
//     setTodos(todos.filter((todo) => todo.id !== id));
//   };

//   const startEditing = (id, text) => {
//     setEditingId(id);
//     setEditingText(text);
//   };

//   const saveEdit = (id) => {
//     setTodos(
//       todos.map((todo) =>
//         todo.id === id ? { ...todo, text: editingText } : todo
//       )
//     );
//     setEditingId(null);
//     setEditingText("");
//   };

//   const cancelEdit = () => {
//     setEditingId(null);
//     setEditingText("");
//   };

//   const clearCompleted = () => {
//     setTodos(todos.filter((todo) => !todo.completed));
//   };

//   const filteredTodos = todos.filter((todo) => {
//     if (filter === "active") return !todo.completed;
//     if (filter === "completed") return todo.completed;
//     return true;
//   });

//   const activeCount = todos.filter((todo) => !todo.completed).length;
//   const completedCount = todos.filter((todo) => todo.completed).length;

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
//       <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg transition-all duration-300">
//         <h1 className="text-3xl font-extrabold text-purple-700 mb-6 text-center tracking-wide">
//           Todo List
//         </h1>

//         {/* Input Form */}
//         <div className="flex gap-2 mb-6">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyPress={(e) => e.key === 'Enter' && addTodo(e)}
//             placeholder="Enter a task..."
//             className="flex-1 px-4 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
//           />
//           <button
//             onClick={addTodo}
//             className="px-5 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all"
//           >
//             Add
//           </button>
//         </div>

//         {/* Filters */}
//         <div className="flex justify-between items-center mb-4">
//           <div className="flex gap-2">
//             <button
//               className={`px-3 py-1 rounded-full text-sm font-medium ${
//                 filter === "all"
//                   ? "bg-purple-600 text-white"
//                   : "bg-purple-100 text-purple-700"
//               }`}
//               onClick={() => setFilter("all")}
//             >
//               All
//             </button>
//             <button
//               className={`px-3 py-1 rounded-full text-sm font-medium ${
//                 filter === "active"
//                   ? "bg-purple-600 text-white"
//                   : "bg-purple-100 text-purple-700"
//               }`}
//               onClick={() => setFilter("active")}
//             >
//               Active
//             </button>
//             <button
//               className={`px-3 py-1 rounded-full text-sm font-medium ${
//                 filter === "completed"
//                   ? "bg-purple-600 text-white"
//                   : "bg-purple-100 text-purple-700"
//               }`}
//               onClick={() => setFilter("completed")}
//             >
//               Completed
//             </button>
//           </div>
//           <span className="text-gray-500 text-sm">
//             {activeCount} active
//           </span>
//         </div>

//         {/* Todo Items */}
//         <ul className="space-y-3 mb-4">
//           {filteredTodos.map((todo) => (
//             <li
//               key={todo.id}
//               className={`flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg shadow-sm transition-all duration-200 ${
//                 todo.completed ? "opacity-60" : ""
//               }`}
//             >
//               {editingId === todo.id ? (
//                 <div className="flex-1 flex gap-2 items-center">
//                   <input
//                     type="text"
//                     value={editingText}
//                     onChange={(e) => setEditingText(e.target.value)}
//                     className="flex-1 px-2 py-1 border rounded focus:outline-none"
//                   />
//                   <button
//                     onClick={() => saveEdit(todo.id)}
//                     className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
//                   >
//                     Save
//                   </button>
//                   <button
//                     onClick={cancelEdit}
//                     className="px-2 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-xs"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               ) : (
//                 <>
//                   <span
//                     onClick={() => toggleTodo(todo.id)}
//                     className={`flex-1 cursor-pointer select-none transition-all ${
//                       todo.completed
//                         ? "line-through text-gray-400"
//                         : "text-gray-800"
//                     }`}
//                   >
//                     {todo.text}
//                   </span>
//                   <button
//                     onClick={() => startEditing(todo.id, todo.text)}
//                     className="ml-2 px-2 py-1 text-xs bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition-all"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => deleteTodo(todo.id)}
//                     className="ml-2 px-2 py-1 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
//                   >
//                     Delete
//                   </button>
//                 </>
//               )}
//             </li>
//           ))}
//         </ul>

//         {/* Clear Completed Button */}
//         <div className="flex justify-end">
//           <button
//             onClick={clearCompleted}
//             className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all text-sm"
//             disabled={todos.filter((t) => t.completed).length === 0}
//           >
//             Clear Completed
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// Header Component that wraps the TodoList
function Header() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 shadow-xl">
        <div className="container mx-auto px-4 py-8">
          {/* Top Navigation */}
          <nav className="flex flex-col lg:flex-row justify-between items-center mb-8">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-4 mb-6 lg:mb-0">
              <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm border border-white/30">
                <CheckSquare className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white tracking-tight">
                  TaskFlow Pro
                </h1>
                <p className="text-purple-100 text-lg">Organize your life, one task at a time</p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              <nav className="flex space-x-6 text-white/90">
                <a href="#" className="hover:text-white transition-colors font-medium">Dashboard</a>
                <a href="#" className="hover:text-white transition-colors font-medium">Projects</a>
                <a href="#" className="hover:text-white transition-colors font-medium">Calendar</a>
                <a href="#" className="hover:text-white transition-colors font-medium">Analytics</a>
              </nav>
              <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg backdrop-blur-sm border border-white/30 transition-all font-medium">
                Get Started
              </button>
            </div>
          </nav>

          {/* Hero Section */}
          <div className="text-center py-12">
            <h2 className="text-5xl font-bold text-white mb-4 leading-tight">
              Master Your Tasks
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Experience the ultimate todo management system with real-time progress tracking, 
              smart filters, and intuitive task organization.
            </p>
            
            {/* Feature Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
                <Target className="h-8 w-8 text-green-300 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-white mb-1">Smart Goals</h3>
                <p className="text-purple-100 text-sm">Track progress with intelligent insights</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
                <Calendar className="h-8 w-8 text-blue-300 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-white mb-1">Time Management</h3>
                <p className="text-purple-100 text-sm">Organize tasks by priority and deadline</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
                <Users className="h-8 w-8 text-yellow-300 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-white mb-1">Team Sync</h3>
                <p className="text-purple-100 text-sm">Collaborate seamlessly with your team</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
                <TrendingUp className="h-8 w-8 text-pink-300 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-white mb-1">Analytics</h3>
                <p className="text-purple-100 text-sm">Measure productivity and growth</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center py-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to boost your productivity?</h3>
              <p className="text-purple-100 mb-6">Join thousands of users who have transformed their task management with TaskFlow Pro.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg">
                  Start Your Free Trial
                </button>
                <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-all">
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* TodoList Section */}
      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Try It Now</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience our powerful todo management system right here. Add tasks, mark them complete, and see your progress in real-time.
            </p>
          </div>
          
          {/* TodoList Component Integration */}
          <TodoList />
          
          {/* Additional Features Section */}
          <div className="mt-20 bg-gradient-to-r from-purple-50 to-blue-50 rounded-3xl p-12">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Why Choose TaskFlow Pro?</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Built with modern technology and designed for maximum productivity
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Plus className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Easy Task Creation</h4>
                <p className="text-gray-600">Quickly add new tasks with our intuitive interface. No complicated forms or lengthy processes.</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Filter className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Smart Filtering</h4>
                <p className="text-gray-600">Filter tasks by status, priority, or custom categories to focus on what matters most.</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <CheckSquare className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Progress Tracking</h4>
                <p className="text-gray-600">Monitor your productivity with visual progress indicators and completion statistics.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <CheckSquare className="h-8 w-8 text-purple-400" />
              <span className="text-2xl font-bold">TaskFlow Pro</span>
            </div>
            <div className="flex space-x-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2025 TaskFlow Pro. All rights reserved. Built with React and Tailwind CSS.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Header;