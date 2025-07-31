import React, { useState } from "react";
import PassengerForm from "@/components/molecules/PassengerForm";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { bookingService } from "@/services/api/bookingService";
import { toast } from "react-toastify";

const BookingFlow = ({ route, selectedSeats, onBookingComplete, onBack }) => {
  const [loading, setLoading] = useState(false);

  const handlePassengerSubmit = async (passengers) => {
    setLoading(true);
    
    try {
      const bookingData = {
        routeId: route.Id,
        seats: selectedSeats.map(seat => seat.number),
        passengers: passengers,
        totalPrice: selectedSeats.reduce((sum, seat) => sum + seat.price, 0),
        travelDate: new Date().toISOString().split("T")[0] // Use current date as travel date
      };

      const booking = await bookingService.createBooking(bookingData);
      
      toast.success("Booking confirmed successfully!");
      onBookingComplete(booking);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (time) => {
    return new Date(`2024-01-01T${time}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  };

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  return (
    <div className="space-y-6">
      {/* Booking Summary */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 font-display mb-6">
          Complete Your Booking
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Route Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-primary/10 to-blue-600/10 p-2 rounded-lg">
                <ApperIcon name="Bus" size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">
                  {route.operator}
                </h3>
                <p className="text-gray-600">
                  {route.origin} → {route.destination}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-500 mb-1">Departure</div>
                <div className="font-semibold">
                  {formatTime(route.departureTime)}
                </div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">Arrival</div>
                <div className="font-semibold">
                  {formatTime(route.arrivalTime)}
                </div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">Duration</div>
                <div className="font-semibold">{route.duration}</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">Bus Type</div>
                <Badge variant="primary">{route.busType}</Badge>
              </div>
            </div>
          </div>

          {/* Seat & Price Details */}
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-500 mb-2">Selected Seats</div>
              <div className="flex flex-wrap gap-2">
                {selectedSeats.map(seat => (
                  <Badge key={seat.Id} variant="warning">
                    {seat.number} ({seat.type})
                  </Badge>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">
                  {selectedSeats.length} seat{selectedSeats.length > 1 ? "s" : ""}
                </span>
                <span className="font-semibold">${totalPrice}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total Amount</span>
                <span className="text-primary">${totalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Passenger Form */}
      <PassengerForm
        selectedSeats={selectedSeats}
        onSubmit={handlePassengerSubmit}
        loading={loading}
      />

      {/* Back Button */}
      <div className="flex justify-center">
        <Button
          onClick={onBack}
          variant="ghost"
          size="md"
          icon="ArrowLeft"
        >
          Back to Seat Selection
        </Button>
      </div>
    </div>
  );
};

export default BookingFlow;