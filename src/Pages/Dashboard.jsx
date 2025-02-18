import React, { useState } from "react";
import { ChevronRight, LogOut } from "lucide-react";

const Dashboard = () => {
  const [showMatching, setShowMatching] = useState(false);
  const [showMissing, setShowMissing] = useState(false);
  const [showAdditional, setShowAdditional] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [resume, setResume] = useState(null);

  const handleUpload = (event) => {
    setResume(event.target.files[0]);
  };

  return (
    <>
       <div className="flex min-h-screen bg-gray-100 p-6">
        <div className="w-1/3 bg-green-50 p-6 shadow-lg rounded-xl">
          <textarea
            className="w-full p-2 border rounded mb-4"
            placeholder="Paste the Job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          <input 
            type="file" 
            className="w-full bg-blue-500 text-white py-2 rounded mb-4" 
            onChange={handleUpload} 
          />
          {resume && <p className="text-green-600">{resume.name} uploaded</p>}
          <textarea
            className="w-full p-2 border rounded mb-4"
            placeholder="Type additional notes here..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          
          {/* Matching Areas Section */}
          <div className="mb-4">
            <button 
              className="w-full bg-blue-600 text-white py-2 rounded focus:outline-none"
              onClick={() => setShowMatching(!showMatching)}
            >Matching Areas</button>
            {showMatching && (
              <textarea className="w-full p-2 border rounded mb-4" placeholder="Matching Areas" />
            )}
          </div>
          
          {/* Missing Areas Section */}
          <div className="mb-4">
            <button 
              className="w-full bg-blue-600 text-white py-2 rounded focus:outline-none"
              onClick={() => setShowMissing(!showMissing)}
            >Missing Areas</button>
            {showMissing && (
              <textarea className="w-full p-2 border rounded mb-4" placeholder="Missing Areas" />
            )}
          </div>
          
          {/* Additional Notes Section */}
          <div className="mb-4">
            <button 
              className="w-full bg-blue-600 text-white py-2 rounded focus:outline-none border-black border"
              onClick={() => setShowAdditional(!showAdditional)}
            >Additional Areas</button>
            {showAdditional && (
              <textarea className="w-full p-2 border rounded mb-4" placeholder="Additional Areas" />
            )}
          </div>
        </div>
        <div 
          className="w-2/3 bg-green-50 p-6 shadow-lg rounded-xl ml-6 h-screen flex flex-col" 
          style={{ backgroundImage: "url('/whatsapp-bg.png')", backgroundSize: "cover" }}
        >
          <div className="bg-white text-black p-3 rounded-t-xl flex justify-between items-center">
            <span>Recruiter Copilot Chat</span>
            <button className="text-red-500 flex items-center">
              <LogOut className="mr-2" size={24} /> Logout
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-2">
          <div className="text-black text-left font-medium"> Question 1: How do you create a new React component?</div>
          <div className="text-black text-left font-medium"> Answer 1: </div>
          <div className="text-black text-left font-medium">Question 2: You can create a new React component using the class keyword or function keyword?</div>
          
          <div className="text-black text-left font-medium">Question 3: What is MongoDB, and how does it differ from relational databases?</div>
          </div>
          <div className="p-3 bg-white rounded-b-xl flex items-center">
            <input className="flex-1 p-2 border rounded-lg" placeholder="Type a message..." />
            <button className="ml-2 bg-green-300 text-black p-2 rounded-lg">B</button>
            <button className="ml-2 bg-green-300 text-black p-2 rounded-lg">I</button>
            <button className="ml-2 bg-green-300 text-black p-2 rounded-lg">E</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
