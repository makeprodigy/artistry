# Artistry - Artist Booking Platform

A modern, full-featured artist booking platform built with Next.js 15, featuring a sophisticated UI, advanced filtering, and comprehensive artist management capabilities.

## 🎨 Overview

**Artistry** is a cutting-edge platform that connects event organizers with talented artists across multiple categories including singers, dancers, DJs, and speakers. The platform offers an intuitive browsing experience, advanced filtering capabilities, artist onboarding, and administrative tools.

## ✨ Key Features

### 🎯 Core Functionality
- **Artist Discovery**: Browse and search through a curated collection of professional artists
- **Advanced Filtering**: Filter by category, location, price range, and rating
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Search**: Instant search across artist names, categories, and locations
- **Artist Onboarding**: Multi-step form for artists to join the platform
- **Admin Dashboard**: Comprehensive management tools for platform administrators

### 🎨 UI/UX Features
- **Modern Glass-morphism Design**: Beautiful gradient backgrounds with blur effects
- **Smooth Animations**: Powered by Framer Motion for fluid user interactions
- **Dynamic Layouts**: Grid and list view modes for artist browsing
- **Interactive Components**: Aurora effects, count-up animations, and hover states
- **Accessible Design**: Built with accessibility and usability in mind

### 🛠️ Technical Features
- **TypeScript Integration**: Full type safety across the application
- **Form Validation**: Robust validation using React Hook Form + Yup
- **Component Library**: Custom UI components built on Radix UI primitives
- **Performance Optimized**: Lazy loading, image optimization, and efficient animations
- **Error Handling**: Comprehensive error boundaries and graceful fallbacks

## 🏗️ Architecture & Tech Stack

### Frontend Technologies
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Advanced animations and transitions
- **Radix UI** - Accessible component primitives
- **React Hook Form** - Efficient form handling
- **Yup** - Schema validation
- **Lucide React** - Beautiful icon library

### Key Dependencies
```json
{
  "next": "15.3.4",
  "react": "^19.0.0",
  "framer-motion": "^12.19.1",
  "react-hook-form": "^7.58.1",
  "yup": "^1.6.1",
  "tailwindcss": "^4",
  "lucide-react": "^0.522.0"
}
```

## 📁 Project Structure

```
artistry/
├── components/                 # Reusable components
│   ├── ArtistCard.tsx         # Artist display component (grid/list modes)
│   ├── Aurora.tsx             # Background aurora effect
│   ├── CountUp.tsx            # Animated counter component
│   ├── FilterBlock.tsx        # Advanced filtering interface
│   ├── navigation.tsx         # Main navigation component
│   └── example-form.tsx       # Form validation example
├── data/                      # Data layer
│   ├── artists.ts            # Artist data and interfaces
│   └── sample-data.ts        # Sample data definitions
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── artists/          # Artist browsing page
│   │   ├── dashboard/        # Admin dashboard
│   │   ├── onboard/         # Artist registration
│   │   ├── layout.tsx       # Root layout with fonts
│   │   ├── page.tsx         # Homepage with categories
│   │   └── globals.css      # Global styles
│   ├── components/ui/        # ShadCN UI components
│   │   ├── button.tsx       # Button component
│   │   ├── card.tsx         # Card component
│   │   ├── input.tsx        # Input component
│   │   ├── select.tsx       # Select component
│   │   └── table.tsx        # Table component
│   └── lib/                 # Utility functions
│       └── utils.ts         # Common utilities (cn function)
├── components.json           # ShadCN configuration
├── tailwind.config.js       # Tailwind configuration
└── tsconfig.json           # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.0 or higher
- **npm**, **yarn**, or **pnpm** package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd artistry
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) (or the port shown in terminal)

## 📖 Page Guide

### 🏠 Homepage (`/`)
- **Hero Section**: Animated introduction with call-to-action
- **Artist Categories**: Interactive cards for Singers, Dancers, DJs, and Speakers
- **Statistics**: Dynamic counters showing platform metrics
- **Call-to-Action**: Onboarding invitation for new artists

### 🎭 Artists Page (`/artists`)
- **Search Bar**: Real-time search across all artist data
- **Filter Sidebar**: Advanced filtering by category, location, and price
- **View Modes**: Toggle between grid and list layouts
- **Artist Cards**: Detailed artist information with booking options
- **Responsive Design**: Optimized layouts for all screen sizes

### 📝 Onboarding (`/onboard`)
- **Multi-step Form**: 4-section registration process
- **Progress Indicator**: Visual progress tracking
- **Form Validation**: Real-time validation with error messages
- **File Upload**: Profile image upload with preview
- **Dynamic Fields**: Multi-select for categories and languages

### 📊 Dashboard (`/dashboard`)
- **Statistics Overview**: Key platform metrics
- **Artist Management**: Approve/reject artist applications
- **Data Table**: Sortable and filterable artist list
- **Action Controls**: Bulk operations and individual artist actions
- **Export Functionality**: Data export capabilities

## 🎨 UI Components

### Artist Cards
```typescript
interface Artist {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  location: string;
  image: string;
  rating: number;
  experience: string;
  description: string;
}
```

### Navigation
- **Responsive Menu**: Desktop and mobile layouts
- **Active States**: Current page highlighting
- **Smooth Transitions**: Animated menu interactions

### Filtering System
- **Multi-select Categories**: Checkbox-based category selection
- **Price Range Slider**: Dual-handle range selector
- **Location Dropdown**: City-based filtering
- **Real-time Updates**: Instant result filtering

## 🎛️ Development Commands

```bash
# Development
npm run dev          # Start development server with Turbopack

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🔧 Configuration

### Tailwind CSS
- **Custom Theme**: Extended color palette with gradients
- **Dark Mode**: Optimized for dark theme
- **Responsive**: Mobile-first design approach
- **Animations**: Custom animation utilities

### ShadCN UI Setup
- **Style**: Default styling system
- **Components**: Pre-built accessible components
- **Customization**: Fully customizable design system

### TypeScript
- **Strict Mode**: Enhanced type checking
- **Path Mapping**: Simplified imports with `@/` alias
- **Interface Definitions**: Comprehensive type definitions

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

### Other Platforms
- **Netlify**: Standard Next.js deployment
- **AWS**: Using AWS Amplify or custom setup
- **Docker**: Container-based deployment

## 🎯 Future Enhancements

### Planned Features
- **Authentication**: User login and registration system
- **Payment Integration**: Stripe/PayPal booking payments
- **Calendar System**: Availability and booking calendar
- **Reviews & Ratings**: User review system
- **Real-time Chat**: Artist-client communication
- **Advanced Analytics**: Detailed platform analytics
- **Email Notifications**: Automated email system
- **Multi-language Support**: Internationalization

### Technical Improvements
- **Database Integration**: PostgreSQL/MongoDB backend
- **API Routes**: RESTful API development
- **Testing Suite**: Unit and integration tests
- **Performance**: Image optimization and caching
- **SEO**: Advanced SEO optimization

## 🛠️ Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer Motion** - For smooth animations
- **Radix UI** - For accessible component primitives
- **Lucide** - For beautiful icons
