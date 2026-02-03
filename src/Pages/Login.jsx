import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Redirect to dashboard if token exists
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard");
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await fetch(`${import.meta.env.VITE_URL}/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok && data.token) {
                localStorage.setItem("token", data.token); // store token
                setMessage("Login successful ✅ Redirecting...");
                setFormData({ email: "", password: "" });

                setTimeout(() => {
                    navigate("/dashboard");
                }, 1000);
            } else {
                setMessage(data.message || "Login failed ❌");
            }
        } catch (error) {
            setMessage("Server error ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-200 flex items-center justify-center bg-gray-50 p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 space-y-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Welcome Back
                </h2>

                {message && (
                    <p
                        className={`mb-4 text-center font-semibold p-3 rounded-lg ${message.includes("successful") ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                            }`}
                    >
                        {message}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300 disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="mt-4 text-center text-gray-500 text-sm">
                    Don't have an account?{" "}
                    <a href="/register" className="text-blue-500 font-medium hover:underline">
                        Register here
                    </a>
                </p>
            </div>
        </div>
    );
}