import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const handleProfile = () => {
        navigate("/profile");
    };

    const navItems = [
        { path: "/dashboard", label: "Dashboard" },
        { path: "/transactions", label: "Transactions" },
        { path: "/reports", label: "Reports" },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-19 items-center justify-between">

                    {/* Logo */}
                    <div className="flex items-center">
                        <img
                            src={logo}
                            alt="Logo"
                            className="h-38 w-auto object-contain"
                        />
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition
                  ${isActive(item.path)
                                        ? "text-black bg-gray-100"
                                        : "text-gray-700 hover:bg-gray-100 hover:text-black"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}

                        <button
                            onClick={handleProfile}
                            className="ml-4 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold
              bg-black text-white hover:bg-gray-800 transition"
                        >
                            Profile
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md text-black hover:bg-gray-100"
                        >
                            {isOpen ? (
                                <XMarkIcon className="h-6 w-6" />
                            ) : (
                                <Bars3Icon className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden transition-all duration-300 overflow-hidden
        ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
            >
                <div className="bg-white border-t border-gray-200 px-4 pb-4 pt-2 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            className={`block px-3 py-3 rounded-md text-base font-medium
                ${isActive(item.path)
                                    ? "bg-gray-100 text-black"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}

                    <button
                        onClick={() => {
                            handleProfile();
                            setIsOpen(false);
                        }}
                        className="w-full mt-2 px-3 py-3 rounded-md bg-black text-white font-medium"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
