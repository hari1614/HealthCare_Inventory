import { useEffect } from "react";
import "../../css/Notifications.css"; // Make sure this is properly imported

const  LowStockAlert = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000); // Auto-close after 5 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="absolute top-16 right-4 bg-sea text-white p-4 rounded-lg shadow-lg animate-slide-in z-10">
      <p className="text-sm">{message}</p>
      <button className="mt-2 text-xs underline" onClick={onClose}>
        Dismiss
      </button>
    </div>
  );
};

export default LowStockAlert;
