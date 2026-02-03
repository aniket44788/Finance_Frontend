import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // assuming react-router-dom v6

export default function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Redirect to dashboard if token exists
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard"); // redirect to dashboard
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
            const res = await fetch(`${import.meta.env.VITE_URL}/user/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok && data.token) {
                localStorage.setItem("token", data.token); // store token
                setMessage("Registration successful ✅ Redirecting...");
                setFormData({ name: "", email: "", phone: "", password: "" });

                setTimeout(() => {
                    navigate("/dashboard"); // redirect after registration
                }, 1000);
            } else {
                setMessage(data.message || "Registration failed ❌");
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
                    Create Account
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
                        <label className="block text-gray-700 font-medium mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
                        />
                    </div>

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
                        <label className="block text-gray-700 font-medium mb-2">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="1234567890"
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
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                <p className="mt-4 text-center text-gray-500 text-sm">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-500 font-medium hover:underline">
                        Login here
                    </a>
                </p>
            </div>
        </div>
    );
}