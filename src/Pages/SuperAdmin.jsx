import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { removeUserData } from "../Helper/LocalStorageHelper";
import { LogOut, Menu, X } from "lucide-react";
import { Sidebar, SidebarItem, SidebarItemGroup } from "flowbite-react";
import { HiChartPie, HiShoppingBag } from "react-icons/hi";
import { FaBorderAll } from "react-icons/fa6";

export default function SuperAdmin() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    removeUserData();
    navigate("/");
  };

  const navigationItems = [
    { path: "#", Icon: HiChartPie, label: "Dashboard" },
    { path: "admin-register", Icon: HiShoppingBag, label: "Register" },
    { path: "users", Icon: FaBorderAll, label: "Users" }
  ];

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-gray-800 text-white py-3 px-4 flex justify-between items-center">
        <span className="text-xl font-bold">BMI Copilot Beta</span>
        <span className="text-xl font-bold hidden sm:block">Welcome to SuperAdmin</span>
        {isMobile && (
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white p-4 transition-transform duration-300 z-20 ${
            isMobile ? (isMenuOpen ? "translate-x-0" : "-translate-x-full") : "relative translate-x-0"
          }`}
        >
          <Sidebar className="h-full bg-gray-900 text-white shadow-lg">
            <SidebarItemGroup className="space-y-2">
              {navigationItems.map(({ path, Icon, label }) => (
                <SidebarItem key={path} as={Link} to={path} onClick={() => setIsMenuOpen(false)}>
                  <Icon className="mr-2 inline-block" size={20} /> {label}
                </SidebarItem>
              ))}
              <SidebarItem className="text-red-500 hover:text-red-700" onClick={handleLogout}>
                <LogOut className="mr-2 inline-block" size={20} /> Logout
              </SidebarItem>
            </SidebarItemGroup>
          </Sidebar>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-4">
          <Outlet />
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobile && isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </div>
  );
}
