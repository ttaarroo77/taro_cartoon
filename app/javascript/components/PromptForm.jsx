import React, { useState } from 'react'

const PromptForm = ({ onSubmit, isLoading }) => {
  const [prompt, setPrompt] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (prompt.trim()) {
      onSubmit(prompt)
    }
  }

  return (
    <div className="p-4 bg-dark-800 rounded-lg shadow">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label 
            htmlFor="prompt" 
            className="block text-gray-300 text-sm font-bold mb-2"
          >
            好きな動物や物の名前を入れてね
          </label>
          <input
            type="text"
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="shadow appearance-none border bg-dark-700 border-dark-600 rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:border-accent-500"
            placeholder="例：ぞう、くるま、おはな"
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-accent-600 hover:bg-accent-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? '生成中...' : '画像を生成する'}
        </button>
      </form>
    </div>
  )
}

export default PromptForm 