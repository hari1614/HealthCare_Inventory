import { useState } from "react";
import { useLogin } from "../components/hooks/useLogin";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
    console.log(email, password);
  };

  return (
    <div className="flex items-center justify-center p-4 bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-custom p-6 space-y-6 mt-12">
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
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-500 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Log In
            </button>
            {error && <div className="error mt-2 text-red-500">{error}</div>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

