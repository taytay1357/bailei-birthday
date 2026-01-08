import { useState } from "react";

function Notification({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="fixed w-sm md:w-md lg:w-lg top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-lg z-50 fade-in">
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-white font-bold hover:cursor-pointer"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default Notification;
