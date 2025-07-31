import seatsData from "@/services/mockData/seats.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const seatService = {
  async getSeatsByRouteId(routeId) {
    await delay(300);
    
    try {
      // Generate seats for any route (40 seats standard layout)
      const seats = [];
      const occupiedSeats = [2, 7, 12, 18, 27, 38]; // Some random occupied seats
      
      for (let row = 1; row <= 10; row++) {
        for (let col = 1; col <= 4; col++) {
          const seatNumber = row + String.fromCharCode(64 + col); // 1A, 1B, etc.
          const seatId = (row - 1) * 4 + col;
          const isOccupied = occupiedSeats.includes(seatId);
          
          seats.push({
            Id: seatId,
            routeId: parseInt(routeId),
            number: seatNumber,
            type: col === 1 || col === 4 ? "window" : "aisle",
            status: isOccupied ? "occupied" : "available",
            price: 45,
            row: row,
            column: col
          });
        }
      }
      
      return seats;
    } catch (error) {
      throw new Error("Failed to fetch seat information. Please try again.");
    }
  },

  async reserveSeats(routeId, seatNumbers) {
    await delay(500);
    
    try {
      // Simulate seat reservation
      console.log(`Reserved seats ${seatNumbers.join(", ")} for route ${routeId}`);
      return {
        success: true,
        reservedSeats: seatNumbers,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
      };
    } catch (error) {
      throw new Error("Failed to reserve seats. Please try again.");
    }
  }
};