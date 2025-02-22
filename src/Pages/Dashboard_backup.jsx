import React, { useState } from "react";
import { ChevronRight, LogOut } from "lucide-react";

const Dashboard = () => {
  const [showMatching, setShowMatching] = useState(false);
  const [showMissing, setShowMissing] = useState(false);
  const [showAdditional, setShowAdditional] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [resume, setResume] = useState(null);
  const [showInstructions, setShowInstructions] = useState(true); // Set to true initially
  const [loading, setLoading] = useState(false);

  const handleUpload = (event) => {
    setResume(event.target.files[0]);
  };

  const handleAnalyze = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowInstructions(false); // Hide instructions & show questions
    }, 2000);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 p-4 md:p-6">
      {/* Left Panel */}
      <div className="w-full md:w-1/3 bg-white p-4 md:p-6 shadow-lg rounded-xl flex flex-col border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Job Description</h2>
          <button 
            onClick={handleAnalyze}
            className="bg-red-500 w-[100px] text-white px-3 py-1 rounded-md text-sm shadow-sm hover:bg-red-600"
          >
            Analyze
          </button>
        </div>

        <textarea
          className="w-full p-3 h-40 border rounded-lg mb-4 focus:ring focus:ring-blue-300"
          placeholder="Paste the Job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        
        <h2 className="text-lg font-semibold mb-2 text-gray-700">Attach Resume</h2>
        <input 
          type="file" 
          className="w-full bg-blue-500 text-white pl-3 py-2 rounded-lg cursor-pointer mb-4" 
          onChange={handleUpload} 
        />
        
        <h2 className="text-lg font-semibold mb-2 text-gray-700">Attach Notes</h2>
        <textarea
          className="w-full p-3 border rounded-lg mb-4 focus:ring focus:ring-blue-300"
          placeholder="Type additional notes here..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        
        {[{ label: "Matching Areas", state: showMatching, setter: setShowMatching },
          { label: "Missing Areas", state: showMissing, setter: setShowMissing },
          { label: "Additional Areas", state: showAdditional, setter: setShowAdditional }].map(({ label, state, setter }) => (
          <div className="mb-4" key={label}>
            <button 
              className="w-full bg-blue-600 text-white py-2 rounded-lg focus:outline-none shadow-md"
              onClick={() => setter(!state)}
            >{label}</button>
            {state && (
              <textarea className="w-full p-3 border rounded-lg mt-2 focus:ring focus:ring-blue-300" placeholder={label} />
            )}
          </div>
        ))}
      </div>
      
     {/* Right Panel */}
     <div 
        className="w-full md:w-2/3 bg-white p-4 md:p-6 shadow-lg rounded-xl mt-4 md:mt-0 md:ml-6 flex flex-col border border-gray-200" 
        style={{ backgroundImage: "url('/whatsapp-bg.png')", backgroundSize: "cover" }}
      >
        <div className="bg-white text-black p-3 rounded-t-xl flex justify-between items-center border-b">
          <span className="font-bold text-xl">Recruiter Copilot Chat</span>
          <button className="text-red-500 flex items-center">
            <LogOut className="mr-2" size={24} /> Logout
          </button>
        </div>

        {/* Show Instructions Initially, then Questions After Analysis */}
        {showInstructions ? (
          <div className="bg-white mt-2 p-4 rounded-lg border border-gray-300 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-700">🔹 How It Works</h2>
            <ul className="mt-2 space-y-2 text-gray-600">
              <li><span className="font-medium text-gray-800">Step 1:</span> Type the Job Description in the left panel.</li>
              <li><span className="font-medium text-gray-800">Step 2:</span> Attach your resume.</li>
              <li><span className="font-medium text-gray-800">Step 3:</span> Add any additional notes (optional).</li>
              <li><span className="font-medium text-gray-800">Step 4:</span> Click the <span className="text-blue-600 font-medium">"Analyze"</span> button.</li>
            </ul>
            <p className="mt-4 text-gray-700">
              Once analyzed, the right panel will display <strong>questions and answers</strong> based on the Job Description and Resume.  
              The left panel will highlight <strong>Matching Areas, Missing Areas, and Additional Notes</strong> for better insights.
            </p>
          </div>
        ) : (
          <div className="p-3 bg-white rounded-b-xl flex items-center border-t">
            <input className="flex-1 p-2 border border-gray-800 rounded-lg" placeholder="Type a prompt..." />
            <button className="ml-2 bg-red-200 border border-gray-600 text-black p-2 rounded-lg">B</button>
            <button className="ml-2 bg-red-200 border border-gray-600 text-black p-2 rounded-lg">I</button>
            <button className="ml-2 bg-red-200 border border-gray-600 text-black p-2 rounded-lg">E</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;