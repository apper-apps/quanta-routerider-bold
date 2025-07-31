import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";

function SeatGrid({ seats, selectedSeats, onSeatSelect }) {
  const handleSeatClick = (seat) => {
    if (seat.status === "occupied") return;
    onSeatSelect(seat);
  };

  const getSeatClass = (seat) => {
    if (selectedSeats.some(s => s.Id === seat.Id)) {
      return "seat selected";
    }
    if (seat.status === "occupied") {
      return "seat occupied";
    }
    return "seat available";
  };

  // Group seats by row
  const seatRows = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {});

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="text-center mb-6">
        <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg py-3 px-6 inline-block mb-4">
          <ApperIcon name="Steering" size={24} className="text-gray-600" />
        </div>
        <h3 className="font-bold text-lg text-gray-900 font-display mb-2">
          Select Your Seats
        </h3>
        <p className="text-gray-600 text-sm">
          Click on available seats to select them
        </p>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mb-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="seat available w-6 h-6"></div>
          <span className="text-gray-600">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="seat selected w-6 h-6"></div>
          <span className="text-gray-600">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="seat occupied w-6 h-6"></div>
          <span className="text-gray-600">Occupied</span>
        </div>
      </div>

      {/* Seat Grid */}
      <div className="space-y-2 max-w-md mx-auto">
        {Object.keys(seatRows)
          .sort((a, b) => parseInt(a) - parseInt(b))
          .map(rowNumber => (
            <div key={rowNumber} className="flex justify-center items-center gap-2">
              <span className="text-xs text-gray-500 w-6 text-center">
                {rowNumber}
              </span>
              <div className="flex gap-1">
                {seatRows[rowNumber]
                  .sort((a, b) => a.column - b.column)
                  .map((seat, index) => (
                    <div key={seat.Id} className="flex items-center">
                      <button
                        onClick={() => handleSeatClick(seat)}
                        className={getSeatClass(seat)}
                        disabled={seat.status === "occupied"}
                        title={`Seat ${seat.number} - ${seat.type} - $${seat.price}`}
                      >
                        {seat.number.slice(-1)}
                      </button>
                      {index === 1 && (
                        <div className="w-4"></div> // Aisle space
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>

      {/* Selected Seats Summary */}
      {selectedSeats.length > 0 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-accent/10 to-orange-500/10 rounded-lg border border-accent/20">
          <h4 className="font-semibold text-gray-900 mb-2">
            Selected Seats ({selectedSeats.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedSeats.map(seat => (
              <Badge key={seat.Id} variant="warning">
                {seat.number} ({seat.type})
              </Badge>
            ))}
          </div>
          <div className="mt-3 text-right">
            <span className="text-lg font-bold text-gray-900">
              Total: ${selectedSeats.reduce((sum, seat) => sum + seat.price, 0)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatGrid;