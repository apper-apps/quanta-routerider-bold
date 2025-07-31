export const routeService = {
  async searchRoutes(origin, destination, date, filters = {}) {
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
          { field: { Name: "origin" } },
          { field: { Name: "destination" } },
          { field: { Name: "departureTime" } },
          { field: { Name: "arrivalTime" } },
          { field: { Name: "operator" } },
          { field: { Name: "busType" } },
          { field: { Name: "price" } },
          { field: { Name: "availableSeats" } },
          { field: { Name: "duration" } },
          { field: { Name: "amenities" } }
        ],
        where: [],
        orderBy: [{ fieldName: "departureTime", sorttype: "ASC" }],
        pagingInfo: { limit: 50, offset: 0 }
      };

      // Add search filters
      if (origin && destination) {
        params.where.push(
          { FieldName: "origin", Operator: "Contains", Values: [origin] },
          { FieldName: "destination", Operator: "Contains", Values: [destination] }
        );
      }

      // Apply additional filters
      if (filters.amenities?.length > 0) {
        params.where.push({
          FieldName: "amenities",
          Operator: "Contains",
          Values: filters.amenities
        });
      }

      if (filters.busTypes?.length > 0) {
        params.where.push({
          FieldName: "busType",
          Operator: "Contains",
          Values: filters.busTypes
        });
      }

      const response = await apperClient.fetchRecords('route', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error searching routes:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error searching routes:", error.message);
        throw new Error("Failed to search routes. Please try again.");
      }
    }
  },

  async getRouteById(id) {
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
          { field: { Name: "origin" } },
          { field: { Name: "destination" } },
          { field: { Name: "departureTime" } },
          { field: { Name: "arrivalTime" } },
          { field: { Name: "operator" } },
          { field: { Name: "busType" } },
          { field: { Name: "price" } },
          { field: { Name: "availableSeats" } },
          { field: { Name: "duration" } },
          { field: { Name: "amenities" } }
        ]
      };

      const response = await apperClient.getRecordById('route', parseInt(id), params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (!response.data) {
        throw new Error("Route not found");
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching route with ID " + id + ":", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching route:", error.message);
        throw new Error("Failed to fetch route details. Please try again.");
      }
    }
  },

  async getAllRoutes() {
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
          { field: { Name: "origin" } },
          { field: { Name: "destination" } },
          { field: { Name: "departureTime" } },
          { field: { Name: "arrivalTime" } },
          { field: { Name: "operator" } },
          { field: { Name: "busType" } },
          { field: { Name: "price" } },
          { field: { Name: "availableSeats" } },
          { field: { Name: "duration" } },
          { field: { Name: "amenities" } }
        ],
        orderBy: [{ fieldName: "departureTime", sorttype: "ASC" }],
        pagingInfo: { limit: 100, offset: 0 }
      };

      const response = await apperClient.fetchRecords('route', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching routes:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching routes:", error.message);
        throw new Error("Failed to fetch routes. Please try again.");
      }
    }
  },

  async getPopularRoutes(filters = {}) {
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
          { field: { Name: "origin" } },
          { field: { Name: "destination" } },
          { field: { Name: "departureTime" } },
          { field: { Name: "arrivalTime" } },
          { field: { Name: "operator" } },
          { field: { Name: "busType" } },
          { field: { Name: "price" } },
          { field: { Name: "availableSeats" } },
          { field: { Name: "duration" } },
          { field: { Name: "amenities" } }
        ],
        where: [],
        orderBy: [{ fieldName: "availableSeats", sorttype: "DESC" }],
        pagingInfo: { limit: 12, offset: 0 }
      };

      // Apply filters
      if (filters.amenities?.length > 0) {
        params.where.push({
          FieldName: "amenities",
          Operator: "Contains",
          Values: filters.amenities
        });
      }

      if (filters.busTypes?.length > 0) {
        params.where.push({
          FieldName: "busType",
          Operator: "Contains",
          Values: filters.busTypes
        });
      }

      const response = await apperClient.fetchRecords('route', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching popular routes:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching popular routes:", error.message);
        throw new Error("Failed to fetch popular routes. Please try again.");
      }
    }
  }
};