import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Button = forwardRef(({ 
  children, 
  variant = "primary", 
  size = "md", 
  className = "", 
  loading = false,
  icon = null,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-blue-600 text-white hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]",
    secondary: "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 hover:scale-[1.02] active:scale-[0.98]",
    outline: "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white hover:scale-[1.02] active:scale-[0.98]",
    ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:scale-[1.02] active:scale-[0.98]",
    success: "bg-gradient-to-r from-success to-green-600 text-white hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]",
    warning: "bg-gradient-to-r from-accent to-orange-500 text-white hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]",
    danger: "bg-gradient-to-r from-error to-red-600 text-white hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]"
  };
  
  const sizes = {
    sm: "px-3 py-2 text-sm gap-1",
    md: "px-6 py-3 text-base gap-2",
    lg: "px-8 py-4 text-lg gap-3"
  };
  
  return (
    <button
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <>
          <ApperIcon name="Loader2" size={size === "sm" ? 14 : size === "lg" ? 20 : 16} className="animate-spin" />
          Loading...
        </>
      ) : (
        <>
          {icon && <ApperIcon name={icon} size={size === "sm" ? 14 : size === "lg" ? 20 : 16} />}
          {children}
        </>
      )}
    </button>
  );
});

Button.displayName = "Button";

export default Button;