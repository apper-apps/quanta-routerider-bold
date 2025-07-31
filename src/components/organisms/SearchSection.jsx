import React, { useState, useEffect } from "react";
import SearchForm from "@/components/molecules/SearchForm";
import RouteCard from "@/components/molecules/RouteCard";
import FilterSidebar from "@/components/organisms/FilterSidebar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { routeService } from "@/services/api/routeService";
import { toast } from "react-toastify";

const SearchSection = ({ onRouteSelect }) => {
const [routes, setRoutes] = useState([]);
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [lastSearch, setLastSearch] = useState(null);
  const [filters, setFilters] = useState({
    amenities: [],
    timeSlots: [],
    busTypes: []
  });

  useEffect(() => {
    loadPopularRoutes();
  }, []);

const loadPopularRoutes = async () => {
    setLoading(true);
    setError("");
    
    try {
      const popularRoutes = await routeService.getPopularRoutes(filters);
      setRoutes(popularRoutes);
      setFilteredRoutes(popularRoutes);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load popular routes");
    } finally {
      setLoading(false);
    }
  };

const handleSearch = async (searchData) => {
    setLoading(true);
    setError("");
    setSearchPerformed(true);
    setLastSearch(searchData);
    
    try {
      const searchResults = await routeService.searchRoutes(
        searchData.origin,
        searchData.destination,
        searchData.date,
        filters
      );
      setRoutes(searchResults);
      setFilteredRoutes(searchResults);
      
      if (searchResults.length > 0) {
        toast.success(`Found ${searchResults.length} route${searchResults.length > 1 ? "s" : ""} for your journey`);
      }
    } catch (err) {
      setError(err.message);
      toast.error("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (category, values) => {
    const newFilters = { ...filters, [category]: values };
    setFilters(newFilters);
    
    // Apply filters to current routes
    const filtered = applyFilters(routes, newFilters);
    setFilteredRoutes(filtered);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      amenities: [],
      timeSlots: [],
      busTypes: []
    };
    setFilters(clearedFilters);
    setFilteredRoutes(routes);
    toast.info("All filters cleared");
  };

  const applyFilters = (routesToFilter, filtersToApply) => {
    return routesToFilter.filter(route => {
      // Amenities filter
      if (filtersToApply.amenities.length > 0) {
        const routeAmenities = route.amenities.map(a => {
          if (a.toLowerCase().includes('wifi')) return 'wifi';
          if (a.toLowerCase().includes('charging')) return 'charging';
          if (a.toLowerCase().includes('air conditioning')) return 'ac';
          if (a.toLowerCase().includes('restroom')) return 'restroom';
          if (a.toLowerCase().includes('reclining')) return 'reclining';
          if (a.toLowerCase().includes('legroom')) return 'legroom';
          return null;
        }).filter(Boolean);
        
        const hasRequiredAmenities = filtersToApply.amenities.every(filter => 
          routeAmenities.includes(filter)
        );
        if (!hasRequiredAmenities) return false;
      }

      // Time slots filter
      if (filtersToApply.timeSlots.length > 0) {
        const hour = parseInt(route.departureTime.split(':')[0]);
        const timeSlot = 
          hour >= 6 && hour < 12 ? 'morning' :
          hour >= 12 && hour < 18 ? 'afternoon' :
          hour >= 18 ? 'evening' : 'night';
        
        if (!filtersToApply.timeSlots.includes(timeSlot)) return false;
      }

      // Bus types filter
      if (filtersToApply.busTypes.length > 0) {
        const busType = route.busType.toLowerCase();
        const matchingType = 
          busType.includes('standard') ? 'standard' :
          busType.includes('premium') ? 'premium' :
          busType.includes('luxury') ? 'luxury' :
          busType.includes('express') ? 'express' :
          busType.includes('sleeper') ? 'sleeper' : null;
        
        if (!matchingType || !filtersToApply.busTypes.includes(matchingType)) return false;
      }

      return true;
    });
  };

  // Apply filters when routes change
  useEffect(() => {
    const filtered = applyFilters(routes, filters);
    setFilteredRoutes(filtered);
  }, [routes, filters]);

  const handleRetry = () => {
    if (lastSearch) {
      handleSearch(lastSearch);
    } else {
      loadPopularRoutes();
    }
  };

  const handleRouteSelect = (route) => {
    toast.info(`Selected ${route.operator} - ${route.origin} to ${route.destination}`);
    onRouteSelect(route);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={handleRetry} />;
  }

return (
    <div className="space-y-8">
      <SearchForm onSearch={handleSearch} loading={loading} />
      
      <div className="flex flex-col lg:flex-row gap-8">
        <FilterSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          routeCount={filteredRoutes.length}
        />
        
        <div className="flex-1">
          {filteredRoutes.length === 0 && (routes.length > 0 || searchPerformed) ? (
            <Empty
              title={routes.length === 0 ? "No Routes Found" : "No Matching Routes"}
              message={routes.length === 0 
                ? "We couldn't find any bus routes for your search criteria. Try different cities or dates."
                : "No routes match your current filter selection. Try adjusting your filters or clearing them."
              }
              actionText={routes.length === 0 ? "Search Again" : "Clear Filters"}
              onAction={routes.length === 0 ? () => setSearchPerformed(false) : handleClearFilters}
              icon="MapPin"
            />
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 font-display">
                  {searchPerformed ? "Search Results" : "Popular Routes"}
                </h2>
                {filteredRoutes.length > 0 && (
                  <div className="text-sm text-gray-600">
                    {filteredRoutes.length} route{filteredRoutes.length > 1 ? "s" : ""} available
                    {routes.length !== filteredRoutes.length && (
                      <span className="text-primary ml-1">
                        (filtered from {routes.length})
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                {filteredRoutes.map((route) => (
                  <RouteCard
                    key={route.Id}
                    route={route}
                    onSelect={handleRouteSelect}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchSection;