import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function TransactionSummary() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    // Filter states
    const [filterType, setFilterType] = useState('');
    const [filterMode, setFilterMode] = useState('');
    const [filterCategory, setFilterCategory] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Login to See Transaction.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${import.meta.env.VITE_URL}/transaction`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const result = await response.json();
                setData(result);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <div className="text-lg font-semibold text-gray-600">Loading your transactions...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center">

                    {/* Icon */}
                    <div className="mx-auto w-20 h-20 flex items-center justify-center bg-yellow-100 rounded-full mb-6">
                        <span className="text-5xl text-yellow-600">🔒</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-yellow-600 mb-2">
                        Please Login
                    </h2>

                    {/* Message */}
                    <p className="text-gray-600 mb-6">
                        You need to login to access this page.
                    </p>

                    {/* Login Button */}
                    <button
                        onClick={() => navigate("/login")}
                        className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg transition"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
                    <div className="text-5xl mb-4">📭</div>
                    <div className="text-lg font-semibold text-gray-600">No data available</div>
                </div>
            </div>
        );
    }

    const { totalTransactions, summary, modeBalance, categorySummary, transactions } = data;

    // Filter transactions
    const filteredTransactions = transactions?.filter((tx) => {
        return (
            (!filterType || tx.type === filterType) &&
            (!filterMode || tx.mode === filterMode) &&
            (!filterCategory || tx.category === filterCategory)
        );
    }) || [];

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // Reset filters function
    const resetFilters = () => {
        setFilterType('');
        setFilterMode('');
        setFilterCategory('');
    };

    const activeFiltersCount = [filterType, filterMode, filterCategory].filter(Boolean).length;

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                {/* <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2 text-center lg:text-left">
                        📊 Transaction Dashboard
                    </h1>
                    <p className="text-gray-600 text-center lg:text-left">
                        Monitor your financial activity at a glance
                    </p>
                </div> */}

                {/*          
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
                   
                    <div className="rounded-xl lg:rounded-2xl p-5 lg:p-6 bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-sm lg:text-base font-semibold text-blue-100">
                                Total Transactions
                            </h2>
                            <span className="text-2xl">📝</span>
                        </div>
                        <p className="text-3xl lg:text-4xl font-bold text-white">
                            {totalTransactions}
                        </p>
                    </div>

                    <div className="rounded-xl lg:rounded-2xl p-5 lg:p-6 bg-gradient-to-br from-green-500 to-green-600 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-sm lg:text-base font-semibold text-green-100">
                                Total Income
                            </h2>
                            <span className="text-2xl">💰</span>
                        </div>
                        <p className="text-2xl lg:text-3xl font-bold text-white">
                            ₹{summary.totalIncome.toLocaleString()}
                        </p>
                    </div>

                    <div className="rounded-xl lg:rounded-2xl p-5 lg:p-6 bg-gradient-to-br from-red-500 to-red-600 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-sm lg:text-base font-semibold text-red-100">
                                Total Expense
                            </h2>
                            <span className="text-2xl">💸</span>
                        </div>
                        <p className="text-2xl lg:text-3xl font-bold text-white">
                            ₹{summary.totalExpense.toLocaleString()}
                        </p>
                    </div>

                    <div className="rounded-xl lg:rounded-2xl p-5 lg:p-6 bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-sm lg:text-base font-semibold text-purple-100">
                                Net Balance
                            </h2>
                            <span className="text-2xl">💵</span>
                        </div>
                        <p className="text-2xl lg:text-3xl font-bold text-white">
                            ₹{summary.netBalance.toLocaleString()}
                        </p>
                    </div>
                </div> */}

                {/* Mode Balance Section */}
                <div className="mb-8">
                    <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 flex items-center">
                        <span className="mr-2">💳</span> Payment Mode Balances
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                        {Object.entries(modeBalance).map(([mode, balance]) => {
                            const isCash = mode === "CASH";

                            return (
                                <div
                                    key={mode}
                                    className={`rounded-xl lg:rounded-2xl p-5 lg:p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1
                                        ${isCash
                                            ? "bg-gradient-to-br from-emerald-400 to-emerald-500"
                                            : "bg-gradient-to-br from-sky-400 to-sky-500"
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-lg lg:text-xl font-bold text-Black flex items-center">
                                            <span className="mr-2">{isCash ? "💵" : "🏦"}</span>
                                            {mode}
                                        </h3>
                                        <span className="text-xs px-3 py-1 rounded-full font-semibold bg-black bg-opacity-30 text-white">
                                            {isCash ? "Wallet" : "Bank"}
                                        </span>
                                    </div>
                                    <p className="text-2xl lg:text-3xl font-bold text-white">
                                        ₹{balance.toLocaleString()}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Transactions List Section */}
                <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 lg:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                        <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-3 sm:mb-0 flex items-center">
                            <span className="mr-2">📜</span> Transaction History
                            {activeFiltersCount > 0 && (
                                <span className="ml-3 text-sm font-normal text-gray-500">
                                    ({filteredTransactions.length} results)
                                </span>
                            )}
                        </h2>
                        {activeFiltersCount > 0 && (
                            <button
                                onClick={resetFilters}
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm font-semibold transition-colors flex items-center"
                            >
                                <span className="mr-1">✕</span> Clear Filters
                            </button>
                        )}
                    </div>

                    {/* Filters */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 mb-6">
                        {/* Type Filter */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Transaction Type
                            </label>
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all"
                            >
                                <option value="">All Types</option>
                                <option value="credit">💰 Credit</option>
                                <option value="debit">💸 Debit</option>
                            </select>
                        </div>

                        {/* Mode Filter */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Payment Mode
                            </label>
                            <select
                                value={filterMode}
                                onChange={(e) => setFilterMode(e.target.value)}
                                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition-all"
                            >
                                <option value="">All Modes</option>
                                <option value="CASH">💵 Cash</option>
                                <option value="ONLINE">🏦 Online</option>
                            </select>
                        </div>

                        {/* Category Filter */}
                        <div className="sm:col-span-2 lg:col-span-1">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none transition-all"
                            >
                                <option value="">All Categories</option>
                                <option value="FOOD">🍔 Food</option>
                                <option value="TRAVEL">✈️ Travel</option>
                                <option value="SHOPPING">🛍️ Shopping</option>
                                <option value="RENT">🏠 Rent</option>
                                <option value="BILLS">📄 Bills</option>
                                <option value="ENTERTAINMENT">🎬 Entertainment</option>
                                <option value="OTHER">📦 Other</option>
                            </select>
                        </div>
                    </div>

                    {/* Desktop Table View */}
                    <div className="hidden lg:block overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
                                <tr>
                                    {["Type", "Mode", "Amount", "Category", "Note", "Date"].map((head) => (
                                        <th
                                            key={head}
                                            className="px-6 py-4 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider"
                                        >
                                            {head}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredTransactions.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center">
                                            <div className="text-5xl mb-3">🔍</div>
                                            <div className="text-gray-500 font-semibold">No transactions found</div>
                                            <div className="text-sm text-gray-400 mt-1">Try adjusting your filters</div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredTransactions.map((tx, index) => {
                                        const isCredit = tx.type === "credit";
                                        return (
                                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <span

                                                    >
                                                        {isCredit ? "💰" : "💸"} {tx.type.toUpperCase()}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span

                                                    >
                                                        {tx.mode}
                                                    </span>
                                                </td>
                                                <td className={`px-6 py-4 font-bold text-lg ${isCredit ? "text-green-600" : "text-red-600"}`}>
                                                    ₹{tx.amount.toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-gray-700 font-medium">
                                                        {tx.category || "N/A"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                                                    {tx.note || "—"}
                                                </td>
                                                <td className="px-6 py-4 text-gray-500 text-sm">
                                                    {formatDate(tx.date)}
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="lg:hidden space-y-4">
                        {filteredTransactions.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-5xl mb-3">🔍</div>
                                <div className="text-gray-500 font-semibold">No transactions found</div>
                                <div className="text-sm text-gray-400 mt-1">Try adjusting your filters</div>
                            </div>
                        ) : (
                            filteredTransactions.map((tx, index) => {
                                const isCredit = tx.type === "credit";
                                return (
                                    <div
                                        key={index}
                                        className={`rounded-lg border-l-4 p-4 shadow-md ${isCredit
                                            ? "bg-green-50 border-green-500"
                                            : "bg-red-50 border-red-500"
                                            }`}
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className={`px-3 py-1 text-xs font-bold rounded-full ${isCredit
                                                        ? "bg-green-200 text-green-800"
                                                        : "bg-red-200 text-red-800"
                                                        }`}
                                                >
                                                    {isCredit ? "💰" : "💸"} {tx.type.toUpperCase()}
                                                </span>
                                                <span
                                                    className={`px-3 py-1 text-xs font-bold rounded-full ${tx.mode === "CASH"
                                                        ? "bg-emerald-200 text-emerald-800"
                                                        : "bg-sky-200 text-sky-800"
                                                        }`}
                                                >
                                                    {tx.mode === "CASH" ? "💵" : "🏦"} {tx.mode}
                                                </span>
                                            </div>
                                            <div className={`text-xl font-bold ${isCredit ? "text-green-700" : "text-red-700"}`}>
                                                ₹{tx.amount.toLocaleString()}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600 font-semibold">Category:</span>
                                                <span className="text-gray-800 font-medium">{tx.category || "N/A"}</span>
                                            </div>
                                            {tx.note && (
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600 font-semibold">Note:</span>
                                                    <span className="text-gray-800 text-right flex-1 ml-2">{tx.note}</span>
                                                </div>
                                            )}
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600 font-semibold">Date:</span>
                                                <span className="text-gray-500">{formatDate(tx.date)}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TransactionSummary;