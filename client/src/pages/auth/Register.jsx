import { useForm } from "react-hook-form";
import { registerUser } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {

  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      toast.success("Account created successfully 🎉");
      reset();
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-green-600">
          Create Account
        </h2>

        <input
          {...register("name")}
          placeholder="Full Name"
          className="w-full border p-2 mb-4 rounded"
          required
        />

        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-4 rounded"
          required
        />

        <input
          {...register("phone")}
          placeholder="Phone Number"
          className="w-full border p-2 mb-4 rounded"
          required
        />

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Register
        </button>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 font-semibold">
            Login
          </Link>
        </p>
      </form>

    </div>
  );
};

export default Register;
