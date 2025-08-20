import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        setError(data.error || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-br from-[#f0f4ff] to-[#e6e9ff] p-4 pt-16">
      {/* Logo at the top */}
      <div className="w-[340px] h-[340px] mb-6 -mt-8">
        <img 
          src={logo} 
          alt="Company Logo" 
          className="w-full h-full object-contain block" 
        />
      </div>
      
      {/* Login form below logo */}
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md -mt-8">
        <h2 className="text-2xl font-bold text-[#00005A] text-center mb-6">
          Log in to your account
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 rounded-lg">
            <p className="text-red-600 text-center font-medium text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[#00005A] font-medium mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2.5 border border-[#00005A]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00005A]/50"
              placeholder="Enter your username"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="block text-[#00005A] font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-[#00005A]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00005A]/50 pr-10"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#00005A] hover:text-[#8B000B] focus:outline-none"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-[#00005A] hover:bg-[#00007A] text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
          >
            Log In
          </button>
        </form>

        <div className="mt-4 text-center">
          <a href="#" className="text-[#00005A] hover:text-[#8B000B] text-sm font-medium">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;