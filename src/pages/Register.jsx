import React, { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { AuthContext } from "../components/providers/AuthProvider";
import { IoEyeOff } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";

const Register = () => {
  const { registerUser, loginWithGoogle } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const form = location.state || "/";

  // Validation helpers
  const hasUppercase = (s) => /[A-Z]/.test(s);
  const hasLowercase = (s) => /[a-z]/.test(s);
  const hasMinLength = (s) => s.length >= 6;
  const isValidEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

  const passwordErrors = () => {
    const errs = [];
    if (!hasUppercase(password)) errs.push("At least one uppercase letter");
    if (!hasLowercase(password)) errs.push("At least one lowercase letter");
    if (!hasMinLength(password)) errs.push("At least 6 characters");
    return errs;
  };

  const formErrors = () => {
    const errs = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!isValidEmail(email)) errs.email = "Enter a valid email";
    const pwErrs = passwordErrors();
    if (pwErrs.length) errs.password = pwErrs;
    return errs;
  };

  const errors = formErrors();
  const isFormValid = Object.keys(errors).length === 0;

  // Register handler
  const handleRegister = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, photo: true, password: true });

    if (!isFormValid) return;
    setLoading(true);

    try {
      const fallbackPhoto =
        photo ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          name
        )}&background=random`;

      const result = await registerUser(email, password, name, fallbackPhoto);

      // registerUser in provider may return { user } or directly userCredential.user — handle both
      const createdUser = result?.user || result || null;

      console.log("register result:", result);
      console.log("resolved createdUser:", createdUser);

      if (!createdUser) {
        console.warn(
          "registerUser did not return user object. Check AuthProvider implementation."
        );
      }

      toast.success(`Welcome, ${name}! Account created successfully.`);
      navigate(form);
    } catch (error) {
      console.error("Register error:", error);
      toast.error(error?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      toast.success("Logged in with Google!");
      navigate(form);
    } catch (error) {
      console.error("Google login error:", error);
      toast.error(error?.message || "Google login failed.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-300 p-6">
      <div className="w-full max-w-md">
        <div className="backdrop-blur rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-extrabold text-base-content mb-2">
              Register
            </h1>
            <p className="text-sm text-gray-400 mb-6">
              Create your account — fast and secure
            </p>

            <form onSubmit={handleRegister} className="space-y-4">
              {/* Name */}
              <label className="block">
                <span className="text-sm text-base-content">Name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                  placeholder="Your full name"
                  className={`mt-2 block w-full rounded-lg border px-4 py-3 shadow-sm focus:outline-none focus:ring-2 ${
                    touched.name && !name.trim()
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-200 focus:ring-indigo-200"
                  }`}
                />
                {touched.name && !name.trim() && (
                  <p className="text-xs text-red-600 mt-1">Name is required.</p>
                )}
              </label>

              {/* Email */}
              <label className="block">
                <span className="text-sm text-base-content">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  placeholder="you@example.com"
                  className={`mt-2 block w-full rounded-lg border px-4 py-3 shadow-sm focus:outline-none focus:ring-2 ${
                    touched.email && !isValidEmail(email)
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-200 focus:ring-indigo-200"
                  }`}
                />
                {touched.email && !isValidEmail(email) && (
                  <p className="text-xs text-red-600 mt-1">
                    Please enter a valid email address.
                  </p>
                )}
              </label>

              {/* Photo URL */}
              <label className="block">
                <span className="text-sm text-base-content">
                  Photo URL (optional)
                </span>
                <input
                  type="url"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </label>

              {/* Password */}
              <label className="block relative">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-base-content">Password</span>
                  <span className="text-xs text-base-content">
                    Must include uppercase & lowercase, min 6
                  </span>
                </div>
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                  placeholder="Create a strong password"
                  className={`mt-2 block w-full rounded-lg border px-4 py-3 shadow-sm focus:outline-none focus:ring-2 ${
                    touched.password && passwordErrors().length
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-200 focus:ring-indigo-200"
                  }`}
                />
                <span
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-12 cursor-pointer"
                >
                  {show ? <IoEyeOff /> : <FaEye />}
                </span>

                <ul className="mt-2 text-xs space-y-1">
                  <li
                    className={`${
                      hasUppercase(password)
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  >
                    ✔ At least one uppercase letter
                  </li>
                  <li
                    className={`${
                      hasLowercase(password)
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  >
                    ✔ At least one lowercase letter
                  </li>
                  <li
                    className={`${
                      hasMinLength(password)
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  >
                    ✔ Minimum 6 characters
                  </li>
                </ul>
              </label>

              {/* Submit */}
              <button
                type="submit"
                className={`w-full py-3 rounded-lg text-white font-semibold ${
                  isFormValid
                    ? "bg-linear-to-r from-indigo-600 to-violet-500 shadow-lg"
                    : "bg-gray-700 cursor-not-allowed"
                }`}
                disabled={!isFormValid}
              >
                Register
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 my-1">
                <hr className="flex-1 border-gray-400" />
                <span className="text-xs text-base-content">or</span>
                <hr className="flex-1 border-gray-400" />
              </div>

              {/* Google Login */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="btn btn-ghost w-full py-6 rounded-lg border border-gray-200 flex items-center justify-center gap-3 text-sm font-medium shadow-sm"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google icon"
                  className="w-5 h-5"
                />
                <span className="text-base-content">Continue with Google</span>
              </button>

              {/* Login Redirect */}
              <p className="text-center text-sm font-semibold text-base-content mt-4">
                Already have an account?{" "}
                <NavLink
                  to="/login"
                  className="text-blue-500 underline hover:text-indigo-400"
                >
                  Login
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
