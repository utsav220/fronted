import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createAdmin } from "../service/auth.createUsers";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { ClipboardCopy } from "lucide-react"; // Import copy icon

const Signup = () => {
  const [registeredUser, setRegisteredUser] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (object) => {
    try {
      const userData = await createAdmin(object);
      setRegisteredUser(userData);
      setIsRegistered(true);
      toast.success("User is created !!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  // Function to copy text to clipboard
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <div>
      <Helmet>
        <title>Signup | BMI Capilot</title>
      </Helmet>

      <div className="mt-5 lg:mt-20 dark:text-white flex items-center justify-center shadow-xl">
        <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-xl rounded-lg">

          {/* Show Registration Form Only If User is Not Registered */}
          {!isRegistered ? (
            <>
              <h2 className="text-2xl font-bold text-center">Sign Up</h2>
              <p className="text-xl text-center text-black-900 dark:text-gray-900 font-bold">
                Create an account for User
              </p>

              <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-gray-900">
                    Email
                  </label>
                  <input
                    {...register("email", {
                      required: "Email is Required !",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/,
                        message: "Email must be valid !",
                      },
                    })}
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 dark:text-gray-900 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <span className="text-red-400 py-2 block px-2">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className="flex space-x-4">
                  <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    Sign Up
                  </button>
                  <button type="reset" className="w-full py-2 bg-gray-400 dark:bg-gray-600 text-white rounded-lg hover:bg-gray-500 dark:hover:bg-gray-700">
                    Reset
                  </button>
                </div>
              </form>
            </>
          ) : (
            // Show Registered User Details After Successful Registration
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-green-600">Registration Successful!</h3>

              {/* Email Section with Copy Button */}
              {/* Email Section with Copy Button */}
              <div className="flex items-center justify-between bg-gray-200  rounded-lg mt-4 m-3">
                <p className="text-lg font-bold text-black">User Email:</p>
                <span className="text-lg  text-black">{registeredUser?.email}</span>
                <button
                  onClick={() => handleCopy(registeredUser?.email)}
                  className="p-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-700"
                >
                  <ClipboardCopy size={18} />
                </button>
              </div>

              {/* Password Section with Copy Button */}
              <div className="flex items-center justify-between bg-gray-200 p-2 rounded-lg mt-4">
                <p className="text-lg font-bold text-black">User Password:</p>
                <span className="text-lg  text-black">{registeredUser?.temporary_password}</span>
                <button
                  onClick={() => handleCopy(registeredUser?.temporary_password)}
                  className="p-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-700"
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
