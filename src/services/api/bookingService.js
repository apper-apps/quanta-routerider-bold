import bookingsData from "@/services/mockData/bookings.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let mockBookings = [...bookingsData];

export const bookingService = {
  async createBooking(bookingData) {
    await delay(800);
    
    try {
      const newId = Math.max(...mockBookings.map(b => b.Id), 0) + 1;
      const bookingReference = `RR-${new Date().getFullYear()}-${String(newId).padStart(3, "0")}`;
      
      const newBooking = {
        Id: newId,
        ...bookingData,
        status: "confirmed",
        bookingDate: new Date().toISOString(),
        bookingReference
      };
      
      mockBookings.push(newBooking);
      
      return { 
        ...newBooking,
        qrCode: `data:image/svg+xml;base64,${btoa(`<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="white"/><rect x="20" y="20" width="160" height="160" fill="black"/><rect x="40" y="40" width="120" height="120" fill="white"/><text x="100" y="105" text-anchor="middle" font-family="Arial" font-size="12" fill="black">${bookingReference}</text></svg>`)}`
      };
    } catch (error) {
      throw new Error("Failed to create booking. Please try again.");
    }
  },

  async getBookings() {
    await delay(300);
    
    try {
      return [...mockBookings].sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate));
    } catch (error) {
      throw new Error("Failed to fetch bookings. Please try again.");
    }
  },

  async getBookingById(id) {
    await delay(200);
    
    try {
      const booking = mockBookings.find(b => b.Id === parseInt(id));
      if (!booking) {
        throw new Error("Booking not found");
      }
      return { ...booking };
    } catch (error) {
      throw new Error("Failed to fetch booking details. Please try again.");
    }
  },

  async cancelBooking(id) {
    await delay(400);
    
    try {
      const bookingIndex = mockBookings.findIndex(b => b.Id === parseInt(id));
      if (bookingIndex === -1) {
        throw new Error("Booking not found");
      }
      
      mockBookings[bookingIndex] = {
        ...mockBookings[bookingIndex],
        status: "cancelled"
      };
      
      return { ...mockBookings[bookingIndex] };
    } catch (error) {
      throw new Error("Failed to cancel booking. Please try again.");
    }
  }
};