// src/components/LogoutDialog.js
import React, { useState } from 'react';

const LogoutDialog = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed bg-gray-900 bg-opacity-50 inset-0 p-8 flex items-center justify-center"
      style={{ zIndex: 1000 }}
    >
      <div className="bg-white p-8 rounded-md shadow-lg">
        <p className="text-lg font-semibold mb-4">Are you sure you want to logout?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-sea hover:bg-hover1 text-white font-medium text-sm shadow-xl hover:shadow-lg py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-hover2 text-white font-medium text-sm shadow-xl hover:shadow-lg py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center w-20"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutDialog;
