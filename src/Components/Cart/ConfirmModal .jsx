import React from "react";

const ConfirmModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h3 className="text-lg font-bold mb-4 text-center">Are you sure?</h3>
        <p className="text-center mb-6">
          Do you want to delete this item from your cart?
        </p>
        <div className="flex justify-between">
          <button
            onClick={onConfirm}
            className="bg-rose-900 text-white px-5 py-2 rounded shadow hover:bg-rise transition"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded shadow hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
