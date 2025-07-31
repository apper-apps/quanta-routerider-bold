import React from 'react';
import Card from '@/components/atoms/Card';
import ApperIcon from '@/components/ApperIcon';

const FilterSidebar = ({ filters, onFilterChange, onClearFilters, routeCount }) => {
  const amenityOptions = [
    { id: 'wifi', label: 'WiFi', icon: 'Wifi' },
    { id: 'charging', label: 'Charging Ports', icon: 'Battery' },
    { id: 'ac', label: 'Air Conditioning', icon: 'Snowflake' },
    { id: 'restroom', label: 'Onboard Restroom', icon: 'MapPin' },
    { id: 'reclining', label: 'Reclining Seats', icon: 'Armchair' },
    { id: 'legroom', label: 'Extra Legroom', icon: 'ArrowUp' }
  ];

  const timeSlotOptions = [
    { id: 'morning', label: 'Morning (06:00 - 12:00)', icon: 'Sunrise' },
    { id: 'afternoon', label: 'Afternoon (12:00 - 18:00)', icon: 'Sun' },
    { id: 'evening', label: 'Evening (18:00 - 24:00)', icon: 'Sunset' },
    { id: 'night', label: 'Night (00:00 - 06:00)', icon: 'Moon' }
  ];

  const busTypeOptions = [
    { id: 'standard', label: 'Standard', icon: 'Bus' },
    { id: 'premium', label: 'Premium', icon: 'Star' },
    { id: 'luxury', label: 'Luxury Coach', icon: 'Crown' },
    { id: 'express', label: 'Express', icon: 'Zap' },
    { id: 'sleeper', label: 'Sleeper', icon: 'Bed' }
  ];

  const handleCheckboxChange = (category, value) => {
    const currentFilters = filters[category] || [];
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter(item => item !== value)
      : [...currentFilters, value];
    
    onFilterChange(category, newFilters);
  };

  const isChecked = (category, value) => {
    return (filters[category] || []).includes(value);
  };

  const hasActiveFilters = Object.values(filters).some(filterArray => filterArray.length > 0);

  const FilterGroup = ({ title, options, category, icon: GroupIcon }) => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <ApperIcon name={GroupIcon} size={16} className="text-primary" />
        <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
      </div>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.id}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <input
              type="checkbox"
              checked={isChecked(category, option.id)}
              onChange={() => handleCheckboxChange(category, option.id)}
              className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
            />
            <ApperIcon name={option.icon} size={14} className="text-gray-500" />
            <span className="text-sm text-gray-700 flex-1">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full lg:w-80 space-y-4">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <ApperIcon name="Filter" size={20} className="text-primary" />
            <h2 className="text-lg font-bold text-gray-900 font-display">Filters</h2>
          </div>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-sm text-primary hover:text-blue-700 font-medium transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        {routeCount !== null && (
          <div className="mb-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2">
              <ApperIcon name="MapPin" size={16} className="text-blue-600" />
              <span className="text-sm font-medium text-blue-800">
                {routeCount} route{routeCount !== 1 ? 's' : ''} found
              </span>
            </div>
          </div>
        )}

        <div className="space-y-6">
          <FilterGroup
            title="Amenities"
            options={amenityOptions}
            category="amenities"
            icon="Settings"
          />
          
          <div className="border-t pt-6">
            <FilterGroup
              title="Time Slots"
              options={timeSlotOptions}
              category="timeSlots"
              icon="Clock"
            />
          </div>
          
          <div className="border-t pt-6">
            <FilterGroup
              title="Bus Types"
              options={busTypeOptions}
              category="busTypes"
              icon="Bus"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FilterSidebar;