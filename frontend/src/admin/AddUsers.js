import { useState, useEffect } from "react";
import { useAddUser } from "../components/hooks/useAddUser";


const AddUsers = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false); // New state for the checkbox
  const [subAdmin, setSubAdmin] = useState(false); // New state for the checkbox
  const [designation, setDesignation] = useState("");
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [errorMsg, setErrorMsg] = useState("");
  const { addUser, error, isLoading, successMsg } = useAddUser();
  const [isSuccess, setIsSuccess] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addUser(name, designation, email, password, admin, subAdmin);
    console.log(name, designation, email, password, admin, subAdmin);
  };

  useEffect(() => {
    if (successMsg) {
      setIsSuccess(true);
      const timer = setTimeout(() => {
        setIsSuccess(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [successMsg]);

  const handleModalClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (error) {
      setErrorMsg(error);
      const timer = setTimeout(() => {
        setErrorMsg("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="flex items-center justify-center p-4 mt-4 bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-custom p-6 space-y-6">
        <h2 className="text-center text-lg font-semibold text-gray-600 mb-4">
          Add new user
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400 bg-gray-50 py-2 px-3 transition duration-300 ease-in-out"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label
              htmlFor="designation"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Designation
            </label>
            <input
              id="designation"
              name="designation"
              type="text"
              autoComplete="text"
              required
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400 bg-gray-50 py-2 px-3 transition duration-300 ease-in-out"
              placeholder="Software Engineer"
            />
          </div>

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
            <label
              htmlFor="admin"
              className="flex items-center text-sm font-medium text-gray-700 mb-1"
            >
              <input
                id="admin"
                name="admin"
                type="checkbox"
                checked={admin}
                onChange={(e) => setAdmin(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2">Super admin</span>
            </label>
          </div>
          <div>
            <label
              htmlFor="admin"
              className="flex items-center text-sm font-medium text-gray-700 mb-1"
            >
              <input
                id="subAdmin"
                name="subAdmin"
                type="checkbox"
                checked={subAdmin}
                onChange={(e) => setSubAdmin(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2">Admin</span>
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-500 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Add user
            </button>
            <div className="flex justify-center">
              {errorMsg && (
                <div className="error mt-4 w-52 px-4 py-2 rounded-md text-xs text-center border bg-red-100 text-red-800 border-red-300">
                  {errorMsg}
                </div>
              )}

              {isSuccess && (
                <div className="success mt-4 w-52 px-4 py-2 rounded-md text-xs text-center border bg-green-100 text-green-800 border-green-300 ">
                  {successMsg}
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUsers;
