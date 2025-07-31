import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No results found",
  message = "Try adjusting your search criteria to find more options.",
  actionText = "Search Again",
  onAction = null,
  icon = "Search",
  className = "" 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-8 ${className}`}>
      <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-8 rounded-full mb-6">
        <ApperIcon 
          name={icon} 
          size={64} 
          className="text-blue-600" 
        />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center font-display">
        {title}
      </h3>
      
      <p className="text-gray-600 text-center mb-8 max-w-md leading-relaxed">
        {message}
      </p>
      
      {onAction && (
        <button
          onClick={onAction}
          className="btn-primary inline-flex items-center gap-2"
        >
          <ApperIcon name="Search" size={16} />
          {actionText}
        </button>
      )}
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="p-4 bg-gray-50 rounded-lg">
          <ApperIcon name="MapPin" size={24} className="text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Try different cities</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <ApperIcon name="Calendar" size={24} className="text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Check other dates</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <ApperIcon name="Filter" size={24} className="text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Adjust filters</p>
        </div>
      </div>
    </div>
  );
};

export default Empty;