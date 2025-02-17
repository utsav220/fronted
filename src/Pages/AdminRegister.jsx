import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../service/auth.service";
import toast from "react-hot-toast";

const AdminRegister = () => {
  const [email, setEmail] = useState("");
  const { token, user, login } = useAuth();

  const handleCreateAdmin = async () => {  // Add async here
    if (!email) {
      alert("Email is required");
      return;
    }
  
    console.log("Sending login request...");
    
    try {
      const data = {
        username: email,
        password: "admin",  // Ensure correct password
      };
      console.log("data", data);
      const loginData = await loginUser(data);  // Use await inside async function
      console.log("Login Success:", loginData);
      toast.success("Login Success");
  
      if (loginData.token && loginData.user) {
        const isAdmin = loginData.user.roles.some(role => role.roleName === "ROLE_ADMIN");
        login(loginData.token, loginData.user); // Store token in auth context
  
        if (isAdmin) {
          navigate("/SuperAdmin");
        } else if(!isAdmin) {
          navigate("/dashboard");
        }
      } else {
        throw new Error("Invalid login data");
      }
    } catch (error) {
      console.log("Login error:", error);
  
      if (error.response?.status === 404 || error.response?.status === 500) {
        toast.error("User does not exist!");
        alert("User does not exist!");
      } else {
        toast.error("Login failed");
      }
    }
  };
  

  return (
    <>
    <div className="bg-slate-300 min-h-screen flex items-center justify-center">
    <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-lg">
      <div className="bg-gray shadow-5xl rounded-2xl p-6 w-96 text-center shadow-gray-500/200">
        <h2 className="text-xl font-bold mb-4">Email</h2>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
        <button
          onClick={handleCreateAdmin}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 shadow-lg shadow-blue-400/50"
        >
          Create Admin
        </button>
       
      </div>
    </div>
    </div>
    </>
   
  );
};

export default AdminRegister;