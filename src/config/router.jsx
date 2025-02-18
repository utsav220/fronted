import Login from '../Pages/Login';
import { AuthProvider } from '../context/AuthContext';
import SuperAdmin from '../Pages/SuperAdmin';
import Dashboard from '../Pages/Dashboard';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AdminRegister from '../Pages/AdminRegister';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <Login />
      </AuthProvider>
    ),
  },
  {
    path: "dashboard", // This becomes /superadmin/dashboard
    element: <Dashboard />
  },
  {
    path: "/superadmin",
    element: (
      <AuthProvider>
        <SuperAdmin />
      </AuthProvider>
    ),
    children: [
     
      {
        path: "admin-register", // This becomes /superadmin/admin-register
        element: <AdminRegister />
      }
      
    ]
  },
  
]);

export default router;