import React, { useState } from 'react'

export default function FetchMessage() {
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)
  
  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/message')
      const data = await res.json()
      setMsg(data.message)
    } catch (e) {
      setMsg('Failed to load')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <button 
        onClick={load}
        disabled={loading}
        className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {loading ? 'Loading...' : 'Load message'}
      </button>
      {msg && (
        <p className="mt-4 p-3 bg-gray-50 border-l-4 border-blue-500 text-gray-700 rounded-r-md">
          {msg}
        </p>
      )}
    </div>
  )
}