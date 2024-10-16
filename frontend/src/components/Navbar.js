//updated on 29-08-24, medium screen responsiveness added
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLogout } from "./hooks/useLogout";
import { useAuthContext } from "./hooks/useAuthContext";
import { useProductContext } from "./hooks/useProductContext";
import useFetch from "./hooks/useFetch";
import LowStockAlert from "./reusable/LowStockAlert";
import LogoutDialog from "./reusable/LogoutDialog";
import Tooltip from "./reusable/Tooltip";
import {
  faBars,
  faTimes,
  faUser,
  faPlus,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const navigate = useNavigate();
  const [isNavDialogOpen, setIsNavDialogOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false); // State for logout dialog visibility
  const [logoutSuccess, setLogoutSuccess] = useState(false); // State for logout success message
  const [lowStockCount, setLowStockCount] = useState(0);
  const [showNotification, setShowNotification] = useState(false); // State for showing the custom notification
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const { products, dispatch } = useProductContext();

  useFetch(user, "All Products", dispatch);

  useEffect(() => {
    if (products) {
      const count = products.filter((product) => {
        // Ensure product.stock is defined and check for general stock levels and kg types
        const isLowStock = product.stock <= 10;
        const isKgTypeLowStock =
          typeof product.stock === "string" &&
          product.stock.toLowerCase().includes("kg") &&
          parseFloat(product.stock) <= 5;

        return isLowStock || isKgTypeLowStock;
      }).length;

      setLowStockCount(count);
    }
  }, [products]);

  useEffect(() => {
    if (lowStockCount > 0) {
      setShowNotification(true);
    }
  }, [lowStockCount]);

  const handleClick = () => {
    setIsNavDialogOpen(!isNavDialogOpen);
    setSidebarOpen(!isSidebarOpen);
  };

  const closeNavDialog = () => {
    setIsNavDialogOpen(false);
  };

  const openLogoutDialog = () => {
    setIsLogoutDialogOpen(true);
  };

  const confirmLogout = () => {
    logout();
    setIsLogoutDialogOpen(false);
    setLogoutSuccess(true);
    setTimeout(() => setLogoutSuccess(false), 3000);
  };

  const cancelLogout = () => {
    setIsLogoutDialogOpen(false);
  };

  const clickEvent = () => {
    navigate("/");
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      <nav className="sticky top-0 z-50 p-3 flex flex-wrap bg-white justify-between items-center shadow-md">
        <a
          href="#"
          id="brand"
          className="flex gap-2 items-center mx-auto md:mx-0"
        >
          <span className="text-lg font-bold font-body text-title2">
            RKS
            <span className="ml-2 font-bold font-body text-title">
              HealthCare
            </span>
          </span>
        </a>

        <div id="nav-menu" className="hidden md:flex gap-12 flex-wrap">
          {user && (
            <Link
              to="/"
              className="text-gray-700 transition hover:text-sea focus:outline-none focus:ring-sea focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Home
            </Link>
          )}

          {user && !user?.subAdmin && (
            <Link
              to="/forms"
              className="text-gray-700 transition hover:text-sea focus:outline-none focus:ring-sea focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Add new product
            </Link>
          )}

          {user && (
            <Link
              to="/notification"
              className="text-gray-700 transition hover:text-sea focus:outline-none focus:ring-sea focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Notification
              {user && lowStockCount > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 ms-2 text-xs font-semibold text-white bg-sea rounded-full">
                  {lowStockCount}
                </span>
              )}
            </Link>
          )}

          {user && (
            <Link
              to="/stocks"
              className="text-gray-700 transition hover:text-sea focus:outline-none focus:ring-sea focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Stocks
            </Link>
          )}

          {user && (
            <Link
              to="/billing"
              className="text-gray-700 transition hover:text-sea focus:outline-none focus:ring-sea focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Billing
            </Link>
          )}

          {user && (
            <div className="flex flex-col items-start text-xs text-gray-600 font-semibold">
              <h1 className="text-md text-gray-700 font-semibold">
                Welcome, {user ? user.name : "Guest"}!
              </h1>
              {user.admin ? (
                <p>You have Super Admin access.</p>
              ) : user.subAdmin ? (
                <p>You have Sub Admin access.</p>
              ) : (
                <p>You have regular user access.</p>
              )}
            </div>
          )}
        </div>

        <div className="hidden md:flex gap-2 items-center">
          {user && (
            <Link
              to="/profile"
              className="bg-sea hover:bg-hover1 text-white font-medium text-sm shadow-xl hover:shadow-lg py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
            >
              Profile
              <span>
                <FontAwesomeIcon className="ml-2" icon={faUser} />
              </span>
            </Link>
          )}

          {user?.admin && (
            <Link
              to="/addusers"
              className="bg-sea hover:bg-hover1 text-white font-medium text-sm shadow-xl hover:shadow-lg py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
            >
              Add
              <span>
                <FontAwesomeIcon className="ml-2" icon={faPlus} />
              </span>
            </Link>
          )}

          {!user && (
            <Link
              to="/login"
              className="bg-gray-500 hover:bg-gray-600 text-white font-medium text-sm shadow-xl hover:shadow-lg py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
            >
              Login
              <span>
                <FontAwesomeIcon className="ml-2" icon={faUser} />
              </span>
            </Link>
          )}

          {user && (
            <button
              onClick={openLogoutDialog}
              className="bg-gray-500 hover:bg-gray-600 text-white font-medium text-sm shadow-xl hover:shadow-lg py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
            >
              Log out
              <span>
                <FontAwesomeIcon className="ml-2" icon={faArrowRightFromBracket} />
              </span>
            </button>
          )}
        </div>

        <button className="p-2 md:hidden" onClick={handleClick}>
          <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
        </button>

        {/* Sidebar for small screens */}
        <div
          className={`fixed inset-0 bg-white transition-transform transform ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          } p-3 z-50`}
          style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
        >
          <div className="shadow-md flex justify-between items-center mb-6">
            <a href="#" className="flex gap-2 items-center mx-auto md:mx-0">
              <span className="text-lg font-bold font-body text-title2">
                RKS
                <span className="ml-2 font-bold font-body text-title">
                  HealthCare
                </span>
              </span>
            </a>
            <button className="p-2" onClick={handleClick}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          <div className="space-y-4">
            <Link
              to="/"
              className="font-medium block p-3 transform transition duration-500 hover:scale-100 hover:shadow-lg hover:bg-gray-300 rounded-lg"
              onClick={closeSidebar}
            >
              Home
            </Link>
            <Link
              to="/forms"
              className="font-medium block p-3 transform transition duration-500 hover:scale-100 hover:shadow-lg hover:bg-gray-300 rounded-lg"
              onClick={closeSidebar}
            >
              Add new product
            </Link>
            <Link
              to="/notification"
              className="font-medium block p-3 transform transition duration-500 hover:scale-100 hover:shadow-lg hover:bg-gray-300 rounded-lg"
              onClick={closeSidebar}
            >
              Notifications
            </Link>
            <Link
              to="/stocks"
              className="font-medium block p-3 transform transition duration-500 hover:scale-100 hover:shadow-lg hover:bg-gray-300 rounded-lg"
              onClick={closeSidebar}
            >
              Stocks
            </Link>
            <Link
              to="/billing"
              className="font-medium block p-3 transform transition duration-500 hover:scale-100 hover:shadow-lg hover:bg-gray-300 rounded-lg"
              onClick={closeSidebar}
            >
              Billing
            </Link>
          </div>

          <div className="border-t border-gray-300 mt-6"></div>

          {user?.admin && (
            <Link
              to="/addusers"
              className="bg-sea hover:bg-hover1 text-white font-medium text-sm shadow-xl hover:shadow-lg py-2 px-4 rounded block text-center mt-4"
              onClick={closeSidebar}
            >
              Add
            </Link>
          )}

          {user && (
            <Link
              to="/profile"
              className="bg-sea hover:bg-hover1 text-white font-medium text-sm shadow-xl hover:shadow-lg py-2 px-4 rounded block text-center mt-4"
              onClick={closeSidebar}
            >
              Profile
            </Link>
          )}

          {!user && (
            <Link
              to="/login"
              className="bg-sea hover:bg-hover1 text-white font-medium text-sm shadow-xl hover:shadow-lg py-2 px-4 rounded block text-center mt-4"
              onClick={closeSidebar}
            >
              Login
            </Link>
          )}

          {user && (
            <Link
              to="/login"
              className="bg-gray-500 hover:bg-gray-600 text-white font-medium text-sm shadow-xl hover:shadow-lg py-2 px-4 rounded block text-center mt-4"
              onClick={openLogoutDialog}
            >
              Logout
            </Link>
          )}

          <div className="flex flex-col items-center justify-center mt-6">
            <Tooltip text="RKS Health Care" position="bottom">
              <span className="block text-sm text-gray-500 sm:text-center mt-2">
                © 2024{" "}
                <a href="#" className="hover:underline">
                  RKS Health Care™
                </a>
                . All Rights Reserved.
              </span>
            </Tooltip>
          </div>
        </div>
      </nav>

      {/* Logout Confirmation Dialog */}
      <LogoutDialog
        isOpen={isLogoutDialogOpen}
        onClose={cancelLogout}
        onConfirm={confirmLogout}
      />

      {/* Logout Success Message */}
      {logoutSuccess && (
        <div
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md text-xs text-center border bg-green-100 text-green-800 border-green-300"
          style={{ zIndex: 1001 }}
        >
          Logout successfully.
        </div>
      )}

      {/* Render the notification if low stock */}
      {showNotification && (
        <LowStockAlert
          message={`Attention: There are ${lowStockCount} products with low stock.`}
          onClose={() => setShowNotification(false)}
        />
      )}
    </>
  );
};

export default Navbar;
