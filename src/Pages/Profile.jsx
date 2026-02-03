import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const TOKEN = localStorage.getItem("token");

    /* ===== LOGOUT ===== */
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    /* ===== FETCH PROFILE ===== */
    useEffect(() => {
        if (!TOKEN) {
            navigate("/login");
            return;
        }

        const fetchProfile = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_URL}/user/profile`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                });

                if (!res.ok) {
                    throw new Error("Unauthorized");
                }

                const data = await res.json();
                setProfileData(data);
            } catch (error) {
                console.error(error);
                localStorage.removeItem("token");
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [TOKEN, navigate]);

    if (loading) {
        return <p className="p-6 text-gray-500">Loading profile...</p>;
    }

    const { profile, balances, summary } = profileData;

    return (
        <div className="w-full min-h-screen bg-gray-100">

            {/* ===== TOP HEADER ===== */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-md">
                <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">

                    {/* Left: Avatar + Info */}
                    <div className="flex items-center gap-4">
                        {/* Avatar */}
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg uppercase">
                            {profile.name?.charAt(0)}
                        </div>

                        {/* Name & Email */}
                        <div>
                            <h1 className="text-lg font-semibold text-white capitalize leading-tight">
                                {profile.name}
                            </h1>
                            <p className="text-sm text-white/80">
                                {profile.email}
                            </p>
                        </div>
                    </div>

                    {/* Right: Logout */}
                    <button
                        onClick={handleLogout}
                        className="
        px-5 py-2 rounded-xl
        bg-white/20 backdrop-blur-md
        text-white font-medium text-sm
        hover:bg-white/30
        active:scale-95
        transition-all duration-200
      "
                    >
                        Logout
                    </button>

                </div>
            </div>


            {/* ===== MAIN CONTENT ===== */}
            <div className="max-w-7xl mx-auto p-4 space-y-8">

                {/* ===== NET BALANCE ===== */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-6 text-white shadow">
                    <p className="text-sm opacity-80">Net Balance</p>
                    <p className="text-3xl font-bold">
                        ₹{summary.netBalance.toLocaleString()}
                    </p>
                </div>

                {/* ===== MODE BALANCES ===== */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        💳 Mode Balances
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="rounded-2xl p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 shadow">
                            <h3 className="text-lg font-semibold text-emerald-700">CASH</h3>
                            <p className="text-2xl font-bold text-emerald-800">
                                ₹{balances.CASH.toLocaleString()}
                            </p>
                        </div>

                        <div className="rounded-2xl p-6 bg-gradient-to-br from-sky-50 to-sky-100 shadow">
                            <h3 className="text-lg font-semibold text-sky-700">ONLINE</h3>
                            <p className="text-2xl font-bold text-sky-800">
                                ₹{balances.ONLINE.toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>

                {/* ===== SUMMARY ===== */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        📊 Summary
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="rounded-2xl p-6 bg-green-50 shadow">
                            <p className="text-sm text-green-700">Total Income</p>
                            <p className="text-2xl font-bold text-green-800">
                                ₹{summary.totalIncome.toLocaleString()}
                            </p>
                        </div>

                        <div className="rounded-2xl p-6 bg-red-50 shadow">
                            <p className="text-sm text-red-700">Total Expense</p>
                            <p className="text-2xl font-bold text-red-800">
                                ₹{summary.totalExpense.toLocaleString()}
                            </p>
                        </div>

                        <div className="rounded-2xl p-6 bg-indigo-50 shadow">
                            <p className="text-sm text-indigo-700">Net Balance</p>
                            <p className="text-2xl font-bold text-indigo-800">
                                ₹{summary.netBalance.toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Profile;
