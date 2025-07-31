import React from "react";

const Loading = ({ className = "" }) => {
  return (
    <div className={`animate-pulse space-y-6 ${className}`}>
      {/* Header Skeleton */}
      <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-16 rounded-xl"></div>
      
      {/* Search Form Skeleton */}
      <div className="card p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="bg-gray-200 h-4 w-16 rounded"></div>
            <div className="bg-gray-200 h-12 rounded-lg"></div>
          </div>
          <div className="space-y-2">
            <div className="bg-gray-200 h-4 w-20 rounded"></div>
            <div className="bg-gray-200 h-12 rounded-lg"></div>
          </div>
          <div className="space-y-2">
            <div className="bg-gray-200 h-4 w-12 rounded"></div>
            <div className="bg-gray-200 h-12 rounded-lg"></div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-12 w-32 rounded-lg"></div>
      </div>

      {/* Results Skeleton */}
      <div className="space-y-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="card p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-2">
                <div className="bg-gray-200 h-6 w-32 rounded"></div>
                <div className="bg-gray-200 h-4 w-24 rounded"></div>
              </div>
              <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-10 w-24 rounded-lg"></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="bg-gray-200 h-4 w-16 rounded"></div>
                <div className="bg-gray-200 h-6 w-20 rounded"></div>
              </div>
              <div className="space-y-2">
                <div className="bg-gray-200 h-4 w-16 rounded"></div>
                <div className="bg-gray-200 h-6 w-20 rounded"></div>
              </div>
              <div className="space-y-2">
                <div className="bg-gray-200 h-4 w-20 rounded"></div>
                <div className="bg-gray-200 h-6 w-16 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;