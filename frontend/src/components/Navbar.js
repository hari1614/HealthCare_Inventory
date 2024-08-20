import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLogout } from "./hooks/useLogout";
import { useAuthContext } from "./hooks/useAuthContext";
import { useProductContext } from "./hooks/useProductContext";
import useFetch from "./hooks/useFetch";
import LowStockAlert from "./reusable/LowStockAlert";
import Rks from "../assets/rkshealthcare.png";
import {
  faBars,
  faTimes,
  faHeartbeat,
  faUser,
  faPlus,
  faArrowRightFromBracket,
  faGears,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import LogoutDialog from "./reusable/LogoutDialog"; // Import the new LogoutDialog component

const Navbar = () => {
  const navigate = useNavigate();
  const [isNavDialogOpen, setIsNavDialogOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false); // State for logout dialog visibility
  const [logoutSuccess, setLogoutSuccess] = useState(false); // State for logout success message
  const [lowStockCount, setLowStockCount] = useState(0);
  const [showNotification, setShowNotification] = useState(false); // State for showing the custom notification
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

  return (
    <>
      <nav className="sticky top-0 z-50 p-3 flex bg-white justify-between items-center shadow-md">
        <a
          href="#"
          id="brand"
          className="flex gap-2 items-center mx-auto md:mx-0"
        >
          {/* <span className="object-cover max-w-12 max-h-12">
            <FontAwesomeIcon className="text-medium" icon={faHeartbeat} />
          </span> */}

          <span className="text-lg font-bold font-body text-title2">
            RKS
            <span className="ml-2 font-bold font-body text-title">
              HealthCare
            </span>
            {/* <span className="text-xs font-sm block text-title">Inventory Management Software</span> */}
          </span>
          {/* <img
            src={Rks}
            alt={Rks}
            className="block mx-auto object-cover w-44 max-h-12 sm:w-44 md:w-44"
          /> */}
        </a>

        <div id="nav-menu" className="hidden md:flex gap-12">
          <Link
            to="/"
            className="text-gray-700 transition hover:text-sea focus:outline-none focus:ring-sea focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Home
          </Link>
          {!user?.subAdmin && (
            <Link
              to="/forms"
              className="text-gray-700 transition hover:text-sea focus:outline-none  focus:ring-sea focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Add new product
            </Link>
          )}

          {/* <Link
            to="/products"
            className="text-gray-700 transition hover:text-sea focus:outline-none  focus:ring-sea focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Products
          </Link> */}
          <Link
            to="notification"
            className="text-gray-700 transition hover:text-sea focus:outline-none  focus:ring-sea focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Notification
            {/* Add the lowStockCount badge */}
            {user && lowStockCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 ms-2 text-xs font-semibold text-white bg-sea rounded-full">
                {lowStockCount}
              </span>
            )}
          </Link>
          <Link
            to="/billing"
            className="text-gray-700 transition hover:text-sea focus:outline-none  focus:ring-sea focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
          > Billing
            
          </Link>

          {user && (
            <div className=" flex items-end text-xs text-gray-600 font-semibold">
              <h1 className="text-md text-gray-700 font-semibold">
                Welcome, {user ? user.name : "Guest"}!
              </h1>
              {user.admin ? (
                <p>You have Admin access.</p>
              ) : user.subAdmin ? (
                <p>You have Sub Admin access.</p>
              ) : (
                <p>You have regular user access.</p>
              )}
            </div>
          )}
        </div>

        <div className="hidden md:flex gap-2">
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
              {" "}
              Login
              <span>
                <FontAwesomeIcon className="ml-2" icon={faUser} />
              </span>
            </Link>
          )}
          {user && (
            <div>
              {/* Button to open logout confirmation dialog */}
              <button
                onClick={openLogoutDialog}
                className="bg-gray-500 hover:bg-gray-600 text-white font-medium text-sm shadow-xl hover:shadow-lg py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
              >
                Log out
                <span>
                  <FontAwesomeIcon
                    className="ml-2"
                    icon={faArrowRightFromBracket}
                  />
                </span>
              </button>
            </div>
          )}
        </div>
        {/*navbar for small screens*/}
        <button className="p-2 md:hidden" onClick={handleClick}>
          <FontAwesomeIcon icon={isNavDialogOpen ? faTimes : faBars} />
        </button>
        {isNavDialogOpen && (
          <div
            id="nav-dialog"
            className="fixed bg-white inset-0 p-3"
            style={{ zIndex: 1000 }}
          >
            <div id="nav-bar" className="flex justify-between">
              <a href="#" id="brand" className="flex gap-2 items center">
                <img
                  src={Rks}
                  alt={Rks}
                  className="block mx-auto object-cover w-44 max-h-12 sm:w-44 md:w-44"
                />
              </a>
              <button className="p-2 md:hidden" onClick={handleClick}>
                <FontAwesomeIcon icon={isNavDialogOpen ? faTimes : faBars} />
              </button>
            </div>

            <div className="mt-6">
              <Link
                to="/"
                className="font-medium m-3 p-3 hover:bg-gray-50 block rounded-lg"
                onClick={closeNavDialog}
              >
                Home
              </Link>
              <Link
                to="/forms"
                className="font-medium m-3 p-3 hover:bg-gray-50 block rounded-lg"
                onClick={closeNavDialog}
              >
                Add new product
              </Link>
              <Link
                to="/products"
                className="font-medium m-3 p-3 hover:bg-gray-50 block rounded-lg"
                onClick={closeNavDialog}
              >
                Products
              </Link>
              <Link
                to="/notification"
                className="font-medium m-3 p-3 hover:bg-gray-50 block rounded-lg"
                onClick={closeNavDialog}
              >
                Notifications
              </Link>
            </div>

            <div className="h-[1px] bg-gray-300"></div>

            {user?.admin && (
              <Link
                to="/addusers"
                className="bg-sea hover:bg-hover1 text-white font-medium text-sm shadow-xl hover:shadow-lg py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center m-8 w-20"
                onClick={closeNavDialog}
              >
                Add
              </Link>
            )}
            {user && (
              <Link
                to="/profile"
                className="bg-sea hover:bg-hover1 text-white font-medium text-sm shadow-xl hover:shadow-lg py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center m-8 w-20"
                onClick={closeNavDialog}
              >
                Profile
              </Link>
            )}
            {!user && (
              <Link
                to="/login"
                className="bg-sea hover:bg-hover1 text-white font-medium text-sm shadow-xl hover:shadow-lg py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center m-8 w-20"
                onClick={closeNavDialog}
              >
                Login
              </Link>
            )}
            {user && (
              <Link
                to="/login"
                className="bg-gray-500 hover:bg-gray-600 text-white font-medium text-sm shadow-xl hover:shadow-lg py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center m-8 w-20"
                onClick={openLogoutDialog}
              >
                Logout 
              </Link>
            )}
          </div>
        )}
      </nav>
      {/* <div className="h-[1px] bg-gray-300"></div> */}

      {/* Logout Confirmation Dialog */}
      <LogoutDialog
        isOpen={isLogoutDialogOpen}
        onClose={cancelLogout}
        onConfirm={confirmLogout}
      />

      {/* Logout Success Message */}
      {logoutSuccess && (
        <div
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md text-xs text-center border bg-green-100 text-green-800 border-green-300 "
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
