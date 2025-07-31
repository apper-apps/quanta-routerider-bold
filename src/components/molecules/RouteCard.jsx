import React from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const RouteCard = ({ route, onSelect }) => {
  const formatTime = (time) => {
    return new Date(`2024-01-01T${time}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  };

  const getBusTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case "luxury coach":
      case "premium plus":
        return "primary";
      case "premium":
      case "express":
        return "success";
      case "sleeper":
        return "warning";
      default:
        return "secondary";
    }
  };

  return (
    <Card className="p-6 animate-fadeIn">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Route Info */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-primary/10 to-blue-600/10 p-2 rounded-lg">
                <ApperIcon name="Bus" size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 font-display">
                  {route.operator}
                </h3>
                <Badge variant={getBusTypeColor(route.busType)}>
                  {route.busType}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900 font-display">
                ${route.price}
              </div>
              <div className="text-sm text-gray-500">per person</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="flex items-center gap-2">
              <ApperIcon name="Clock" size={16} className="text-gray-400" />
              <div>
                <div className="font-semibold text-gray-900">
                  {formatTime(route.departureTime)}
                </div>
                <div className="text-sm text-gray-500">Departure</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ApperIcon name="Clock" size={16} className="text-gray-400" />
              <div>
                <div className="font-semibold text-gray-900">
                  {formatTime(route.arrivalTime)}
                </div>
                <div className="text-sm text-gray-500">Arrival</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ApperIcon name="Timer" size={16} className="text-gray-400" />
              <div>
                <div className="font-semibold text-gray-900">
                  {route.duration}
                </div>
                <div className="text-sm text-gray-500">Duration</div>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2 mb-4">
            {route.amenities.slice(0, 4).map((amenity, index) => (
              <div
                key={index}
                className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded text-xs text-gray-600"
              >
                <ApperIcon name="Check" size={12} className="text-success" />
                {amenity}
              </div>
            ))}
            {route.amenities.length > 4 && (
              <div className="px-2 py-1 bg-gray-50 rounded text-xs text-gray-600">
                +{route.amenities.length - 4} more
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ApperIcon name="Users" size={16} className="text-gray-400" />
              <span className="text-sm text-gray-600">
                {route.availableSeats} seats available
              </span>
            </div>
            
            <Button
              onClick={() => onSelect(route)}
              variant="primary"
              size="md"
              icon="ArrowRight"
            >
              Select Seats
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RouteCard;