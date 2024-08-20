// utils/confirmationModal.js
import React from 'react';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
        <h2 className="text-xl text-black font-semibold mb-4">Are you sure you want to delete this product?</h2>
        <div className="flex justify-center gap-4 mt-4">
          <button
            className="bg-sea hover:bg-hover1 text-white text-sm font-semibold shadow-xl hover:shadow-lg py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold shadow-xl hover:shadow-lg py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
