import React, { useState } from "react";
import ApperIcon from "@/components/ApperIcon.jsx";
import SearchSection from "@/components/organisms/SearchSection";
import BookingConfirmation from "@/components/organisms/BookingConfirmation";
import SeatSelection from "@/components/organisms/SeatSelection";
import BookingFlow from "@/components/organisms/BookingFlow";

const Home = () => {
  const [step, setStep] = useState("search"); // search, seats, booking, confirmation
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [completedBooking, setCompletedBooking] = useState(null);

  const handleRouteSelect = (route) => {
    setSelectedRoute(route);
    setSelectedSeats([]);
    setStep("seats");
  };

  const handleSeatsChange = (seats) => {
    setSelectedSeats(seats);
  };

  const handleSeatSelectionNext = () => {
    setStep("booking");
  };

  const handleSeatSelectionBack = () => {
    setStep("search");
  };

  const handleBookingComplete = (booking) => {
    setCompletedBooking(booking);
    setStep("confirmation");
  };

  const handleBookingBack = () => {
    setStep("seats");
  };

  const handleNewBooking = () => {
    setStep("search");
    setSelectedRoute(null);
    setSelectedSeats([]);
    setCompletedBooking(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Indicator */}
        {step !== "search" && (
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="progress-step completed">
                  <ApperIcon name="Search" size={16} />
                </div>
                <span className="ml-2 text-sm font-medium text-gray-600">Search</span>
              </div>
              <div className="w-8 h-px bg-gray-300"></div>
              <div className="flex items-center">
                <div className={`progress-step ${
                  step === "seats" ? "active" : 
                  step === "booking" || step === "confirmation" ? "completed" : "inactive"
                }`}>
                  <ApperIcon name="Armchair" size={16} />
                </div>
                <span className="ml-2 text-sm font-medium text-gray-600">Select Seats</span>
              </div>
              <div className="w-8 h-px bg-gray-300"></div>
              <div className="flex items-center">
                <div className={`progress-step ${
                  step === "booking" ? "active" : 
                  step === "confirmation" ? "completed" : "inactive"
                }`}>
                  <ApperIcon name="User" size={16} />
                </div>
                <span className="ml-2 text-sm font-medium text-gray-600">Passenger Details</span>
              </div>
              <div className="w-8 h-px bg-gray-300"></div>
              <div className="flex items-center">
                <div className={`progress-step ${
                  step === "confirmation" ? "active" : "inactive"
                }`}>
                  <ApperIcon name="CheckCircle" size={16} />
                </div>
                <span className="ml-2 text-sm font-medium text-gray-600">Confirmation</span>
              </div>
            </div>
          </div>
        )}

        {/* Step Content */}
        {step === "search" && (
          <SearchSection onRouteSelect={handleRouteSelect} />
        )}

        {step === "seats" && selectedRoute && (
          <SeatSelection
            route={selectedRoute}
            selectedSeats={selectedSeats}
            onSeatsChange={handleSeatsChange}
            onNext={handleSeatSelectionNext}
            onBack={handleSeatSelectionBack}
          />
        )}

        {step === "booking" && selectedRoute && selectedSeats.length > 0 && (
          <BookingFlow
            route={selectedRoute}
            selectedSeats={selectedSeats}
            onBookingComplete={handleBookingComplete}
            onBack={handleBookingBack}
          />
        )}

        {step === "confirmation" && completedBooking && selectedRoute && (
          <BookingConfirmation
            booking={completedBooking}
            route={selectedRoute}
            onNewBooking={handleNewBooking}
          />
        )}
      </div>
    </div>
  );
};

export default Home;