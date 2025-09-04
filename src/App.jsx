import React, { useState } from 'react'
import TodoList from './components/TodoList'
import "./index.css"

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div >
      {/* <h1>Playwright Demo</h1>
      <div>
        <p>Counter: {count}</p>
        <button onClick={() => setCount(c => c + 1)}>Increment</button>
      </div>

      <hr />

      <FetchMessage /> */}
      <TodoList />
    </div>
  )
}
