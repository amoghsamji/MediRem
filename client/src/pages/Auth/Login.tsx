import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import { loginUser } from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await loginUser(formData);

            login(response.token);

            toast.success("Login successful!");

            navigate("/dashboard");

        } catch (error: any) {

            toast.error(
                error.response?.data?.message ||
                "Login failed"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center">

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">

                <h1 className="text-3xl font-bold text-center mb-2">
                    Welcome Back 👋
                </h1>

                <p className="text-center text-gray-500 mb-8">
                    Login to continue to MediReminder
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>

                        <label className="font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border rounded-xl p-3 mt-2"
                            placeholder="john@gmail.com"
                            required
                        />

                    </div>

                    <div>

                        <label className="font-medium">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border rounded-xl p-3 mt-2"
                            placeholder="••••••••"
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                <p className="text-center mt-6 text-gray-500">

                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="text-blue-600 font-medium"
                    >
                        Register
                    </Link>

                </p>

            </div>

        </div>
    );
};

export default Login;