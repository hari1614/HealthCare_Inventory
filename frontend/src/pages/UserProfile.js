import React, { useState } from "react";
import { useAuthContext } from "../components/hooks/useAuthContext";
import { useLogout } from "../components/hooks/useLogout";
import { useChangePassword } from "../components/hooks/useChangePassword";
import LogoutDialog from "../components/reusable/LogoutDialog";

const UserProfile = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const { changePassword, isLoading, error, success } = useChangePassword();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false); // State for logout dialog visibility
  const [logoutSuccess, setLogoutSuccess] = useState(false); // State for logout success message

  const handleChangePassword = async (e) => {
    e.preventDefault();
    await changePassword(currentPassword, newPassword);
    setCurrentPassword("");
    setNewPassword("");
    setShowChangePasswordForm(false); // Hide form after submission
  };

  const openLogoutDialog = () => {
    setIsLogoutDialogOpen(true);
  };

  const confirmLogout = () => {
    logout();
    setIsLogoutDialogOpen(false);
    setLogoutSuccess(true);
    setTimeout(() => setLogoutSuccess(false), 3000); // Show success message for 3 seconds
  };

  const cancelLogout = () => {
    setIsLogoutDialogOpen(false);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-3 bg-sea text-white ">
          <h3 className=" text-md font-semibold">User Profile</h3>
          <p className="mt-1 text-sm font-semibold ">
            This is some information about the user.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl className="divide-y divide-gray-200">
            <div className="py-4 px-6 grid grid-cols-3 gap-4">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="text-sm font-medium text-gray-500 col-span-2">
                {user ? user.name : "No name"}
              </dd>
            </div>
            <div className="py-4 px-6 grid grid-cols-3 gap-4">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="text-sm font-medium text-gray-500 col-span-2">
                {user ? user.email : "No email"}
              </dd>
            </div>
            <div className="py-4 px-6 grid grid-cols-3 gap-4">
              <dt className="text-sm font-medium text-gray-500">Designation</dt>
              <dd className="text-sm font-medium text-gray-500 col-span-2">
                {user ? user.designation : "No designation"}
              </dd>
            </div>
            <div className="py-4 px-6 grid grid-cols-3 gap-4">
              <dt className="text-sm font-medium text-gray-500">Role</dt>
              <dd className="text-sm font-medium text-gray-500 col-span-2">
                {user
                  ? user.admin
                    ? "Admin"
                    : user.subAdmin
                    ? "Sub Admin"
                    : "User"
                  : "No role"}
              </dd>
            </div>
            <div className="py-4 px-6 grid grid-cols-3 gap-4">
              <dt className="text-sm font-medium text-gray-500">Password</dt>
              <dd className="text-sm font-medium text-gray-500 col-span-2">
                <button
                  onClick={() =>
                    setShowChangePasswordForm(!showChangePasswordForm)
                  }
                  className="text-sm font-medium text-sea hover:underline"
                >
                  Change password
                </button>
                {showChangePasswordForm && (
                  <form onSubmit={handleChangePassword} className="mt-4">
                    <div className="mb-4">
                      <label
                        htmlFor="currentPassword"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Current Password
                      </label>
                      <input
                        id="currentPassword"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sea focus:border-sea sm:text-sm"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="newPassword"
                        className="block text-sm font-medium text-gray-700"
                      >
                        New Password
                      </label>
                      <input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sea focus:border-sea sm:text-sm"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sea hover:bg-sea-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sea"
                    >
                      {isLoading ? "Changing..." : "Change Password"}
                    </button>
                    {error && <p className="mt-2 text-red-600">{error}</p>}
                    {success && (
                      <p className="mt-2 text-green-600">{success}</p>
                    )}
                  </form>
                )}
              </dd>
            </div>
            <div className="py-4 px-6 grid grid-cols-3 gap-4">
              <dt className="text-sm font-medium text-gray-500">Log out</dt>
              <dd className="text-sm font medium text-gray-500 col-span-2">
                <button
                  onClick={openLogoutDialog}
                  className="text-sm font-medium text-sea hover:underline"
                >
                  Log out
                </button>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <LogoutDialog
        isOpen={isLogoutDialogOpen}
        onClose={cancelLogout}
        onConfirm={confirmLogout}
      />

      {/* Logout Success Message */}
      {logoutSuccess && (
        <div
          className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg"
          style={{ zIndex: 1001 }}
        >
          Logout successfully.
        </div>
      )}
    </div>
  );
};

export default UserProfile;
