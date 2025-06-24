'use client'

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { type Artist } from "../data/artists";

interface ArtistCardProps {
  artist: Artist;
  index?: number;
  viewMode?: 'grid' | 'list';
}

export default function ArtistCard({ artist, index = 0, viewMode = 'grid' }: ArtistCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4, // Reduced duration for smoother feel
        delay: Math.min(index * 0.05, 0.3), // Reduced delay and capped
        type: "spring" as const,
        stiffness: 300,
        damping: 30
      }
    }
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-30px", amount: 0.1 }}
        whileHover={{ 
          y: -3,
          scale: 1.01,
          transition: { 
            duration: 0.2,
            type: "spring",
            stiffness: 400,
            damping: 30
          }
        }}
        className="will-change-transform"
      >
        <Card className="overflow-hidden bg-gradient-to-br from-gray-800/95 to-gray-900/98 backdrop-blur-lg border-gray-600/40 hover:shadow-2xl hover:shadow-orange-500/25 hover:from-gray-700/98 hover:to-gray-800/98 transition-all duration-300 group">
          <div className="flex flex-col md:flex-row">
            {/* Artist Image */}
            <div className="relative w-full md:w-48 h-48 md:h-32 flex-shrink-0 overflow-hidden">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/20 via-transparent to-transparent md:to-black/20" />
              
              {/* Category Badge */}
              <div className="absolute top-2 left-2">
                <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0 text-xs">
                  {artist.category}
                </Badge>
              </div>

              {/* Rating Badge - Small screens only */}
              <div className="absolute top-2 right-2 md:hidden">
                <Badge className="bg-gray-900/90 text-yellow-400 border border-yellow-400/30 flex items-center gap-1 backdrop-blur-sm">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  {artist.rating}
                </Badge>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-between p-4">
              {/* Mobile Layout (< 425px) */}
              <div className="block sm:hidden">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                    {artist.name}
                  </h3>
                  <div className="text-right">
                    <div className="text-xl font-bold text-white">
                      ${artist.price.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-400">per event</div>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-1 text-xs text-gray-300 mb-2">
                  <span className="font-medium text-orange-400">{artist.subcategory}</span>
                  <span className="text-gray-500">•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {artist.experience}
                  </div>
                  <span className="text-gray-500">•</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {artist.location}
                  </div>
                </div>
                
                <p className="text-sm text-gray-300 line-clamp-2 mb-3">
                  {artist.description}
                </p>
                
                <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    size="sm"
                  >
                    Book Now
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-gray-700/50 border-gray-500 text-gray-300 hover:bg-gray-600 hover:text-white hover:border-gray-400 transition-all duration-300"
                  >
                    View Profile
                  </Button>
                </div>
              </div>

              {/* Tablet Layout (425px - 768px) */}
              <div className="hidden sm:block md:hidden">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                        {artist.name}
                      </h3>
                      <Badge className="bg-gray-900/90 text-yellow-400 border border-yellow-400/30 flex items-center gap-1 backdrop-blur-sm">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {artist.rating}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-white">
                        ${artist.price.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-400">per event</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-300">
                    <span className="font-medium text-orange-400">{artist.subcategory}</span>
                    <span className="text-gray-500">•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {artist.experience}
                    </div>
                    <span className="text-gray-500">•</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {artist.location}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-300 line-clamp-2">
                    {artist.description}
                  </p>
                  
                  <div className="flex gap-2 pt-1">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      size="sm"
                    >
                      Book Now
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-gray-700/50 border-gray-500 text-gray-300 hover:bg-gray-600 hover:text-white hover:border-gray-400 transition-all duration-300"
                    >
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>

              {/* Desktop Layout (> 768px) */}
              <div className="hidden md:flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                      {artist.name}
                    </h3>
                    <Badge className="bg-gray-900/90 text-yellow-400 border border-yellow-400/30 flex items-center gap-1 backdrop-blur-sm">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {artist.rating}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                    <span className="font-medium text-orange-400">{artist.subcategory}</span>
                    <span className="text-gray-500">•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {artist.experience}
                    </div>
                    <span className="text-gray-500">•</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {artist.location}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-300 line-clamp-2 mb-3">
                    {artist.description}
                  </p>
                </div>

                <div className="text-right ml-4">
                  <div className="text-2xl font-bold text-white">
                    ${artist.price.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-400 mb-3">per event</div>
                  
                  <div className="flex gap-2">
                    <Button 
                      className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      size="sm"
                    >
                      Book Now
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-gray-700/50 border-gray-500 text-gray-300 hover:bg-gray-600 hover:text-white hover:border-gray-400 transition-all duration-300"
                    >
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  // Grid view (original layout)
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.4 }
      }}
    >
      <Card className="overflow-hidden bg-gradient-to-br from-gray-800/95 to-gray-900/98 backdrop-blur-lg border-gray-600/40 hover:shadow-2xl hover:shadow-orange-500/25 hover:from-gray-700/98 hover:to-gray-800/98 transition-all duration-300 group relative">
        {/* Artist Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={artist.image}
            alt={artist.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          
          {/* Rating Badge */}
          <div className="absolute top-4 right-4">
            <Badge className="bg-gray-900/90 text-yellow-400 border border-yellow-400/30 flex items-center gap-1 backdrop-blur-sm">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              {artist.rating}
            </Badge>
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0">
              {artist.category}
            </Badge>
          </div>
        </div>

        <CardHeader className="pb-3">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
              {artist.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <span className="font-medium text-orange-400">{artist.subcategory}</span>
              <span className="text-gray-500">•</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {artist.experience}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0 space-y-4">
          <p className="text-sm text-gray-300 line-clamp-2">
            {artist.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm text-gray-300">
              <MapPin className="w-4 h-4" />
              {artist.location}
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">
                ${artist.price.toLocaleString()}
              </div>
              <div className="text-xs text-gray-400">per event</div>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button 
              className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0 font-semibold shadow-lg hover:shadow-xl transition-all duration-400 transform hover:scale-102"
              size="sm"
            >
              Book Now
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-blue-600 hover:to-purple-600 border-2 border-gray-400 hover:border-blue-400 text-white hover:text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-400 transform hover:scale-102 backdrop-blur-sm"
            >
              View Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
} 