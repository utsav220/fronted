import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createAdmin } from "../service/auth.createUsers";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { ClipboardCopy } from "lucide-react";

const Signup = () => {
  const [registeredUser, setRegisteredUser] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const userData = await createAdmin(data);
      setRegisteredUser(userData);
      setIsRegistered(true);
      toast.success("User successfully created!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <div>
      <Helmet>
        <title>Signup | BMI Copilot</title>
      </Helmet>

      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
          {!isRegistered ? (
            <>
              <h2 className="text-2xl font-semibold text-center text-gray-700">Create an Account</h2>
              <p className="text-md text-center text-gray-600 mb-6">Fill in your details to register</p>

              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/,
                        message: "Enter a valid email address",
                      },
                    })}
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
                    placeholder="Enter your email"
                  />
                  {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                </div>
                
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
                  >
                    Sign Up
                  </button>
                  <button
                    type="reset"
                    className="w-full py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-200"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-green-600">Registration Successful!</h3>

              <div className="mt-4 p-3 bg-gray-100 rounded-lg flex justify-between items-center">
                <span className="text-md font-medium text-gray-700">User Email:</span>
                <span className="text-md font-bold text-gray-900">{registeredUser?.email}</span>
                <button
                  onClick={() => handleCopy(registeredUser?.email)}
                  className="p-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
                >
                  <ClipboardCopy size={18} />
                </button>
              </div>

              <div className="mt-4 p-3 bg-gray-100 rounded-lg flex justify-between items-center">
                <span className="text-md font-medium text-gray-700">Temporary Password:</span>
                <span className="text-md font-bold text-gray-900">{registeredUser?.temporary_password}</span>
                <button
                  onClick={() => handleCopy(registeredUser?.temporary_password)}
                  className="p-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
                >
                  <ClipboardCopy size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
