import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { loginUser } from "../service/auth.service";

const Login = () => {
  const { token, user, login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("data", data);
    try {
      const loginData = await loginUser(data);
      console.log(loginData);
      
      // Check if we have a token in the response
      if (loginData.token && loginData.token.access) {
        toast.success("Login Success");
        
        // Create a user object from the response data
        const userData = {
          is_admin: loginData.is_admin,
          is_superadmin: loginData.is_superadmin
        };
        
        // Pass token and user data to your auth context
        login(loginData.token.access, userData);
        //loginData.is_admin &&
        // Navigate based on admin status
        if ( loginData.is_superadmin) {
          navigate("/SuperAdmin");
        } else {
          navigate("/dashboard");
        }
      } else {
        throw new Error("Invalid login data - missing token");
      }
    } catch (error) {
      console.log(error);
      
      // Check if the error is a user not found case
      if (error.response?.status === 404 || error.response?.status === 500) {
        toast.error("User does not exist!");
        alert('User does not exist!')
      } else {
        toast.error("Login failed");
      }
    }
  };

  return (
   <>
    <div className="bg-slate-300 min-h-screen flex items-center justify-center">
  <Helmet>
    <title>Login | BMI Copanalist</title>
  </Helmet>
  <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-lg">
    <h2 className="text-2xl font-bold text-center">Login Here</h2>
    <p className="text-sm text-center">Login to Dashboard..</p>
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">username</label>
        <input
          {...register("username", {
            required: "username is Required !",
           
          })}
          type="input"
          className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          placeholder="Enter your username"
        />
        {errors.username && <span className="text-red-400 py-2 block px-2">{errors.username.message}</span>}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          {...register("password", {
            required: "Password is Required !",
          })}
          type="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          placeholder="Enter your password"
        />
        {errors.password && <span className="text-red-400 py-2 block px-2">{errors.password.message}</span>}
      </div>
      <div className="flex space-x-4">
        <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Login
        </button>
        <button type="reset" className="w-full py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">
          Reset
        </button>
      </div>
      <div className="text-center mt-2">
        <button type="button" className="text-indigo-600 hover:underline" onClick={() => alert('Redirecting to Forgot Password')}>
          Forgot Password?
        </button>
      </div>
    </form>
  </div>
</div>

   </>
  );
};

export default Login;