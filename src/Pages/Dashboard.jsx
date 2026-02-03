import React from "react";
import image from "../assets/image.png";
function Dashboard() {
    return (
        <>
            <div className="min-h-screen  bg-gradient-to-br from-blue-50 via-white to-green-50">

                <div className="max-w-7xl  mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">


                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                            Track Your Money <br />
                            <span className="text-blue-600">Smartly</span> with{" "}
                            <span className="text-green-500">MY Spends</span>
                        </h1>

                        <p className="mt-6 text-gray-600 text-lg">
                            Manage your expenses, control budgets, and visualize your spending
                            habits in one powerful dashboard.
                        </p>

                        {/* Buttons */}
                        <div className="mt-8 flex gap-4">
                            <button className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
                                Get Started
                            </button>

                            <button className="px-6 py-3 rounded-lg border border-green-500 text-green-600 font-medium hover:bg-green-50 transition">
                                View Dashboard
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="mt-10 flex gap-8">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800">10K+</h3>
                                <p className="text-sm text-gray-500">Active Users</p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800">₹1Cr+</h3>
                                <p className="text-sm text-gray-500">Expenses Tracked</p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800">99%</h3>
                                <p className="text-sm text-gray-500">Uptime</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-green-400 rounded-2xl blur-2xl opacity-20"></div>
                        <img
                            src={image}
                            alt="Dashboard Preview"
                            className="relative rounded-2xl shadow-xl w-full"
                        />
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default Dashboard;
