import React, { useState, useEffect } from "react";
import SeatGrid from "@/components/molecules/SeatGrid";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { seatService } from "@/services/api/seatService";
import { toast } from "react-toastify";

const SeatSelection = ({ route, selectedSeats, onSeatsChange, onNext, onBack }) => {
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadSeats();
  }, [route.Id]);

  const loadSeats = async () => {
    setLoading(true);
    setError("");
    
    try {
      const seatData = await seatService.getSeatsByRouteId(route.Id);
      setSeats(seatData);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load seat information");
    } finally {
      setLoading(false);
    }
  };

  const handleSeatSelect = (seat) => {
    const isSelected = selectedSeats.some(s => s.Id === seat.Id);
    
    if (isSelected) {
      // Remove seat
      const updatedSeats = selectedSeats.filter(s => s.Id !== seat.Id);
      onSeatsChange(updatedSeats);
      toast.info(`Seat ${seat.number} removed`);
    } else {
      // Add seat (limit to 4 seats max)
      if (selectedSeats.length >= 4) {
        toast.warning("Maximum 4 seats can be selected");
        return;
      }
      
      const updatedSeats = [...selectedSeats, seat];
      onSeatsChange(updatedSeats);
      toast.success(`Seat ${seat.number} selected`);
    }
  };

  const handleRetry = () => {
    loadSeats();
  };

  const formatTime = (time) => {
    return new Date(`2024-01-01T${time}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  };

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={handleRetry} />;
  }

  return (
    <div className="space-y-6">
      {/* Route Summary */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-primary/10 to-blue-600/10 p-2 rounded-lg">
              <ApperIcon name="Bus" size={24} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 font-display">
                {route.operator}
              </h2>
              <p className="text-gray-600">
                {route.origin} → {route.destination}
              </p>
            </div>
          </div>
          <Badge variant="primary">{route.busType}</Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-sm text-gray-500 mb-1">Departure</div>
            <div className="font-semibold text-gray-900">
              {formatTime(route.departureTime)}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">Arrival</div>
            <div className="font-semibold text-gray-900">
              {formatTime(route.arrivalTime)}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">Duration</div>
            <div className="font-semibold text-gray-900">{route.duration}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">Price per seat</div>
            <div className="font-semibold text-gray-900">${route.price}</div>
          </div>
        </div>
      </Card>

      {/* Seat Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SeatGrid
            seats={seats}
            selectedSeats={selectedSeats}
            onSeatSelect={handleSeatSelect}
          />
        </div>

        {/* Booking Summary */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-bold text-lg text-gray-900 font-display mb-4">
              Booking Summary
            </h3>
            
            {selectedSeats.length > 0 ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm text-gray-500">Selected Seats</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedSeats.map(seat => (
                      <Badge key={seat.Id} variant="warning">
                        {seat.number}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">
                      {selectedSeats.length} seat{selectedSeats.length > 1 ? "s" : ""}
                    </span>
                    <span className="font-semibold">${totalPrice}</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">${totalPrice}</span>
                  </div>
                </div>

                <Button
                  onClick={onNext}
                  variant="primary"
                  size="lg"
                  className="w-full"
                  icon="ArrowRight"
                >
                  Continue to Passenger Details
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <ApperIcon name="MousePointer" size={48} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  Select seats to continue with your booking
                </p>
              </div>
            )}
          </Card>

          <Button
            onClick={onBack}
            variant="ghost"
            size="md"
            className="w-full"
            icon="ArrowLeft"
          >
            Back to Route Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;