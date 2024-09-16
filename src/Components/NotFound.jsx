import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white poppins-medium">
      <h1 className="text-6xl font-semibold">404 Not Found</h1>
      <p className="text-lg mt-4">
        Your visited page not found. You may go home page.
      </p>
      <button
        onClick={handleBackToHome}
        className="mt-8 px-7 py-3 bg-rose-900 text-white rounded-md hover:bg-rise"
      >
        Back to home page
      </button>
    </div>
  );
};

export default NotFound;
