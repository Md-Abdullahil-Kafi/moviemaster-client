import React, { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { AuthContext } from "../components/providers/AuthProvider";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";

const LogIn = () => {
  const { loginWithGoogle, loginUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const location = useLocation();
  const form = location.state || "/";

  // Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      toast.success("Login successful!");
      navigate(form);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      const result = await loginWithGoogle();
      toast.success(`Welcome ${result.user.displayName}!`);
      navigate(form);
    } catch (error) {
      console.error(error);
      toast.error("Google Sign-In failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-300 text-base-content">
      <div className="relative w-full max-w-lg">
        <div className="absolute -top-10 -left-10 w-56 h-56 bg-linear-to-tr from-indigo-400 to-purple-500 rounded-full opacity-30 blur-3xl" />
        <div className="absolute -bottom-12 -right-10 w-64 h-64 bg-linear-to-br from-pink-400 to-yellow-300 rounded-full opacity-30 blur-3xl" />

        <div className="relative backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border bg-transparent">
          <div className="p-8 md:p-12">
            <h1 className="text-3xl font-extrabold mb-4 text-base-content">
              Login
            </h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <label className="block">
                <span>Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="mt-2 block w-full rounded-xl border px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </label>

              <label className="block relative">
                <span>Password</span>
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="mt-2 block w-full rounded-xl border px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <span
                  onClick={() => {
                    setShow(!show);
                  }}
                  className="absolute right-3 top-12 cursor-pointer "
                >
                  {show ? <IoEyeOff></IoEyeOff> : <FaEye></FaEye>}
                </span>
              </label>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-linear-to-r from-indigo-600 to-violet-500 text-white font-semibold text-lg shadow-lg"
              >
                Login
              </button>
            </form>

            <div className="flex items-center gap-3 my-4">
              <hr className="flex-1 border-gray-400" />
              <span className="text-xs text-base-content">or</span>
              <hr className="flex-1 border-gray-400" />
            </div>

            <button
              onClick={handleGoogleLogin}
              className="btn btn-ghost w-full py-6 rounded-xl border border-gray-200 flex items-center justify-center gap-3 text-sm font-medium shadow-sm"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google icon"
                className="w-5 h-5"
              />
              <span>Continue with Google</span>
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Don’t have an account?{" "}
              <NavLink
                to="/register"
                state={form}
                className="text-indigo-600 hover:text-indigo-400 underline"
              >
                Register
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
