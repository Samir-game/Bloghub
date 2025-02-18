import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:8000/api/user/register", {
        userName: data.userName,
        email: data.email,
        password: data.password,
      });

      if (response.status === 200) {
        toast.success("Account Created Successfully!", { autoClose: 1500 });
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error("Something went wrong. Try again.");
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "Registration failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-300 to-yellow-200 px-6">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Sign Up</h2>
        <p className="text-gray-500 text-center mb-6">Join our community today!</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              {...register("userName", { required: "Username is required" })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.userName && <p className="text-red-500 text-sm">{errors.userName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "At least 6 characters" } })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-xl hover:bg-indigo-700 transition-all"
          >
            {isSubmitting ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
