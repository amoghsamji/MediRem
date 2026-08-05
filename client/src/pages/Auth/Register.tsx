import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { registerUser } from "../../services/auth.service";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
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

            await registerUser(formData);

            toast.success("Account created successfully!");

            navigate("/login");

        } catch (error: any) {

            toast.error(
                error.response?.data?.message ||
                "Registration failed"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center">

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">

                <h1 className="text-3xl font-bold text-center mb-2">
                    Create Account
                </h1>

                <p className="text-center text-gray-500 mb-8">
                    Join MediReminder today
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>
                        <label className="font-medium">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full border rounded-xl p-3 mt-2"
                            required
                        />
                    </div>

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
                            required
                        />
                    </div>

                    <div>
                        <label className="font-medium">
                            Phone
                        </label>

                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full border rounded-xl p-3 mt-2"
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
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
                    >
                        {loading
                            ? "Creating Account..."
                            : "Register"}
                    </button>

                </form>

                <p className="text-center mt-6 text-gray-500">

                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="text-blue-600 font-medium"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
};

export default Register;