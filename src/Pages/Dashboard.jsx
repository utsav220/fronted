import React, { useState } from "react";
import { LogOut } from "lucide-react";
import { analyzeResume } from "../config/axios.config";
import { useNavigate } from "react-router-dom";
import { removeUserData } from "../Helper/LocalStorageHelper";

const Dashboard = () => {
  const navigate = useNavigate();
  
  const [showMatching, setShowMatching] = useState(false);
  const [showMissing, setShowMissing] = useState(false);
  const [showAdditional, setShowAdditional] = useState(false);

  const [matchingText, setMatchingText] = useState("");
  const [missingText, setMissingText] = useState("");
  const [additionalText, setAdditionalText] = useState("");

  // New state variables for questions
  const [beginnerQuestions, setBeginnerQuestions] = useState([]);
  const [intermediateQuestions, setIntermediateQuestions] = useState([]);
  const [expertQuestions, setExpertQuestions] = useState([]);

  const [jobDescription, setJobDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [activeSection, setActiveSection] = useState(null);

  // Helper to check if any question categories have items
  const hasQuestions = () => {
    return beginnerQuestions.length > 0 || 
           intermediateQuestions.length > 0 || 
           expertQuestions.length > 0;
  };

  // Function to toggle section visibility
  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleUpload = (event) => {
    setResume(event.target.files[0]);
  };

  const handleLogout = () => {
    removeUserData();
    navigate("/");
  };

  const handleAnalyze = async () => {
    if (!jobDescription || !resume) {
      alert("Please provide a job description and attach a resume.");
      return;
    }
  
    setLoading(true);
    setResponseMessage("");

    try {
      const result = await analyzeResume(jobDescription, resume, notes);
      
      if (result.success) {
        const data = result.data;
        console.log("Full Response Data:", data);
        
        // Set existing analysis data
        setMatchingText(data.analysis.matching_areas?.join(", ") || "");
        setMissingText(data.analysis.missing_areas?.join(", ") || "");
        setAdditionalText(data.analysis.additional_areas?.join(", ") || "");
        
        // Set new question data
        setBeginnerQuestions(data.beginner_questions || []);
        setIntermediateQuestions(data.intermediate_questions || []);
        setExpertQuestions(data.expert_questions || []);
        
        setResponseMessage("Analysis completed successfully!");
      } else {
        setResponseMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      setResponseMessage("An unexpected error occurred.");
      console.error("Request error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 p-4 md:p-6">
      
      {/* Left Panel */}
      <div className="w-full md:w-1/3 bg-white p-4 md:p-6 shadow-lg rounded-xl flex flex-col border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Job Description</h2>
          <button
            className="bg-red-500 w-[100px] text-white px-3 py-1 rounded-md text-sm shadow-sm hover:bg-red-600"
            onClick={handleAnalyze}
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze"}
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

        {/* Only show these areas if questions are available */}
        {hasQuestions() && [
          { label: "Matching Areas", state: showMatching, setter: setShowMatching, value: matchingText },
          { label: "Missing Areas", state: showMissing, setter: setShowMissing, value: missingText },
          { label: "Additional Areas", state: showAdditional, setter: setShowAdditional, value: additionalText },
        ].map(({ label, state, setter, value }) => (
          <div className="mb-4" key={label}>
            <button 
              className="w-full bg-blue-600 text-white py-2 rounded-lg focus:outline-none shadow-md"
              onClick={() => setter(!state)}
            >
              {label}
            </button>
            {state && (
              <textarea 
                className="w-full p-3 border rounded-lg mt-2 focus:ring focus:ring-blue-300" 
                placeholder={label} 
                value={value} 
                readOnly 
              />
            )}
          </div>
        ))}

        {responseMessage && (
          <div className="mt-4 p-3 bg-gray-200 rounded-lg text-center">
            {responseMessage}
          </div>
        )}
      </div>

      {/* Right Panel */}
      <div 
        className="w-full md:w-2/3 bg-white p-4 md:p-6 shadow-lg rounded-xl mt-4 md:mt-0 md:ml-6 flex flex-col border border-gray-200" 
        style={{ backgroundImage: "url('/whatsapp-bg.png')", backgroundSize: "cover" }}
      >
        <div className="bg-white text-black p-3 rounded-t-xl flex justify-between items-center border-b">
          <span className="font-bold text-xl">Recruiter Copilot Chat</span>
          <button 
            className="text-red-500 flex items-center hover:text-red-700 transition duration-200"
            onClick={handleLogout}
          >
            <LogOut className="mr-2" size={24} /> Logout
          </button>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-1 bg-white mt-2 p-4 overflow-y-auto space-y-2 rounded-lg border border-gray-300 h-64">
          {/* Check if there are any questions to display */}
          {beginnerQuestions.length > 0 || intermediateQuestions.length > 0 || expertQuestions.length > 0 ? (
            <>
              {/* Display Beginner Questions */}
              <button
                className="w-full bg-blue-500 text-white py-2 rounded-lg font-bold focus:outline-none mb-2"
                onClick={() => toggleSection("beginner")}
              >
                {activeSection === "beginner" ? "Hide Beginner Questions" : "Show Beginner Questions"}
              </button>

              {activeSection === "beginner" && beginnerQuestions.length > 0 && (
                <div className="mb-6">
                  <div className="text-xl font-bold text-center mb-4 text-gray-700">Beginner Questions</div>
                  {beginnerQuestions.map((item, index) => (
                    <div key={`beginner-${index}`} className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="text-lg font-medium text-black mb-2">Question {index + 1}:</div>
                      <div className="text-sm text-gray-700 mb-2">{item.question}</div>
                      <div className="text-lg font-medium text-black mb-2">Answer {index + 1}:</div>
                      <div className="text-sm text-gray-700">{item.answer}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Display Intermediate Questions */}
              <button
                className="w-full bg-blue-500 text-white py-2 rounded-lg font-bold focus:outline-none mb-2"
                onClick={() => toggleSection("intermediate")}
              >
                {activeSection === "intermediate" ? "Hide Intermediate Questions" : "Show Intermediate Questions"}
              </button>
              {activeSection === "intermediate" && intermediateQuestions.length > 0 && (
                <div className="mb-6">
                  <div className="text-xl font-bold text-center mb-4 text-gray-700">Intermediate Questions</div>
                  {intermediateQuestions.map((item, index) => (
                    <div key={`intermediate-${index}`} className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="text-lg font-medium text-black mb-2">Question {index + 1}:</div>
                      <div className="text-sm text-gray-700 mb-2">{item.question}</div>
                      <div className="text-lg font-medium text-black mb-2">Answer {index + 1}:</div>
                      <div className="text-sm text-gray-700">{item.answer}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Display Expert Questions */}
              <button
                className="w-full bg-blue-500 text-white py-2 rounded-lg font-bold focus:outline-none mb-2"
                onClick={() => toggleSection("expert")}
              >
                {activeSection === "expert" ? "Hide Expert Questions" : "Show Expert Questions"}
              </button>
              {activeSection === "expert" && expertQuestions.length > 0 && (
                <div className="mb-6">
                  <div className="text-xl font-bold text-center mb-4 text-gray-700">Expert Questions</div>
                  {expertQuestions.map((item, index) => (
                    <div key={`expert-${index}`} className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="text-lg font-medium text-black mb-2">Question {index + 1}:</div>
                      <div className="text-sm text-gray-700 mb-2">{item.question}</div>
                      <div className="text-lg font-medium text-black mb-2">Answer {index + 1}:</div>
                      <div className="text-sm text-gray-700">{item.answer}</div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            // Show hardcoded examples when no data is available
            <div className="text-center text-gray-600">
              <div className="text-lg font-semibold">Example Questions</div>
              <div className="text-sm mt-2">Question 1: How do you create a new React component?</div>
              <div className="text-sm text-gray-700">Answer: Using a function or class component.</div>

              <div className="text-sm mt-2">Question 2: Can you create a new React component using the class keyword or function keyword?</div>
              <div className="text-sm mt-2">Question 3: What is MongoDB, and how does it differ from relational databases?</div>
            </div>
          )}
        </div>

        {/* Input Box - Only show if questions are available */}
        {hasQuestions() && (
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