import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TransactionSummary from "./TransactionSummary";

function Transaction() {
    const TOKEN = localStorage.getItem("token");
    const isLoggedIn = !!TOKEN;
    const navigate = useNavigate();

    const [addAmount, setAddAmount] = useState("");
    const [addMode, setAddMode] = useState("ONLINE");
    const [addNote, setAddNote] = useState("");

    const [spendAmount, setSpendAmount] = useState("");
    const [spendMode, setSpendMode] = useState("CASH");
    const [category, setCategory] = useState("FOOD");
    const [spendNote, setSpendNote] = useState("");

    const handleAddMoney = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_URL}/user/add-money`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${TOKEN}`,
                },
                body: JSON.stringify({
                    mode: addMode,
                    amount: Number(addAmount),
                    note: addNote,
                }),
            });

            const data = await res.json();
            if (res.ok) {
                alert(data.message || "Money Added Successfully ✅");
            } else {
                alert(data.message || "Add Money Failed ❌");
            }
        } catch (error) {
            console.error(error);
            alert("Server error ❌");
        }
    };

    const handleSpendMoney = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_URL}/user/spend-money`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${TOKEN}`,
                },
                body: JSON.stringify({
                    type: "debit",
                    mode: spendMode,
                    amount: Number(spendAmount),
                    category,
                    note: spendNote,
                }),
            });

            const data = await res.json();
            if (res.ok) {
                alert(data.message || "Money Spent Successfully 💸");
            } else {
                alert(data.message || "Spend Money Failed ❌");
            }
        } catch (error) {
            console.error(error);
            alert("Server error ❌");
        }
    };

    return (
        <div className="w-full bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
            {isLoggedIn ? (
                <div className="max-w-5xl mx-auto text-gray-800">
                    {/* ===== TOP TRANSACTION SECTION ===== */}
                    <h1 className="text-3xl font-bold mb-8 text-center md:text-left">
                        💰 Transactions
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {/* -------- ADD MONEY -------- */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-5">
                            <h2 className="text-xl font-semibold text-green-600 flex items-center gap-2">
                                ➕ Add Balance
                            </h2>

                            <div className="space-y-4">
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                                        <input
                                            type="number"
                                            placeholder="Enter amount"
                                            value={addAmount}
                                            onChange={(e) => setAddAmount(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                                        />
                                    </div>

                                    <div className="w-full sm:w-auto">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Mode</label>
                                        <select
                                            value={addMode}
                                            onChange={(e) => setAddMode(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                                        >
                                            <option value="CASH">CASH</option>
                                            <option value="ONLINE">ONLINE</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Note (optional)</label>
                                    <input
                                        type="text"
                                        placeholder="Add a note"
                                        value={addNote}
                                        onChange={(e) => setAddNote(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                                    />
                                </div>

                                <button
                                    onClick={handleAddMoney}
                                    className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg transition shadow-md"
                                >
                                    Add Money
                                </button>
                            </div>
                        </div>

                        {/* -------- SPEND MONEY -------- */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-5">
                            <h2 className="text-xl font-semibold text-red-500 flex items-center gap-2">
                                💸 Spend Money
                            </h2>

                            <div className="space-y-4">
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                                        <input
                                            type="number"
                                            placeholder="Enter amount"
                                            value={spendAmount}
                                            onChange={(e) => setSpendAmount(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                                        />
                                    </div>

                                    <div className="w-full sm:w-auto">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Mode</label>
                                        <select
                                            value={spendMode}
                                            onChange={(e) => setSpendMode(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                                        >
                                            <option value="CASH">CASH</option>
                                            <option value="ONLINE">ONLINE</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                                    >
                                        <option value="FOOD">FOOD</option>
                                        <option value="TRAVEL">TRAVEL</option>
                                        <option value="SHOPPING">SHOPPING</option>
                                        <option value="RENT">RENT</option>
                                        <option value="BILLS">BILLS</option>
                                        <option value="ENTERTAINMENT">ENTERTAINMENT</option>
                                        <option value="HEALTH">HEALTH</option>
                                        <option value="EDUCATION">EDUCATION</option>
                                        <option value="GROCERIES">GROCERIES</option>
                                        <option value="FUEL">FUEL</option>
                                        <option value="INVESTMENT">INVESTMENT</option>
                                        <option value="OTHER">OTHER</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Note (optional)</label>
                                    <input
                                        type="text"
                                        placeholder="Add a note"
                                        value={spendNote}
                                        onChange={(e) => setSpendNote(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                                    />
                                </div>

                                <button
                                    onClick={handleSpendMoney}
                                    className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-lg transition shadow-md"
                                >
                                    Spend Money
                                </button>
                            </div>
                        </div>
                    </div>

                    <TransactionSummary />
                </div>
            ) : (
                <div className="w-full h-200 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
                    <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">

                        {/* Icon */}
                        <div className="text-6xl mb-4 text-yellow-500">🔒</div>

                        {/* Title */}
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            Please Login to Access
                        </h2>

                        {/* Message */}
                        <p className="text-gray-500 mb-6">
                            You need to login to view this page.
                        </p>

                        {/* Login Button */}
                        <button
                            onClick={() => navigate("/login")}
                            className="mt-4 w-full bg-yellow-500 text-white py-3 rounded-xl font-semibold hover:bg-yellow-600 transition-colors"
                        >
                            Go to Login
                        </button>
                    </div>
                </div>


            )}
        </div>
    );
}

export default Transaction;