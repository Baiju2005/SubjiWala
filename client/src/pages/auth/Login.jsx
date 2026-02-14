import { useState } from "react";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(form);

      // store user in context
      login(res.data);

      // show success toast
      toast.success(`Welcome back, ${res.data.name} 👋`);

      // navigate AFTER toast (important)
      setTimeout(() => {
        navigate("/");
      }, 900);

    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-green-600">
          SabjiWala Login
        </h2>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={handleChange}
          required
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={handleChange}
          required
        />

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Login
        </button>

        {/* Register Link */}
        <p className="text-sm mt-4 text-center">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-green-600 font-semibold hover:underline"
          >
            Create Account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
