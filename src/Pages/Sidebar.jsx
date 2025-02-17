import FileUpload from "./FileUpload";

const Sidebar = () => {
  return (
    <div className="w-64 p-4 bg-gray-200 border-r border-gray-300 min-h-screen">
      <FileUpload label="Upload JD" />
      <div className="mt-2"></div>
      <FileUpload label="Upload Resume" />
      <div className="mt-4">
        <input 
          type="text" 
          placeholder="Additional Notes" 
          className="w-full p-2 border rounded bg-white text-gray-700" 
        />
      </div>
      <div className="mt-4 space-y-2">
        <input 
          type="text" 
          placeholder="Matching Areas" 
          className="w-full p-2 border rounded bg-white text-gray-700" 
        />
        <input 
          type="text" 
          placeholder="Missing Areas" 
          className="w-full p-2 border rounded bg-white text-gray-700" 
        />
        <input 
          type="text" 
          placeholder="Additional Areas" 
          className="w-full p-2 border rounded bg-white text-gray-700" 
        />
      </div>
      <button className="w-full bg-green-600 text-white py-2 mt-4 rounded-lg hover:bg-green-700 transition">Generate</button>
    </div>
  );
};

export default Sidebar;
