import React, { useState } from 'react'

export default function FetchMessage() {
  const [msg, setMsg] = useState('')
  const load = async () => {
    try {
      const res = await fetch('/api/message')
      const data = await res.json()
      setMsg(data.message)
    } catch (e) {
      setMsg('Failed to load')
    }
  }
  return (
    <div>
      <button onClick={load}>Load message</button>
      <p>{msg}</p>
    </div>
  )
}
