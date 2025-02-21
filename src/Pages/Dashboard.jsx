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
          className="w-full p-3 border rounded-lg  focus:ring focus:ring-blue-300"
          placeholder="Type additional notes here..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

          {responseMessage && (
          <div className="mt-4 p-3 bg-gray-200 mb-4 rounded-lg text-center">
            {responseMessage}
          </div>
        )}

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

      </div>

      {/* Right Panel */}
      <div 
  className="w-full md:w-2/3 bg-white shadow-lg rounded-xl border border-gray-200 p-4 md:p-6 mt-4 md:mt-0 md:ml-6 flex flex-col"
  style={{ backgroundImage: "url('/whatsapp-bg.png')", backgroundSize: "cover" }}
>
  {/* Header */}
  <div className="bg-white text-black p-4 rounded-t-xl flex justify-between items-center border-b">
    <h2 className="font-bold text-xl">Recruiter Copilot Chat</h2>
    <button 
      className="text-red-500 flex items-center hover:text-red-700 transition duration-200"
      onClick={handleLogout}
    >
      <LogOut className="mr-2" size={20} /> Logout
    </button>
  </div>
  
  {/* Chat Messages */}
  <div className="flex-1 bg-white p-4 overflow-y-auto space-y-4 rounded-lg border border-gray-300 h-64 mt-5">
    {beginnerQuestions.length > 0 || intermediateQuestions.length > 0 || expertQuestions.length > 0 ? (
      <>
        {/* Beginner Questions Section */}
        <button
          className="w-full bg-gray-200 border text-black py-2 rounded-lg font-semibold transition duration-200 hover:bg-gray-300"
          onClick={() => toggleSection("beginner")}
        >
          {activeSection === "beginner" ? "Hide Beginner Questions" : "Show Beginner Questions"}
        </button>

        {activeSection === "beginner" && beginnerQuestions.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-center text-gray-700 mb-3">Beginner Questions</h3>
            {beginnerQuestions.map((item, index) => (
              <div key={`beginner-${index}`} className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
                <p className="text-sm font-medium text-black">Q{index + 1}: {item.question}</p>
                <p className="text-sm font-medium text-gray-600 mt-2">A{index + 1}: {item.answer}</p>
              </div>
            ))}
          </div>
        )}

        {/* Intermediate Questions Section */}
        <button
          className="w-full bg-gray-200  border text-black  py-2 rounded-lg font-semibold transition duration-200 hover:bg-gray-300 mt-2"
          onClick={() => toggleSection("intermediate")}
        >
          {activeSection === "intermediate" ? "Hide Intermediate Questions" : "Show Intermediate Questions"}
        </button>

        {activeSection === "intermediate" && intermediateQuestions.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-center text-gray-700 mb-3">Intermediate Questions</h3>
            {intermediateQuestions.map((item, index) => (
              <div key={`intermediate-${index}`} className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
                <p className="text-sm font-medium text-black">Q{index + 1}: {item.question}</p>
                <p className="text-sm font-medium text-gray-600 mt-2">A{index + 1}: {item.answer}</p>
              </div>
            ))}
          </div>
        )}

        {/* Expert Questions Section */}
        <button
          className="w-full bg-gray-200 text-black border py-2 rounded-lg font-semibold transition duration-200 hover:bg-gray-300 mt-2"
          onClick={() => toggleSection("expert")}
        >
          {activeSection === "expert" ? "Hide Expert Questions" : "Show Expert Questions"}
        </button>

        {activeSection === "expert" && expertQuestions.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-center text-gray-700 mb-3">Expert Questions</h3>
            {expertQuestions.map((item, index) => (
              <div key={`expert-${index}`} className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
                <p className="text-sm font-medium text-black">Q{index + 1}: {item.question}</p>
                <p className="text-sm font-medium text-gray-600 mt-2">A{index + 1}: {item.answer}</p>
              </div>
            ))}
          </div>
        )}
      </>
    ) : (
      // Show default instructions if no questions are available
      <div className="max-w-lg mx-auto text-center text-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">How It Works</h2>
        
        <div className="bg-white shadow-md rounded-lg p-6 space-y-3">
          {["Enter the job description in the left panel.", "Upload the candidate’s resume.", "Add any additional job-related requirements.", 'Click "Analyze" to start the evaluation.'].map((step, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="text-blue-500 font-semibold">{index + 1}.</span>
              <p className="text-sm">{step}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-gray-100 rounded-lg p-5 text-left">
          <h3 className="text-lg font-semibold text-gray-800">Analysis Results</h3>
          <p className="text-sm mt-2">The system evaluates and provides insights on:</p>

          <ul className="mt-3 space-y-2">
            <li className="flex items-center space-x-2">
              <span className="text-green-500">✔</span>
              <span className="text-sm"><strong>Matching Areas:</strong> Skills aligned with the job description.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-red-500">✖</span>
              <span className="text-sm"><strong>Missing Areas:</strong> Identified gaps in skills or experience.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-yellow-500">⚡</span>
              <span className="text-sm"><strong>Additional Notes:</strong> Improvement recommendations.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-blue-500">📌</span>
              <span className="text-sm"><strong>Targeted Questions:</strong> Based on skill level.</span>
            </li>
          </ul>
        </div>
      </div>
    )}
  </div>

  {/* Input Box - Only show if questions exist */}
  {hasQuestions() && (
    <div className="p-3 bg-white rounded-b-xl flex items-center border-t">
      <input className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300" placeholder="Type a response..." />
      {["B", "I", "E"].map((label) => (
        <button key={label} className="ml-2 bg-gray-200 text-gray-800 p-2 rounded-lg hover:bg-gray-300 transition">
          {label}
        </button>
      ))}
    </div>
  )}
</div>

    </div>
  );
};

export default Dashboard;