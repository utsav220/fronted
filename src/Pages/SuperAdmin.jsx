import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button, Drawer, Sidebar, TextInput } from "flowbite-react";
import {
  HiChartPie,
  HiClipboard,
  HiCollection,
  HiInformationCircle,
  HiLogin,
  HiPencil,
  HiSearch,
  HiShoppingBag,
  HiUsers,
} from "react-icons/hi";
import { TbVideoPlus } from "react-icons/tb";
import { FaBorderAll } from "react-icons/fa6";
import { IoAddCircle } from "react-icons/io5";
import { TiThMenu } from "react-icons/ti";

const SuperAdmin = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  
  // Mobile drawer state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mobile drawer toggle
  const toggleMobileMenu = () => {
    if (isMobile) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Top Header Bar */}
      <div className="bg-gray-500 text-white py-3 px-4 flex justify-between items-center h-35">
        <div className="flex items-center space-x-2">
          <div className="bg-green-500 rounded-full p-1">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2 1m2-1l-2-1m2 1v2.5M12 21l2-1m-2 1l-2-1m2 1v-2.5M6 7l2-1m-2 1l2 1m-2-1v2.5M6 17l2-1m-2 1l2 1m-2-1v-2.5" />
            </svg>
          </div>
          <span className="text-xl font-bold">JobSeekr</span>
        </div>
        <div className="flex-grow flex justify-center items-center space-x-2">
          <span className="text-xl font-bold text-center">Welcome to SuperAdmin</span>
        </div>
        {isMobile && (
          <TiThMenu
            size={30}
            onClick={toggleMobileMenu}
            className="cursor-pointer text-white sm:hidden"
          />
        )}
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Drawer for small screens */}
        {isMobile && (
          <Drawer 
            open={isMobileMenuOpen} 
            onClose={() => setIsMobileMenuOpen(false)}
            className="md:hidden"
          >
            <Drawer.Header>
              <Drawer.Title>
                Admin Menu
              </Drawer.Title>
              <Drawer.Close />
            </Drawer.Header>
            <Drawer.Body>
              <div className="flex flex-col space-y-4">
                <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
                    <HiChartPie className="text-gray-600" />
                    <span>Admin</span>
                  </div>
                </Link>
                <Link to="/AdminRegister" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
                    <HiShoppingBag className="text-gray-600" />
                    <span>Register</span>
                  </div>
                </Link>
                <Link to="#" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
                    <FaBorderAll className="text-gray-600" />
                    <span>List of Users</span>
                  </div>
                </Link>
                <div 
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
                  onClick={() => {
                    logout();
                    window.location.reload();
                  }}
                >
                  <HiInformationCircle className="text-gray-600" />
                  <span>Logout</span>
                </div>
              </div>
            </Drawer.Body>
          </Drawer>
        )}

        {/* Permanently visible sidebar for non-mobile */}
        <div className="hidden sm:block w-64 bg-slate-400 flex-shrink-0 overflow-y-auto">
          <Sidebar aria-label="Admin Sidebar" className="h-full bg-slate-400 text-black">
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <Sidebar.Item
                  active={location.pathname === "/dashboard"}
                  as={Link}
                  to={"/dashboard"}
                  icon={HiChartPie}
                >
                  Admin
                </Sidebar.Item>
                <Sidebar.Item
                  as={Link}
                  to={"/AdminRegister"}
                  icon={HiShoppingBag}
                  active={location.pathname === "/AdminRegister"}
                >
                  Register
                </Sidebar.Item>
              </Sidebar.ItemGroup>
              <Sidebar.ItemGroup>
                <Sidebar.Item
                  href="#"
                  icon={FaBorderAll}
                >
                  List of Users
                </Sidebar.Item>
                <Sidebar.Item
                  icon={HiInformationCircle}
                  onClick={() => {
                    logout();
                    window.location.reload();
                  }}
                >
                  Logout
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto bg-slate-300 text-white">
          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdmin;