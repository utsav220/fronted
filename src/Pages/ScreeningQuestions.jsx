import React from 'react'

const ScreeningQuestions = () => {
  return (
    <div className="flex-1 p-4">
      <h2 className="text-lg font-semibold bg-blue-900 text-white p-2 rounded">Your Screening Questions</h2>
      <div className="mt-4 space-y-4">
        <div className="p-4 border rounded-lg bg-white">Beginner</div>
        <div className="p-4 border rounded-lg bg-white">Intermediate</div>
        <div className="p-4 border rounded-lg bg-white">Expert</div>
      </div>
      <div className="mt-6 border-t pt-4">
        <input 
          type="text" 
          placeholder="Write your prompt here..." 
          className="w-full p-3 border rounded-lg text-gray-700" 
        />
        <button className="w-full bg-blue-600 text-white py-2 mt-4 rounded-lg hover:bg-blue-700 transition">
          Submit Prompt
        </button>
      </div>
    </div>
  )
}

export default ScreeningQuestions