import routesData from "@/services/mockData/routes.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const routeService = {
  async searchRoutes(origin, destination, date) {
    await delay(300);
    
    try {
      let filteredRoutes = [...routesData];
      
      if (origin && destination) {
        filteredRoutes = filteredRoutes.filter(route => 
          route.origin.toLowerCase().includes(origin.toLowerCase()) &&
          route.destination.toLowerCase().includes(destination.toLowerCase())
        );
      }
      
      // Sort by departure time
      filteredRoutes.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
      
      return filteredRoutes;
    } catch (error) {
      throw new Error("Failed to search routes. Please try again.");
    }
  },

  async getRouteById(id) {
    await delay(200);
    
    try {
      const route = routesData.find(r => r.Id === parseInt(id));
      if (!route) {
        throw new Error("Route not found");
      }
      return { ...route };
    } catch (error) {
      throw new Error("Failed to fetch route details. Please try again.");
    }
  },

  async getAllRoutes() {
    await delay(250);
    
    try {
      return [...routesData];
    } catch (error) {
      throw new Error("Failed to fetch routes. Please try again.");
    }
  },

  async getPopularRoutes() {
    await delay(200);
    
    try {
      // Return routes with higher available seats (more popular)
      const popular = [...routesData]
        .sort((a, b) => b.availableSeats - a.availableSeats)
        .slice(0, 6);
      
      return popular;
    } catch (error) {
      throw new Error("Failed to fetch popular routes. Please try again.");
    }
  }
};