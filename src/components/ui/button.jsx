import React from "react";
import clsx from "clsx";

const Button = ({ variant = "primary", size = "md", children, onClick, className, ...props }) => {
  const baseStyles = "rounded-2xl font-medium transition-all duration-300 focus:outline-none";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-300 text-gray-900 hover:bg-gray-400",
    danger: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-gray-400 text-gray-800 hover:bg-gray-100",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
