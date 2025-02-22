import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button, Drawer, Sidebar } from "flowbite-react";
import {
  HiChartPie,
  HiShoppingBag,
  HiInformationCircle,
} from "react-icons/hi";
import { FaBorderAll } from "react-icons/fa6";
import { TiThMenu } from "react-icons/ti";

const SuperAdmin = () => {
  const location = useLocation();
  const { logout } = useAuth();

  // Mobile drawer state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="flex flex-col h-screen">
      {/* Top Header Bar */}
      <div className="bg-gray-500 text-white py-3 px-4 flex justify-between items-center">
        <span className="text-xl font-bold">BMI Copilot Beta</span>
        <span className="text-xl font-bold">Welcome to SuperAdmin</span>
        {isMobile && <TiThMenu size={30} onClick={toggleMobileMenu} className="cursor-pointer" />}
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Drawer */}
        {isMobile && (
          <Drawer open={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            <Drawer.Header>
              <Drawer.Title>Admin Menu</Drawer.Title>
              <Drawer.Close />
            </Drawer.Header>
            <Drawer.Body>
              <nav className="flex flex-col space-y-4">
                <Link to="dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
                    <HiChartPie className="text-gray-600" />
                    <span>Dashboard</span>
                  </div>
                </Link>
                <Link to="admin-register" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
                    <HiShoppingBag className="text-gray-600" />
                    <span>Register</span>
                  </div>
                </Link>
                <Link to="users" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
                    <FaBorderAll className="text-gray-600" />
                    <span>Users</span>
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
              </nav>
            </Drawer.Body>
          </Drawer>
        )}

        {/* Sidebar */}
        <div className="hidden sm:block w-64 bg-slate-400 overflow-y-auto">
          <Sidebar className="h-full bg-slate-400 text-black">
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <Sidebar.Item as={Link} to="dashboard" icon={HiChartPie}>
                  Dashboard
                </Sidebar.Item>
                <Sidebar.Item as={Link} to="admin-register" icon={HiShoppingBag}>
                  Register
                </Sidebar.Item>
              </Sidebar.ItemGroup>
              <Sidebar.ItemGroup>
                <Sidebar.Item as={Link} to="users" icon={FaBorderAll}>
                  Users
                </Sidebar.Item>
                <Sidebar.Item icon={HiInformationCircle} onClick={logout}>
                  Logout
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto bg-slate-300 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SuperAdmin;
