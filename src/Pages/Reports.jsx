import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
} from 'recharts';

function Reports() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No token found');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${import.meta.env.VITE_URL}/transaction/monthly?month=2&year=2026`, {
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
            <div className="w-full min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
                    <div className="text-xl font-semibold text-gray-700">Loading Monthly Data...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-200 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
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
        );
    }


    if (!data) {
        return (
            <div className="w-full min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
                <div className="text-xl font-semibold text-gray-600">No data available</div>
            </div>
        );
    }

    const { period, summary, charts, insights } = data;

    // Prepare data for charts
    const dailyExpenseData = charts.dailyExpense;
    const categoryExpenseData = Object.entries(charts.categoryExpense).map(([name, value]) => ({ name, value }));
    const modeExpenseData = Object.entries(charts.modeExpense).map(([name, value]) => ({ name, value }));

    // Enhanced color palettes
    const CATEGORY_COLORS = ['#6366F1', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#3B82F6', '#EF4444', '#14B8A6'];
    const MODE_COLORS = ['#6366F1', '#8B5CF6', '#EC4899', '#F59E0B'];

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    };

    // Custom tooltip for charts
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white px-4 py-3 rounded-xl shadow-lg border border-gray-200">
                    <p className="font-semibold text-gray-800">{label}</p>
                    <p className="text-indigo-600 font-bold">₹{payload[0].value.toLocaleString()}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full  min-h-screen py-6 px-4 sm:py-8 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 sm:mb-10">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center sm:justify-start gap-3">
                        <span className="text-3xl sm:text-4xl">📊</span>
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Financial Overview
                        </span>
                    </h1>
                    <p className="text-base sm:text-lg text-gray-600 text-center sm:text-left font-medium">
                        {formatDate(period.from)}
                    </p>
                </div>

                {/* Summary Section */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-green-200">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-base sm:text-lg font-semibold text-green-800">Total Income</h2>
                            <span className="text-3xl">💰</span>
                        </div>
                        <p className="text-2xl sm:text-3xl font-bold text-green-600">₹{summary.totalIncome.toLocaleString()}</p>
                        <div className="mt-2 text-xs sm:text-sm text-green-700">Revenue earned</div>
                    </div>

                    <div className="bg-gradient-to-br from-red-50 to-rose-100 rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-red-200">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-base sm:text-lg font-semibold text-red-800">Total Expense</h2>
                            <span className="text-3xl">💸</span>
                        </div>
                        <p className="text-2xl sm:text-3xl font-bold text-red-600">₹{summary.totalExpense.toLocaleString()}</p>
                        <div className="mt-2 text-xs sm:text-sm text-red-700">Money spent</div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-blue-200">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-base sm:text-lg font-semibold text-blue-800">Savings</h2>
                            <span className="text-3xl">🏦</span>
                        </div>
                        <p className="text-2xl sm:text-3xl font-bold text-blue-600">₹{summary.savings.toLocaleString()}</p>
                        <div className="mt-2 text-xs sm:text-sm text-blue-700">
                            {summary.totalIncome > 0 ? `${((summary.savings / summary.totalIncome) * 100).toFixed(1)}% saved` : 'No income'}
                        </div>
                    </div>
                </div>

                {/* Insights Section */}
                <div className="mb-8 sm:mb-10">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
                        <span>💡</span>
                        <span>Key Insights</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 border-l-4 border-red-500">
                            <h3 className="text-sm sm:text-base font-semibold text-gray-600 mb-3">🔥 Highest Spending Day</h3>
                            <p className="text-lg sm:text-xl font-bold text-red-600 mb-1">
                                {insights.highestSpendingDay?.date}
                            </p>
                            <p className="text-2xl sm:text-3xl font-bold text-gray-800">
                                ₹{insights.highestSpendingDay?.amount.toLocaleString()}
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 border-l-4 border-indigo-500">
                            <h3 className="text-sm sm:text-base font-semibold text-gray-600 mb-3">🎯 Top Spending Category</h3>
                            <p className="text-lg sm:text-xl font-bold text-indigo-600 mb-1">
                                {insights.topCategory?.category}
                            </p>
                            <p className="text-2xl sm:text-3xl font-bold text-gray-800">
                                ₹{insights.topCategory?.amount.toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10">
                    {/* Daily Expense Chart */}
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-4 sm:p-6 border border-gray-100">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
                            <span>📈</span>
                            <span>Daily Expenses Trend</span>
                        </h2>
                        <ResponsiveContainer width="100%" height={250} className="sm:h-80">
                            <LineChart data={dailyExpenseData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                                <defs>
                                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0.1} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                <XAxis
                                    dataKey="day"
                                    tick={{ fontSize: 12 }}
                                    stroke="#6B7280"
                                />
                                <YAxis
                                    tick={{ fontSize: 12 }}
                                    stroke="#6B7280"
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Line
                                    type="monotone"
                                    dataKey="amount"
                                    stroke="#6366F1"
                                    strokeWidth={3}
                                    dot={{ fill: '#6366F1', strokeWidth: 2, r: 4 }}
                                    activeDot={{ r: 6, fill: '#4F46E5' }}
                                    fill="url(#colorAmount)"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Category Expense Pie */}
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-4 sm:p-6 border border-gray-100">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
                            <span>🎨</span>
                            <span>Category Distribution</span>
                        </h2>
                        <ResponsiveContainer width="100%" height={250} className="sm:h-80">
                            <PieChart>
                                <Pie
                                    data={categoryExpenseData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={window.innerWidth < 640 ? 70 : 90}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {categoryExpenseData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
                                            className="hover:opacity-80 transition-opacity"
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value) => `₹${value.toLocaleString()}`}
                                    contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Mode Expense Bar */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-4 sm:p-6 mb-8 sm:mb-10 border border-gray-100">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
                        <span>💳</span>
                        <span>Payment Mode Analysis</span>
                    </h2>
                    <ResponsiveContainer width="100%" height={250} className="sm:h-80">
                        <BarChart data={modeExpenseData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                            <defs>
                                <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.9} />
                                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.6} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                            <XAxis
                                dataKey="name"
                                tick={{ fontSize: 12 }}
                                stroke="#6B7280"
                            />
                            <YAxis
                                tick={{ fontSize: 12 }}
                                stroke="#6B7280"
                            />
                            <Tooltip
                                formatter={(value) => `₹${value.toLocaleString()}`}
                                contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB' }}
                            />
                            <Bar
                                dataKey="value"
                                fill="url(#colorBar)"
                                radius={[8, 8, 0, 0]}
                                className="hover:opacity-80 transition-opacity"
                            >
                                {modeExpenseData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={MODE_COLORS[index % MODE_COLORS.length]}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Footer */}
                <div className="text-center text-sm text-gray-500 mt-8">
                    <p>Last updated: {new Date().toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
}

export default Reports;