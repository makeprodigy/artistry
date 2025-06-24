'use client'

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Filter, ChevronDown, Check } from "lucide-react";
import { motion } from "framer-motion";



interface FilterBlockProps {
  categories: string[];
  locations: string[];
  selectedCategories: string[];
  selectedLocation: string;
  priceRange: [number, number];
  maxPrice: number;
  onCategoriesChange: (categories: string[]) => void;
  onLocationChange: (location: string) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  onClearFilters: () => void;
  totalResults: number;
}

export default function FilterBlock({
  categories,
  locations,
  selectedCategories,
  selectedLocation,
  priceRange,
  maxPrice,
  onCategoriesChange,
  onLocationChange,
  onPriceRangeChange,
  onClearFilters,
  totalResults
}: FilterBlockProps) {
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  
  const hasActiveFilters = selectedCategories.length > 0 || selectedLocation !== 'All' || 
    priceRange[0] > 0 || priceRange[1] < maxPrice;

  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoriesChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoriesChange([...selectedCategories, category]);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setCategoryDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gray-800/95 backdrop-blur-lg border-gray-600/40 shadow-2xl shadow-gray-900/60 max-h-[calc(100vh-8rem)] flex flex-col relative overflow-visible">
        <CardHeader className="pb-4 flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <CardTitle className="flex items-center gap-2 text-lg font-bold text-white">
              <Filter className="w-5 h-5 text-orange-500" />
              Filters
            </CardTitle>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-300">
              {totalResults} artists found
            </div>
            {hasActiveFilters && (
              <Button
                onClick={onClearFilters}
                size="sm"
                variant="outline"
                className="bg-red-900/20 hover:bg-red-900/30 text-red-400 border-red-600 hover:border-red-500 hover:text-red-300 text-xs px-3 py-1 backdrop-blur-sm"
              >
                <X className="w-3 h-3 mr-1" />
                Clear All
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4 overflow-y-visible flex-1 px-6">
          {/* Category Filter */}
          <div className="relative z-50">
            <h3 className="font-semibold text-white mb-3">Category</h3>
            <div className="relative" ref={categoryDropdownRef}>
              <button
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                className="w-full p-3 bg-gray-700/95 backdrop-blur-sm border border-gray-600/50 rounded-lg text-white text-sm text-left flex items-center justify-between focus:ring-2 focus:ring-orange-500 focus:border-transparent hover:bg-gray-600/95 transition-all duration-200 relative z-50"
              >
                <span>
                  {selectedCategories.length === 0 
                    ? 'Select categories...' 
                    : `${selectedCategories.length} selected`
                  }
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${categoryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {categoryDropdownOpen && (
                <div className="absolute z-[9999] w-full mt-1 bg-gray-700/98 backdrop-blur-sm border border-gray-600/50 rounded-lg shadow-2xl shadow-gray-900/70 max-h-40 overflow-y-auto">
                  {categories.map((category) => (
                    <div
                      key={category}
                      onClick={() => handleCategoryToggle(category)}
                      className="flex items-center gap-3 p-3 hover:bg-gray-600 cursor-pointer text-sm text-white"
                    >
                      <div className={`w-4 h-4 border border-gray-400 rounded flex items-center justify-center ${
                        selectedCategories.includes(category) ? 'bg-gradient-to-r from-orange-500 to-pink-500 border-transparent' : ''
                      }`}>
                        {selectedCategories.includes(category) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      {category}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <h3 className="font-semibold text-white mb-3">Price Range</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-300">
                <span>${priceRange[0].toLocaleString()}</span>
                <span>${priceRange[1].toLocaleString()}</span>
              </div>
              
              {/* Dual Range Slider */}
              <div className="relative">
                <div className="relative h-2 bg-gray-600 rounded-lg">
                  {/* Active range background */}
                  <div 
                    className="absolute h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg"
                    style={{
                      left: `${(priceRange[0] / maxPrice) * 100}%`,
                      width: `${((priceRange[1] - priceRange[0]) / maxPrice) * 100}%`
                    }}
                  />
                  
                  {/* Min range input */}
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    step="100"
                    value={priceRange[0]}
                    onChange={(e) => {
                      const newMin = parseInt(e.target.value);
                      if (newMin <= priceRange[1]) {
                        onPriceRangeChange([newMin, priceRange[1]]);
                      }
                    }}
                    className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-orange-500 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  
                  {/* Max range input */}
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => {
                      const newMax = parseInt(e.target.value);
                      if (newMax >= priceRange[0]) {
                        onPriceRangeChange([priceRange[0], newMax]);
                      }
                    }}
                    className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-pink-500 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Budget", max: 1500 },
                  { label: "Mid-range", max: 3000 },
                  { label: "Premium", max: maxPrice }
                ].map((preset) => (
                  <Button
                    key={preset.label}
                    variant="outline"
                    size="sm"
                    onClick={() => onPriceRangeChange([0, preset.max])}
                    className="text-xs bg-gradient-to-r from-gray-700 to-gray-600 hover:from-orange-500 hover:to-pink-500 border-2 border-gray-500 hover:border-orange-400 text-white hover:text-white font-semibold py-2 px-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Location Filter */}
          <div>
            <h3 className="font-semibold text-white mb-3">Location</h3>
            <select
              value={selectedLocation}
              onChange={(e) => onLocationChange(e.target.value)}
              className="w-full p-3 bg-gray-700/95 backdrop-blur-sm border border-gray-600/50 rounded-lg text-white text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent hover:bg-gray-600/95 transition-all duration-200"
            >
              {locations.map((location) => (
                <option key={location} value={location} className="bg-gray-700 text-white">
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div>
              <h3 className="font-semibold text-white mb-3">Active Filters</h3>
              <div className="flex flex-wrap gap-2">
                {selectedCategories.map(category => (
                  <Badge 
                    key={category}
                    className="bg-orange-100 text-orange-800 hover:bg-orange-200 cursor-pointer border-orange-300"
                    onClick={() => handleCategoryToggle(category)}
                  >
                    {category} <X className="w-3 h-3 ml-1" />
                  </Badge>
                ))}
                {selectedLocation !== 'All' && (
                  <Badge 
                    className="bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer border-blue-300"
                    onClick={() => onLocationChange('All')}
                  >
                    {selectedLocation} <X className="w-3 h-3 ml-1" />
                  </Badge>
                )}
                {(priceRange[0] > 0 || priceRange[1] < maxPrice) && (
                  <Badge 
                    className="bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer border-green-300"
                    onClick={() => onPriceRangeChange([0, maxPrice])}
                  >
                    ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
                    <X className="w-3 h-3 ml-1" />
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
} 