export const seatService = {
  async getSeatsByRouteId(routeId) {
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
          { field: { Name: "number" } },
          { field: { Name: "type" } },
          { field: { Name: "status" } },
          { field: { Name: "price" } },
          { field: { Name: "row" } },
          { field: { Name: "column" } }
        ],
        where: [
          { FieldName: "routeId", Operator: "EqualTo", Values: [parseInt(routeId)] }
        ],
        orderBy: [
          { fieldName: "row", sorttype: "ASC" },
          { fieldName: "column", sorttype: "ASC" }
        ],
        pagingInfo: { limit: 100, offset: 0 }
      };

      const response = await apperClient.fetchRecords('seat', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching seats for route " + routeId + ":", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching seats:", error.message);
        throw new Error("Failed to fetch seat information. Please try again.");
      }
    }
  },

  async reserveSeats(routeId, seatNumbers) {
    try {
      // Initialize ApperClient with Project ID and Public Key
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // First, get the seats to update
      const getParams = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "routeId" } },
          { field: { Name: "number" } },
          { field: { Name: "status" } }
        ],
        where: [
          { FieldName: "routeId", Operator: "EqualTo", Values: [parseInt(routeId)] },
          { FieldName: "number", Operator: "ExactMatch", Values: seatNumbers }
        ]
      };

      const getResponse = await apperClient.fetchRecords('seat', getParams);

      if (!getResponse.success) {
        console.error(getResponse.message);
        throw new Error(getResponse.message);
      }

      const seatsToUpdate = getResponse.data || [];
      
      if (seatsToUpdate.length === 0) {
        throw new Error("Seats not found");
      }

      // Update seats to reserved status
      const updateParams = {
        records: seatsToUpdate.map(seat => ({
          Id: seat.Id,
          status: "occupied"
        }))
      };

      const updateResponse = await apperClient.updateRecord('seat', updateParams);

      if (!updateResponse.success) {
        console.error(updateResponse.message);
        throw new Error(updateResponse.message);
      }

      return {
        success: true,
        reservedSeats: seatNumbers,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error reserving seats:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error reserving seats:", error.message);
        throw new Error("Failed to reserve seats. Please try again.");
      }
    }
  }
};