'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Logo positioned on the left side of the screen - clickable link to home */}
      <div className="fixed top-6 left-4 sm:left-6 lg:left-8 z-50 flex items-center h-12">
        <Link href="/" className="cursor-pointer">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white whitespace-nowrap drop-shadow-2xl hover:text-orange-200 transition-colors duration-200">
            Artistly<span className="text-orange-300">.com</span>
          </h1>
        </Link>
      </div>

      {/* Navbar aligned to the right side of the screen - thinner and wider */}
      <nav className="fixed top-6 right-4 sm:right-6 lg:right-8 z-50 flex items-center h-12">
        <div className="relative">
          <div className="bg-gray-900/90 backdrop-blur-md rounded-full px-8 sm:px-10 lg:px-12 py-2 shadow-2xl border border-orange-500/20">
            <div className="flex items-center">
              {/* Desktop Navigation Links */}
              <div className="hidden md:flex items-center space-x-8 lg:space-x-10">
                <Link
                  href="/"
                  className={`text-sm lg:text-base font-medium transition-colors duration-200 whitespace-nowrap ${
                    pathname === '/' 
                      ? 'text-orange-300 border-b-2 border-orange-300 pb-1' 
                      : 'text-white hover:text-orange-300'
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/artists"
                  className={`text-sm lg:text-base font-medium transition-colors duration-200 whitespace-nowrap ${
                    pathname === '/artists' 
                      ? 'text-orange-300 border-b-2 border-orange-300 pb-1' 
                      : 'text-white hover:text-orange-300'
                  }`}
                >
                  Artists
                </Link>
                <Link
                  href="/onboard"
                  className={`text-sm lg:text-base font-medium transition-colors duration-200 whitespace-nowrap ${
                    pathname === '/onboard' 
                      ? 'text-orange-300 border-b-2 border-orange-300 pb-1' 
                      : 'text-white hover:text-orange-300'
                  }`}
                >
                  Join as Artist
                </Link>
                <Link
                  href="/dashboard"
                  className={`text-sm lg:text-base font-medium transition-colors duration-200 whitespace-nowrap ${
                    pathname === '/dashboard' 
                      ? 'text-orange-300 border-b-2 border-orange-300 pb-1' 
                      : 'text-white hover:text-orange-300'
                  }`}
                >
                  Dashboard
                </Link>
                
                {/* Profile Icon */}
                <button className="flex items-center justify-center w-7 h-7 lg:w-8 lg:h-8 bg-orange-500/20 hover:bg-orange-500/30 rounded-full transition-colors duration-200">
                  <svg 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    className="text-orange-300 lg:w-4 lg:h-4"
                  >
                    <path 
                      d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <circle 
                      cx="12" 
                      cy="7" 
                      r="4" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    />
                  </svg>
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden text-white hover:text-orange-300 p-1 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                <svg
                  className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>
          </div>

                {/* Mobile Navigation Dropdown - positioned absolutely relative to nav container */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full right-0 mt-3 w-56 animate-in slide-in-from-top-5 duration-200 will-change-transform performance-layer">
          <div className="bg-gray-900/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-orange-500/20">
                <div className="space-y-1">
                  <Link
                    href="/"
                    className={`block text-sm font-medium py-3 px-3 rounded-lg transition-all duration-200 ${
                      pathname === '/' 
                        ? 'text-orange-300 bg-orange-500/20 border-l-2 border-orange-300' 
                        : 'text-white hover:text-orange-300 hover:bg-orange-500/10'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/artists"
                    className={`block text-sm font-medium py-3 px-3 rounded-lg transition-all duration-200 ${
                      pathname === '/artists' 
                        ? 'text-orange-300 bg-orange-500/20 border-l-2 border-orange-300' 
                        : 'text-white hover:text-orange-300 hover:bg-orange-500/10'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Artists
                  </Link>
                  <Link
                    href="/onboard"
                    className={`block text-sm font-medium py-3 px-3 rounded-lg transition-all duration-200 ${
                      pathname === '/onboard' 
                        ? 'text-orange-300 bg-orange-500/20 border-l-2 border-orange-300' 
                        : 'text-white hover:text-orange-300 hover:bg-orange-500/10'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Join as Artist
                  </Link>
                  <Link
                    href="/dashboard"
                    className={`block text-sm font-medium py-3 px-3 rounded-lg transition-all duration-200 ${
                      pathname === '/dashboard' 
                        ? 'text-orange-300 bg-orange-500/20 border-l-2 border-orange-300' 
                        : 'text-white hover:text-orange-300 hover:bg-orange-500/10'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <div className="border-t border-orange-500/20 my-3"></div>
                  <button 
                    className="flex items-center space-x-3 text-white hover:text-orange-300 hover:bg-orange-500/10 text-sm font-medium py-3 px-3 rounded-lg w-full transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      className="text-orange-300"
                    >
                      <path 
                        d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                      <circle 
                        cx="12" 
                        cy="7" 
                        r="4" 
                        stroke="currentColor" 
                        strokeWidth="2"
                      />
                    </svg>
                    <span>Profile</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
} 