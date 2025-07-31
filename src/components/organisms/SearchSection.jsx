import React, { useState, useEffect } from "react";
import SearchForm from "@/components/molecules/SearchForm";
import RouteCard from "@/components/molecules/RouteCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { routeService } from "@/services/api/routeService";
import { toast } from "react-toastify";

const SearchSection = ({ onRouteSelect }) => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [lastSearch, setLastSearch] = useState(null);

  useEffect(() => {
    loadPopularRoutes();
  }, []);

  const loadPopularRoutes = async () => {
    setLoading(true);
    setError("");
    
    try {
      const popularRoutes = await routeService.getPopularRoutes();
      setRoutes(popularRoutes);
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
        searchData.date
      );
      setRoutes(searchResults);
      
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
      
      {routes.length === 0 && searchPerformed ? (
        <Empty
          title="No Routes Found"
          message="We couldn't find any bus routes for your search criteria. Try different cities or dates."
          actionText="Search Again"
          onAction={() => setSearchPerformed(false)}
          icon="MapPin"
        />
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 font-display">
              {searchPerformed ? "Search Results" : "Popular Routes"}
            </h2>
            {routes.length > 0 && (
              <div className="text-sm text-gray-600">
                {routes.length} route{routes.length > 1 ? "s" : ""} available
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            {routes.map((route) => (
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
  );
};

export default SearchSection;