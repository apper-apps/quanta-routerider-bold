import React, { useState, useEffect } from "react";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const PassengerForm = ({ selectedSeats, onSubmit, loading = false }) => {
  const [passengers, setPassengers] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Initialize passenger forms based on selected seats
    setPassengers(
      selectedSeats.map(seat => ({
        name: "",
        phone: "",
        email: "",
        seatNumber: seat.number
      }))
    );
    setErrors({});
  }, [selectedSeats]);

  const handleInputChange = (index, field, value) => {
    setPassengers(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });

    // Clear error for this field
    if (errors[`${index}-${field}`]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[`${index}-${field}`];
        return updated;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    passengers.forEach((passenger, index) => {
      if (!passenger.name.trim()) {
        newErrors[`${index}-name`] = "Name is required";
      }
      if (!passenger.phone.trim()) {
        newErrors[`${index}-phone`] = "Phone is required";
      } else if (!/^\+?[\d\s-()]+$/.test(passenger.phone)) {
        newErrors[`${index}-phone`] = "Invalid phone format";
      }
      if (!passenger.email.trim()) {
        newErrors[`${index}-email`] = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(passenger.email)) {
        newErrors[`${index}-email`] = "Invalid email format";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(passengers);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 font-display mb-2">
          Passenger Details
        </h3>
        <p className="text-gray-600">
          Please provide details for all passengers
        </p>
      </div>

      {passengers.map((passenger, index) => (
        <div
          key={index}
          className="card p-6 space-y-4 animate-fadeIn"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-primary/10 to-blue-600/10 p-2 rounded-lg">
              <ApperIcon name="User" size={20} className="text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">
                Passenger {index + 1}
              </h4>
              <p className="text-sm text-gray-600">
                Seat {passenger.seatNumber}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="form-label">
                Full Name
              </label>
              <Input
                type="text"
                placeholder="Enter full name"
                value={passenger.name}
                onChange={(e) => handleInputChange(index, "name", e.target.value)}
                error={!!errors[`${index}-name`]}
                className="form-input"
              />
              {errors[`${index}-name`] && (
                <p className="text-error text-sm">{errors[`${index}-name`]}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="form-label">
                Phone Number
              </label>
              <Input
                type="tel"
                placeholder="+1-555-0123"
                value={passenger.phone}
                onChange={(e) => handleInputChange(index, "phone", e.target.value)}
                error={!!errors[`${index}-phone`]}
                className="form-input"
              />
              {errors[`${index}-phone`] && (
                <p className="text-error text-sm">{errors[`${index}-phone`]}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="form-label">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="passenger@email.com"
                value={passenger.email}
                onChange={(e) => handleInputChange(index, "email", e.target.value)}
                error={!!errors[`${index}-email`]}
                className="form-input"
              />
              {errors[`${index}-email`] && (
                <p className="text-error text-sm">{errors[`${index}-email`]}</p>
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-center pt-4">
        <Button
          type="submit"
          loading={loading}
          icon="CreditCard"
          size="lg"
          className="min-w-[200px]"
        >
          Complete Booking
        </Button>
      </div>
    </form>
  );
};

export default PassengerForm;