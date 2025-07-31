import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ 
  children, 
  variant = "default", 
  className = "", 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold";
  
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-gradient-to-r from-primary/10 to-blue-600/10 text-primary border border-primary/20",
    success: "bg-gradient-to-r from-success/10 to-green-600/10 text-success border border-success/20",
    warning: "bg-gradient-to-r from-accent/10 to-orange-500/10 text-accent border border-accent/20",
    error: "bg-gradient-to-r from-error/10 to-red-600/10 text-error border border-error/20",
    secondary: "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700"
  };
  
  return (
    <span
      ref={ref}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;