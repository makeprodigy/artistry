'use client'

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../../../components/navigation';
import { Button } from '@/components/ui/button';
import { DataTable, type TableColumn } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Check, 
  X, 
  MoreHorizontal,
  Users,
  DollarSign,
  TrendingUp,
  Star
} from 'lucide-react';
import { artistsData, type Artist } from '../../../data/artists';

interface ExtendedArtist extends Artist {
  status?: 'pending' | 'approved' | 'rejected';
  submittedAt?: string;
  [key: string]: unknown;
}

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Add mock status and submission dates to the artists data
  const enhancedArtists: ExtendedArtist[] = useMemo(() => {
    return artistsData.map((artist, index) => ({
      ...artist,
      status: ['pending', 'approved', 'rejected'][index % 3] as 'pending' | 'approved' | 'rejected',
      submittedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }));
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(enhancedArtists.map(artist => artist.category)));
    return ['All', ...uniqueCategories];
  }, [enhancedArtists]);

  // Filter artists based on search and filters
  const filteredArtists = useMemo(() => {
    return enhancedArtists.filter(artist => {
      const searchMatch = searchQuery === '' || 
        artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artist.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artist.location.toLowerCase().includes(searchQuery.toLowerCase());

      const categoryMatch = selectedCategory === 'All' || artist.category === selectedCategory;
      const statusMatch = selectedStatus === 'All' || artist.status === selectedStatus;

      return searchMatch && categoryMatch && statusMatch;
    });
  }, [enhancedArtists, searchQuery, selectedCategory, selectedStatus]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalArtists = enhancedArtists.length;
    const pendingCount = enhancedArtists.filter(a => a.status === 'pending').length;
    const approvedCount = enhancedArtists.filter(a => a.status === 'approved').length;
    const averageFee = enhancedArtists.reduce((sum, artist) => sum + artist.price, 0) / totalArtists;
    const averageRating = enhancedArtists.reduce((sum, artist) => sum + artist.rating, 0) / totalArtists;

    return {
      totalArtists,
      pendingCount,
      approvedCount,
      averageFee,
      averageRating
    };
  }, [enhancedArtists]);

  const handleAction = (artist: ExtendedArtist, action: 'approve' | 'reject' | 'view') => {
    console.log(`${action} artist:`, artist.name);
    // Here you would implement the actual action logic
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="default" className="bg-green-600 text-white">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-orange-600 text-white">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const columns: TableColumn<ExtendedArtist>[] = [
    {
      key: 'name',
      label: 'Artist Name',
      render: (artist) => (
        <div className="flex items-center space-x-3">
          <img 
            src={artist.image} 
            alt={artist.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="font-medium text-white">{artist.name}</div>
            <div className="text-sm text-gray-400">{artist.subcategory}</div>
          </div>
        </div>
      ),
      className: "min-w-[200px]"
    },
    {
      key: 'location',
      label: 'City',
      render: (artist) => (
        <span className="text-gray-300">{artist.location}</span>
      ),
      className: "hidden sm:table-cell"
    },
    {
      key: 'category',
      label: 'Category',
      render: (artist) => (
        <Badge variant="outline" className="border-orange-500 text-orange-400">
          {artist.category}
        </Badge>
      )
    },
    {
      key: 'price',
      label: 'Fee',
      render: (artist) => (
        <span className="font-semibold text-green-400">
          ${artist.price.toLocaleString()}
        </span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (artist) => getStatusBadge(artist.status || 'pending'),
      className: "hidden md:table-cell"
    },
    {
      key: 'rating',
      label: 'Rating',
      render: (artist) => (
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-gray-300">{artist.rating}</span>
        </div>
      ),
      className: "hidden lg:table-cell"
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (artist) => (
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleAction(artist, 'view')}
            className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/20"
          >
            <Eye className="w-4 h-4" />
          </Button>
          {artist.status === 'pending' && (
            <>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleAction(artist, 'approve')}
                className="text-green-400 hover:text-green-300 hover:bg-green-500/20"
              >
                <Check className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleAction(artist, 'reject')}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </>
          )}
          <Button
            size="sm"
            variant="ghost"
            className="text-gray-400 hover:text-gray-300 hover:bg-gray-500/20"
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      ),
      className: "text-right"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Manager{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
              Dashboard
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Review and manage artist submissions for your events
          </p>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Artists</p>
                <p className="text-2xl font-bold text-white">{stats.totalArtists}</p>
              </div>
              <Users className="w-8 h-8 text-orange-500" />
            </div>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Pending Review</p>
                <p className="text-2xl font-bold text-white">{stats.pendingCount}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-500" />
            </div>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Average Fee</p>
                <p className="text-2xl font-bold text-white">${stats.averageFee.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Avg Rating</p>
                <p className="text-2xl font-bold text-white">{stats.averageRating.toFixed(1)}</p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search artists..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-600 bg-gray-700/50 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-600 bg-gray-700/50 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="All">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Export Button */}
            <Button
              variant="outline"
              className="border-orange-500 text-orange-400 hover:bg-orange-500/20"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
          
          <div className="mt-4 flex items-center text-sm text-gray-400">
            <Filter className="w-4 h-4 mr-2" />
            Showing {filteredArtists.length} of {enhancedArtists.length} artists
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <DataTable<ExtendedArtist>
            data={filteredArtists}
            columns={columns}
            emptyMessage="No artists found matching your criteria"
            className="shadow-2xl"
          />
        </motion.div>
      </div>
    </div>
  );
} 