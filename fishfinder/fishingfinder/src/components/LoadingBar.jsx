import react, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function LoadingBar({ loading, status }) {
  const location = useLocation();

  useEffect(() => {}, [location.pathname]);

  const animationClass =
    status === "success"
      ? "animate-progressGreen"
      : status === "error"
      ? "animate-progressRed"
      : "";

  return loading ? (
    <div className={`h-1 bg-transparent dark:bg-tertiary ${animationClass} w-full `}> </div>
  ) : (
    <div className="bg-white dark:bg-primary dark:text-white transition-colors duration-300 h-1">
      
    </div>
  );
}

export default LoadingBar;
