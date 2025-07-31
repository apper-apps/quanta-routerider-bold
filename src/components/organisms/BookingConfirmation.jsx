import React from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";

const BookingConfirmation = ({ booking, route, onNewBooking }) => {
  const formatTime = (time) => {
    return new Date(`2024-01-01T${time}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const handleDownloadTicket = () => {
    toast.success("Ticket download started");
    // In a real app, this would trigger a PDF download
  };

  const handleShareTicket = () => {
    if (navigator.share) {
      navigator.share({
        title: `RouteRider Booking - ${booking.bookingReference}`,
        text: `My bus ticket from ${route.origin} to ${route.destination}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(booking.bookingReference);
      toast.success("Booking reference copied to clipboard");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Success Header */}
      <div className="text-center py-8">
        <div className="bg-gradient-to-r from-success/10 to-green-600/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="CheckCircle" size={48} className="text-success" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 font-display mb-2">
          Booking Confirmed!
        </h1>
        <p className="text-lg text-gray-600">
          Your bus tickets have been booked successfully
        </p>
      </div>

      {/* Booking Details */}
      <Card className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Trip Details */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 font-display mb-4">
                Trip Details
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-primary/10 to-blue-600/10 p-2 rounded-lg">
                    <ApperIcon name="Bus" size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {route.operator}
                    </div>
                    <div className="text-sm text-gray-600">{route.busType}</div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">
                        {route.origin}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatTime(route.departureTime)}
                      </div>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <div className="flex items-center gap-2 text-gray-400">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <div className="flex-1 h-px bg-gray-300"></div>
                        <ApperIcon name="Bus" size={16} />
                        <div className="flex-1 h-px bg-gray-300"></div>
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">
                        {route.destination}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatTime(route.arrivalTime)}
                      </div>
                    </div>
                  </div>
                  <div className="text-center text-sm text-gray-600">
                    Duration: {route.duration}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-2">Travel Date</div>
                  <div className="font-semibold text-gray-900">
                    {formatDate(booking.travelDate)}
                  </div>
                </div>
              </div>
            </div>

            {/* Passenger Details */}
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Passengers</h3>
              <div className="space-y-3">
                {booking.passengers.map((passenger, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-semibold text-gray-900">
                        {passenger.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {passenger.email}
                      </div>
                    </div>
                    <Badge variant="warning">
                      Seat {passenger.seatNumber}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Info & QR Code */}
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Booking Information</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking Reference</span>
                  <span className="font-semibold text-primary">
                    {booking.bookingReference}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking Date</span>
                  <span className="font-semibold">
                    {formatDate(booking.bookingDate)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <Badge variant="success">Confirmed</Badge>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="text-lg font-bold text-gray-900">Total Paid</span>
                  <span className="text-lg font-bold text-primary">
                    ${booking.totalPrice}
                  </span>
                </div>
              </div>
            </div>

            {/* QR Code */}
            <div className="text-center">
              <h3 className="font-bold text-gray-900 mb-4">Your Ticket</h3>
              <div className="bg-white p-4 border-2 border-dashed border-gray-300 rounded-lg inline-block">
                {booking.qrCode ? (
                  <img 
                    src={booking.qrCode} 
                    alt="Booking QR Code" 
                    className="w-32 h-32 mx-auto"
                  />
                ) : (
                  <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                    <ApperIcon name="QrCode" size={48} className="text-gray-400" />
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Show this QR code when boarding
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={handleDownloadTicket}
          variant="primary"
          icon="Download"
        >
          Download Ticket
        </Button>
        <Button
          onClick={handleShareTicket}
          variant="secondary"
          icon="Share2"
        >
          Share Ticket
        </Button>
        <Button
          onClick={onNewBooking}
          variant="outline"
          icon="Plus"
        >
          Book Another Trip
        </Button>
      </div>

      {/* Important Information */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <ApperIcon name="Info" size={20} className="text-blue-600" />
          Important Information
        </h3>
        <div className="space-y-2 text-sm text-gray-700">
          <p>• Please arrive at the departure point at least 30 minutes before departure time</p>
          <p>• Carry a valid ID proof for verification during boarding</p>
          <p>• Show the QR code or booking reference to the conductor</p>
          <p>• Cancellation is allowed up to 2 hours before departure with applicable charges</p>
        </div>
      </Card>
    </div>
  );
};

export default BookingConfirmation;