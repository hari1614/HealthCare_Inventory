import { useState } from "react";
import { useLogin } from "../components/hooks/useLogin";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      console.log(email, password);
    } catch (err) {
      console.log(err);
    }

    // await login(email, password);
    // console.log(email, password);
  };

  return (
    <div className="flex items-center justify-center p-4">
     {/* Collage-style background */}
     <div className="absolute inset-0">
     <div className="absolute inset-0 flex items-center justify-bottom">
          <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-title to-title2 animate-text">RKS</h1>
          <p>Healthcare</p>
        </div>
        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('https://source.unsplash.com/random/1920x1080?abstract')` }}>
          <div className="absolute inset-0 bg-gradient-to-br from-title to-title2 opacity-70"></div>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#3238f2", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#2fa4e7", stopOpacity: 1 }} />
              </linearGradient>
              <linearGradient id="grad2" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: "#00578b", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#80af3b", stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <circle cx="30" cy="30" r="20" fill="url(#grad1)" />
            <circle cx="70" cy="60" r="30" fill="url(#grad2)" />
            <circle cx="120" cy="120" r="25" fill="url(#grad1)" />
            <circle cx="170" cy="80" r="20" fill="url(#grad2)" />
            <circle cx="60" cy="150" r="40" fill="url(#grad1)" />
          </svg>
        </div>
        </div>
      <div className="relative z-10  w-full max-w-sm bg-white rounded-lg shadow-custom p-6 space-y-6 mt-24">
        <h2 className="text-center text-lg font-semibold text-gray-600">
          Login
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400 bg-gray-50 py-2 px-3 transition duration-300 ease-in-out"
              placeholder="example@example.com"
            />
            <small id="emailHelp" className="text-gray-500">
              We'll never share your email with anyone else.
            </small>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400 bg-gray-50 py-2 px-3 transition duration-300 ease-in-out"
              placeholder="••••••••"
            />
            <small id="passwordHelp" className="text-gray-500">
              Your password must be 8-20 characters long.
            </small>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-3 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform ${
                isLoading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:scale-105"
              }`}
              aria-live="polite"
            >
              {isLoading ? "Logging In..." : "Log In"}
            </button>
            {error && <div className="error mt-2 text-red-500">{error}</div>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

