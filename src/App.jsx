import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import router from "./config/router";
import { ToastContainer } from "react-toastify";

function App() {
  return (
   <>
   <ToastContainer/>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
   
   </>
  );
}

export default App;
