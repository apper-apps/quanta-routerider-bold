export const bookingService = {
  async createBooking(bookingData) {
    try {
      // Initialize ApperClient with Project ID and Public Key
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const bookingReference = `RR-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
      
      const newBooking = {
        Name: `Booking ${bookingReference}`,
        routeId: parseInt(bookingData.routeId),
        seats: Array.isArray(bookingData.seats) ? bookingData.seats.join('\n') : bookingData.seats,
        passengers: typeof bookingData.passengers === 'object' 
          ? JSON.stringify(bookingData.passengers) 
          : bookingData.passengers,
        totalPrice: parseFloat(bookingData.totalPrice),
        status: "confirmed",
        bookingDate: new Date().toISOString(),
        travelDate: bookingData.travelDate,
        bookingReference
      };

      const params = {
        records: [newBooking]
      };

      const response = await apperClient.createRecord('booking', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create booking ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              console.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) console.error(record.message);
          });
          
          throw new Error("Failed to create booking");
        }

        const createdBooking = successfulRecords[0]?.data;
        return {
          ...createdBooking,
          passengers: typeof createdBooking.passengers === 'string' 
            ? JSON.parse(createdBooking.passengers) 
            : createdBooking.passengers,
          seats: typeof createdBooking.seats === 'string' 
            ? createdBooking.seats.split('\n') 
            : createdBooking.seats,
          qrCode: `data:image/svg+xml;base64,${btoa(`<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="white"/><rect x="20" y="20" width="160" height="160" fill="black"/><rect x="40" y="40" width="120" height="120" fill="white"/><text x="100" y="105" text-anchor="middle" font-family="Arial" font-size="12" fill="black">${bookingReference}</text></svg>`)}`
        };
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating booking:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error creating booking:", error.message);
        throw new Error("Failed to create booking. Please try again.");
      }
    }
  },

  async getBookings() {
    try {
      // Initialize ApperClient with Project ID and Public Key
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "routeId" } },
          { field: { Name: "seats" } },
          { field: { Name: "passengers" } },
          { field: { Name: "totalPrice" } },
          { field: { Name: "status" } },
          { field: { Name: "bookingDate" } },
          { field: { Name: "travelDate" } },
          { field: { Name: "bookingReference" } }
        ],
        orderBy: [{ fieldName: "bookingDate", sorttype: "DESC" }],
        pagingInfo: { limit: 100, offset: 0 }
      };

      const response = await apperClient.fetchRecords('booking', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      const bookings = response.data || [];
      
      // Parse passengers and seats fields
      return bookings.map(booking => ({
        ...booking,
        passengers: typeof booking.passengers === 'string' 
          ? JSON.parse(booking.passengers) 
          : booking.passengers || [],
        seats: typeof booking.seats === 'string' 
          ? booking.seats.split('\n') 
          : booking.seats || []
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching bookings:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching bookings:", error.message);
        throw new Error("Failed to fetch bookings. Please try again.");
      }
    }
  },

  async getBookingById(id) {
    try {
      // Initialize ApperClient with Project ID and Public Key
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "routeId" } },
          { field: { Name: "seats" } },
          { field: { Name: "passengers" } },
          { field: { Name: "totalPrice" } },
          { field: { Name: "status" } },
          { field: { Name: "bookingDate" } },
          { field: { Name: "travelDate" } },
          { field: { Name: "bookingReference" } }
        ]
      };

      const response = await apperClient.getRecordById('booking', parseInt(id), params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (!response.data) {
        throw new Error("Booking not found");
      }

      const booking = response.data;
      return {
        ...booking,
        passengers: typeof booking.passengers === 'string' 
          ? JSON.parse(booking.passengers) 
          : booking.passengers || [],
        seats: typeof booking.seats === 'string' 
          ? booking.seats.split('\n') 
          : booking.seats || []
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching booking with ID " + id + ":", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching booking:", error.message);
        throw new Error("Failed to fetch booking details. Please try again.");
      }
    }
  },

  async cancelBooking(id) {
    try {
      // Initialize ApperClient with Project ID and Public Key
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Id: parseInt(id),
          status: "cancelled"
        }]
      };

      const response = await apperClient.updateRecord('booking', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to cancel booking ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              console.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) console.error(record.message);
          });
          
          throw new Error("Failed to cancel booking");
        }

        const updatedBooking = successfulUpdates[0]?.data;
        return {
          ...updatedBooking,
          passengers: typeof updatedBooking.passengers === 'string' 
            ? JSON.parse(updatedBooking.passengers) 
            : updatedBooking.passengers || [],
          seats: typeof updatedBooking.seats === 'string' 
            ? updatedBooking.seats.split('\n') 
            : updatedBooking.seats || []
        };
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error cancelling booking:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error cancelling booking:", error.message);
        throw new Error("Failed to cancel booking. Please try again.");
      }
    }
  }
};