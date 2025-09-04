import React, { useState } from 'react'
import FetchMessage from './FetchMessage'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ padding: 20 }}>
      <h1>Playwright Demo</h1>
      <div>
        <p>Counter: {count}</p>
        <button onClick={() => setCount(c => c + 1)}>Increment</button>
      </div>

      <hr />

      <FetchMessage />
    </div>
  )
}
