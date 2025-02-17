import React, { useState } from "react";
import { ChevronRight } from "lucide-react";

const Dashboard = () => {
  const [showMatching, setShowMatching] = useState(false);
  const [showMissing, setShowMissing] = useState(false);
  const [showAdditional, setShowAdditional] = useState(false);
 return (

  <>
        <div className="min-h-screen flex items-center justify-center bg-gray-300 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl h-screen flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 overflow-hidden">
          {/* Left Panel */}
          <div className="space-y-4 flex flex-col h-full overflow-auto">
            <button className="w-full bg-red-600 text-white py-2 rounded">Upload JD</button>
            <button className="w-full bg-red-600 text-white py-2 rounded">Upload Resume</button>
            <textarea className="w-full border rounded p-2 flex-1" placeholder="Additional Notes"></textarea>
            <button className="w-full bg-blue-600 text-white py-2 rounded" onClick={() => setShowMatching(!showMatching)}>
              Matching Areas
            </button>
            {showMatching && <textarea className="w-full border rounded p-2 flex-1 transition-all duration-300" placeholder="Matching Areas"></textarea>}
            
            <button className="w-full bg-blue-600 text-white py-2 rounded" onClick={() => setShowMissing(!showMissing)}>
              Missing Areas
            </button>
            {showMissing && <textarea className="w-full border rounded p-2 flex-1 transition-all duration-300" placeholder="Missing Areas"></textarea>}
            
            <button className="w-full bg-blue-600 text-white py-2 rounded" onClick={() => setShowAdditional(!showAdditional)}>
              Additional Areas
            </button>
            {showAdditional && <textarea className="w-full border rounded p-2 flex-1 transition-all duration-300" placeholder="Additional Areas"></textarea>}
          </div>
          
          {/* Center Panel - Questions */}
          <div className="md:col-span-2 space-y-4 flex flex-col h-full overflow-auto">
            <h2 className="text-lg font-semibold text-center bg-blue-800 text-white p-2 rounded">
              Your Screening Questions
            </h2>
            <textarea className="w-full border rounded p-2 flex-1" placeholder="Question 1:"></textarea>
            <div className="relative">
              <textarea className="w-full border rounded p-2 h-12 pr-10" placeholder="Write your prompt here....."></textarea>
              <button className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded flex items-center justify-center w-10 h-10">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>

 )
}

export default Dashboard