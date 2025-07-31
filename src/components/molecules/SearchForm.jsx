import React, { useState } from "react";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const SearchForm = ({ onSearch, loading = false }) => {
  const [searchData, setSearchData] = useState({
    origin: "",
    destination: "",
    date: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchData.origin && searchData.destination && searchData.date) {
      onSearch(searchData);
    }
  };

  const handleInputChange = (field, value) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const swapLocations = () => {
    setSearchData(prev => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="card p-6 space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 font-display mb-2">
          Find Your Perfect Journey
        </h2>
        <p className="text-gray-600">
          Search for bus routes and book your tickets instantly
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="form-label">
            <ApperIcon name="MapPin" size={16} className="inline mr-2 text-primary" />
            From
          </label>
          <Input
            type="text"
            placeholder="Enter departure city"
            value={searchData.origin}
            onChange={(e) => handleInputChange("origin", e.target.value)}
            className="form-input"
          />
        </div>

        <div className="space-y-2 relative">
          <label className="form-label">
            <ApperIcon name="MapPin" size={16} className="inline mr-2 text-primary" />
            To
          </label>
          <Input
            type="text"
            placeholder="Enter destination city"
            value={searchData.destination}
            onChange={(e) => handleInputChange("destination", e.target.value)}
            className="form-input"
          />
          <button
            type="button"
            onClick={swapLocations}
            className="absolute top-8 right-3 p-1 text-gray-400 hover:text-primary transition-colors duration-200"
            title="Swap locations"
          >
            <ApperIcon name="ArrowUpDown" size={16} />
          </button>
        </div>

        <div className="space-y-2">
          <label className="form-label">
            <ApperIcon name="Calendar" size={16} className="inline mr-2 text-primary" />
            Travel Date
          </label>
          <Input
            type="date"
            value={searchData.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="form-input"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          type="submit"
          loading={loading}
          icon="Search"
          size="lg"
          className="min-w-[200px]"
        >
          Search Buses
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;