import routesData from "@/services/mockData/routes.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const routeService = {
async searchRoutes(origin, destination, date, filters = {}) {
    await delay(300);
    
    try {
      let filteredRoutes = [...routesData];
      
      if (origin && destination) {
        filteredRoutes = filteredRoutes.filter(route => 
          route.origin.toLowerCase().includes(origin.toLowerCase()) &&
          route.destination.toLowerCase().includes(destination.toLowerCase())
        );
      }
      
      // Apply filters
      filteredRoutes = this.applyRouteFilters(filteredRoutes, filters);
      
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

async getPopularRoutes(filters = {}) {
    await delay(200);
    
    try {
      // Return routes with higher available seats (more popular)
      let popular = [...routesData]
        .sort((a, b) => b.availableSeats - a.availableSeats)
        .slice(0, 12);
      
      // Apply filters
      popular = this.applyRouteFilters(popular, filters);
      
      return popular;
    } catch (error) {
      throw new Error("Failed to fetch popular routes. Please try again.");
    }
  },

  applyRouteFilters(routes, filters) {
    if (!filters || (!filters.amenities?.length && !filters.timeSlots?.length && !filters.busTypes?.length)) {
      return routes;
    }

    return routes.filter(route => {
      // Amenities filter
      if (filters.amenities?.length > 0) {
        const routeAmenities = route.amenities.map(a => {
          if (a.toLowerCase().includes('wifi')) return 'wifi';
          if (a.toLowerCase().includes('charging')) return 'charging';
          if (a.toLowerCase().includes('air conditioning')) return 'ac';
          if (a.toLowerCase().includes('restroom')) return 'restroom';
          if (a.toLowerCase().includes('reclining')) return 'reclining';
          if (a.toLowerCase().includes('legroom')) return 'legroom';
          return null;
        }).filter(Boolean);
        
        const hasRequiredAmenities = filters.amenities.every(filter => 
          routeAmenities.includes(filter)
        );
        if (!hasRequiredAmenities) return false;
      }

      // Time slots filter
      if (filters.timeSlots?.length > 0) {
        const hour = parseInt(route.departureTime.split(':')[0]);
        const timeSlot = 
          hour >= 6 && hour < 12 ? 'morning' :
          hour >= 12 && hour < 18 ? 'afternoon' :
          hour >= 18 ? 'evening' : 'night';
        
        if (!filters.timeSlots.includes(timeSlot)) return false;
      }

      // Bus types filter
      if (filters.busTypes?.length > 0) {
        const busType = route.busType.toLowerCase();
        const matchingType = 
          busType.includes('standard') ? 'standard' :
          busType.includes('premium') ? 'premium' :
          busType.includes('luxury') ? 'luxury' :
          busType.includes('express') ? 'express' :
          busType.includes('sleeper') ? 'sleeper' : null;
        
        if (!matchingType || !filters.busTypes.includes(matchingType)) return false;
      }

      return true;
    });
  }
};