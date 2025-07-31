import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  message = "Something went wrong. Please try again.", 
  onRetry = null,
  className = "" 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-8 ${className}`}>
      <div className="bg-gradient-to-r from-red-100 to-red-200 p-6 rounded-full mb-6">
        <ApperIcon 
          name="AlertTriangle" 
          size={48} 
          className="text-red-600" 
        />
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-3 text-center font-display">
        Oops! Something went wrong
      </h3>
      
      <p className="text-gray-600 text-center mb-6 max-w-md leading-relaxed">
        {message}
      </p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn-primary inline-flex items-center gap-2"
        >
          <ApperIcon name="RefreshCw" size={16} />
          Try Again
        </button>
      )}
      
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-500 text-center">
          If the problem persists, please contact our support team for assistance.
        </p>
      </div>
    </div>
  );
};

export default Error;