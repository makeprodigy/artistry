'use client'

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import ArtistCard from '../../../components/ArtistCard';
import FilterBlock from '../../../components/FilterBlock';
import Navigation from '../../../components/navigation';
import { Button } from '@/components/ui/button';
import { Search, Grid, List, Filter, X, ArrowLeft } from 'lucide-react';
import { artistsData, type Artist } from '../../../data/artists';

export default function ArtistsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Set default view mode based on screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setViewMode('list');
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const artists: Artist[] = artistsData;

  // Get unique categories and locations
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(artists.map(artist => artist.category)));
    return uniqueCategories;
  }, [artists]);

  const locations = useMemo(() => {
    const uniqueLocations = Array.from(new Set(artists.map(artist => artist.location)));
    return ['All', ...uniqueLocations];
  }, [artists]);

  const maxPrice = useMemo(() => {
    return Math.max(...artists.map(artist => artist.price));
  }, [artists]);

  // Filter artists based on selected filters
  const filteredArtists = useMemo(() => {
    return artists.filter(artist => {
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(artist.category);
      const locationMatch = selectedLocation === 'All' || artist.location === selectedLocation;
      const priceMatch = artist.price >= priceRange[0] && artist.price <= priceRange[1];
      const searchMatch = searchQuery === '' || 
        artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artist.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artist.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artist.location.toLowerCase().includes(searchQuery.toLowerCase());

      return categoryMatch && locationMatch && priceMatch && searchMatch;
    });
  }, [artists, selectedCategories, selectedLocation, priceRange, searchQuery]);

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedLocation('All');
    setPriceRange([0, maxPrice]);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.history.back()}
            className="flex items-center text-gray-300 hover:text-white bg-gray-800/50 backdrop-blur-md border border-gray-600/30 hover:bg-gray-700/50 transition-all duration-200 rounded-full w-10 h-10 p-0 justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Discover Amazing{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
              Artists
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Find the perfect talent for your next event from our curated collection of professional artists
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400 w-5 h-5 z-10 pointer-events-none" />
            <input
              type="text"
              placeholder="Search artists by name, category, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-600 bg-gray-800/50 text-white placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 relative z-0"
            />
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
            >
              <Filter className="w-4 h-4 mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
              {showFilters ? <X className="w-4 h-4 ml-2" /> : null}
            </Button>
          </div>

          {/* Filters Sidebar */}
          <div className={`lg:w-80 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-24">
              <FilterBlock
                categories={categories}
                locations={locations}
                selectedCategories={selectedCategories}
                selectedLocation={selectedLocation}
                priceRange={priceRange}
                maxPrice={maxPrice}
                onCategoriesChange={setSelectedCategories}
                onLocationChange={setSelectedLocation}
                onPriceRangeChange={setPriceRange}
                onClearFilters={handleClearFilters}
                totalResults={filteredArtists.length}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* View Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center justify-between mb-6"
            >
              <div className="text-gray-300">
                Showing {filteredArtists.length} of {artists.length} artists
              </div>
              {/* Hide toggle buttons on mobile (< 768px) */}
              {!isMobile && (
                <div className="flex items-center gap-3">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={viewMode === 'grid' 
                      ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105' 
                      : 'bg-gray-700/80 border-2 border-gray-500 hover:border-orange-400 text-gray-200 hover:text-white hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-pink-500/20 font-semibold shadow-md hover:shadow-lg transition-all duration-300 backdrop-blur-sm'
                    }
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={viewMode === 'list' 
                      ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105' 
                      : 'bg-gray-700/80 border-2 border-gray-500 hover:border-orange-400 text-gray-200 hover:text-white hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-pink-500/20 font-semibold shadow-md hover:shadow-lg transition-all duration-300 backdrop-blur-sm'
                    }
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </motion.div>

            {/* Artists Grid */}
            {filteredArtists.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {filteredArtists.map((artist, index) => (
                  <ArtistCard
                    key={artist.id}
                    artist={artist}
                    index={index}
                    viewMode={viewMode}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-16"
              >
                <div className="text-gray-500 text-6xl mb-4">🎭</div>
                <h3 className="text-2xl font-bold text-white mb-2">No artists found</h3>
                <p className="text-gray-300 mb-6">
                  Try adjusting your filters or search terms to find the perfect artist.
                </p>
                <Button
                  onClick={handleClearFilters}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 