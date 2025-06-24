'use client'

import Navigation from "../../components/navigation";
import CountUp from "../../components/CountUp";
import Aurora from "../../components/Aurora";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, useInView } from "framer-motion";
import { useRef, Component, ErrorInfo, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { 
  Users, 
  UserCheck,
  UserPlus,
  Sparkles,
  Mic,
  Music2,
  Headphones,
  MessageSquare,
  Play,
  Zap
} from "lucide-react";

// Constants for design system
const COLORS = {
  gradients: {
    singers: {
      light: "from-orange-500/20 to-pink-500/20",
      dark: "from-orange-500 to-pink-500",
      border: "border-orange-500/30 hover:border-orange-400/50",
      button: "border-orange-500/50 bg-gradient-to-r from-orange-500/20 to-pink-500/20 hover:from-orange-500 hover:to-pink-500 hover:border-orange-300"
    },
    dancers: {
      light: "from-purple-500/20 to-violet-500/20",
      dark: "from-purple-500 to-violet-500",
      border: "border-purple-500/30 hover:border-purple-400/50",
      button: "border-purple-500/50 bg-gradient-to-r from-purple-500/20 to-violet-500/20 hover:from-purple-500 hover:to-violet-500 hover:border-purple-300"
    },
    djs: {
      light: "from-emerald-500/20 to-teal-500/20",
      dark: "from-emerald-500 to-teal-500",
      border: "border-emerald-500/30 hover:border-emerald-400/50",
      button: "border-emerald-500/50 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500 hover:to-teal-500 hover:border-emerald-300"
    },
    speakers: {
      light: "from-amber-500/20 to-yellow-500/20",
      dark: "from-amber-500 to-yellow-500",
      border: "border-amber-500/30 hover:border-amber-400/50",
      button: "border-amber-500/50 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 hover:from-amber-500 hover:to-yellow-500 hover:border-amber-300"
    }
  }
} as const;

const ANIMATION = {
  durations: {
    fast: 0.3,
    normal: 0.5,
    slow: 0.8
  },
  spring: {
    stiffness: 300,
    damping: 30
  },
  stagger: {
    children: 0.15,
    delay: 0.05
  }
} as const;

// Error Boundary Component
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Component error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
          <div className="text-center text-white p-8">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="text-gray-300 mb-6">We&apos;re sorry, but there was an error loading this page.</p>
            <Button 
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
              aria-label="Reload page to try again"
            >
              Try Again
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const artistCategories = [
  {
    title: "Singers",
    description: "Vocal artists across all genres - from pop to classical, indie to opera",
    icon: Mic,
    count: "1,250+",
    featured: "Taylor Swift, Ed Sheeran",
    gradient: COLORS.gradients.singers.light,
    iconGradient: COLORS.gradients.singers.dark,
    borderColor: COLORS.gradients.singers.border,
    buttonIcon: Play
  },
  {
    title: "Dancers",
    description: "Professional dancers - ballet, hip-hop, contemporary, and more",
    icon: Music2,
    count: "980+",
    featured: "Martha Graham Company",
    gradient: COLORS.gradients.dancers.light,
    iconGradient: COLORS.gradients.dancers.dark,
    borderColor: COLORS.gradients.dancers.border,
    buttonIcon: Zap
  },
  {
    title: "DJs",
    description: "Electronic music producers and live performance DJs",
    icon: Headphones,
    count: "750+",
    featured: "Calvin Harris, Deadmau5",
    gradient: COLORS.gradients.djs.light,
    iconGradient: COLORS.gradients.djs.dark,
    borderColor: COLORS.gradients.djs.border,
    buttonIcon: Users
  },
  {
    title: "Speakers",
    description: "Motivational speakers, keynote presenters, and thought leaders",
    icon: MessageSquare,
    count: "620+",
    featured: "Tony Robbins, Brené Brown",
    gradient: COLORS.gradients.speakers.light,
    iconGradient: COLORS.gradients.speakers.dark,
    borderColor: COLORS.gradients.speakers.border,
    buttonIcon: Sparkles
  }
];

export default function Home() {
  const router = useRouter();

  // Refs for scroll animations
  const categoriesRef = useRef(null);
  const categoriesHeaderRef = useRef(null);
  const onboardRef = useRef(null);
  const footerRef = useRef(null);

  // InView hooks for triggering animations with optimized settings
  const categoriesInView = useInView(categoriesRef, { 
    once: true, 
    margin: "-50px",
    amount: 0.1 // Trigger when 10% is visible
  });
  const categoriesHeaderInView = useInView(categoriesHeaderRef, { 
    once: true, 
    margin: "-30px",
    amount: 0.3 
  });
  const onboardInView = useInView(onboardRef, { 
    once: true, 
    margin: "-50px",
    amount: 0.2 
  });
  const footerInView = useInView(footerRef, { 
    once: true, 
    margin: "-50px",
    amount: 0.1 
  });



  // Optimized animation variants with hardware acceleration
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: ANIMATION.stagger.children,
        delayChildren: ANIMATION.stagger.delay
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: ANIMATION.durations.normal,
        type: "spring" as const,
        stiffness: ANIMATION.spring.stiffness,
        damping: ANIMATION.spring.damping
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: ANIMATION.durations.normal,
        type: "spring" as const,
        stiffness: 260,
        damping: 25
      }
    }
  };

  const fadeUpVariants = {
    hidden: { 
      opacity: 0, 
      y: 25
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black prevent-cls">





      {/* Navigation */}

      <Navigation />







      {/* Hero Section */}

      
      <section className="relative overflow-hidden" aria-label="Hero section with main call-to-action">
        {/* Aurora Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden performance-layer">
          <Aurora
            colorStops={["#f97316", "#ec4899", "#8b5cf6"]}
            blend={0.4}
            amplitude={0.9}
            speed={0.3}
          />
        </div>
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 md:pt-24 md:pb-24">
          <div className="text-center">
            {/* Badge */}
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge className="px-6 py-2 text-sm font-medium bg-white/20 text-white border-white/30 backdrop-blur-sm hover:bg-white/30">
                🌟 Discover Amazing Talent
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Connect with<br></br>
              <span className="text-5xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-400 via-purple-400 via-violet-400 to-orange-400 animate-gradient will-change-auto">
                {" "}Amazing Artists
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p 
              className="text-xl md:text-2xl text-gray-50 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Discover talented singers, dancers, DJs, and speakers for your next event. 
              Book directly or explore their portfolios to find the perfect artist.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <Button 
                size="lg" 
                className="px-10 py-5 text-lg font-semibold bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0 shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 group"
                onClick={() => router.push('/artists')}
                aria-label="Browse and view all available artists"
              >
                <UserCheck className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
                View Artists
              </Button>
              <Button 
                size="lg" 
                className="px-10 py-5 text-lg font-semibold bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white border-0 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 group"
                onClick={() => router.push('/onboard')}
                aria-label="Sign up to join our platform as an artist"
              >
                <UserPlus className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
                Join as Artist
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.4 }}
              >
                <div className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                  <CountUp
                    from={0}
                    to={3600}
                    separator=","
                    direction="up"
                    duration={1.9}
                    delay={0.5}
                    className="count-up-text"
                  />
                  +
                </div>
                <div className="text-sm text-orange-100 font-medium">Active Artists</div>
              </motion.div>
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.5 }}
              >
                <div className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                  <CountUp
                    from={0}
                    to={12000}
                    separator=","
                    direction="up"
                    duration={2.1}
                    delay={0.8}
                    className="count-up-text"
                  />
                  +
                </div>
                <div className="text-sm text-orange-100 font-medium">Events Booked</div>
              </motion.div>
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.6 }}
              >
                <div className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                  <CountUp
                    from={0}
                    to={50}
                    direction="up"
                    duration={2.2}
                    delay={1.1}
                    className="count-up-text"
                  />
                  +
                </div>
                <div className="text-sm text-orange-100 font-medium">Countries</div>
              </motion.div>
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.7 }}
              >
                <div className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                  <CountUp
                    from={0}
                    to={4.9}
                    direction="up"
                    duration={2.0}
                    delay={1.4}
                    decimals={1}
                    className="count-up-text"
                  />
                  ★
                </div>
                <div className="text-sm text-orange-100 font-medium">Average Rating</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>








      {/* Artist Categories Section */}


      <section id="explore" className="py-16 md:py-24 bg-gradient-to-b from-gray-900/50 to-gray-800/30" aria-label="Artist categories to explore">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div 
            ref={categoriesHeaderRef}
            className="text-center mb-16"
            initial="hidden"
            animate={categoriesHeaderInView ? "visible" : "hidden"}
            variants={fadeUpVariants}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent mb-4"
              variants={itemVariants}
            >
              Explore Artist Categories
            </motion.h2>
            <motion.p 
              className="text-xl text-white max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Find the perfect artist for your event from our diverse community of talented performers
            </motion.p>
          </motion.div>









          {/* Category Cards */}
          <motion.div 
            ref={categoriesRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            animate={categoriesInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {artistCategories.map((category, index) => (
              <motion.div
                key={category.title}
                variants={cardVariants}
                custom={index}
              >
                <Card 
                  className={`group hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 hover:-translate-y-3 cursor-pointer border-2 bg-gradient-to-br ${category.gradient} backdrop-blur-lg h-[480px] flex flex-col ${category.borderColor} hover:scale-[1.02]`}
                >
                  <CardHeader className="text-center pb-0 flex-shrink-0 p-6">
                    {/* Icon Container with Gradient Background */}
                    <div className="relative mb-4">
                      <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${category.iconGradient} p-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                        <category.icon className="w-full h-full text-white drop-shadow-lg" strokeWidth={1.5} />
                      </div>
                      {/* Glow Effect */}
                      <div className={`absolute inset-0 w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${category.iconGradient} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`}></div>
                    </div>
                    
                    <CardTitle className="text-xl font-bold text-white mb-3">
                      {category.title}
                    </CardTitle>
                    <Badge className={`w-fit mx-auto bg-gradient-to-r ${category.gradient} text-white border border-white/20 backdrop-blur-sm font-semibold px-3 py-1`}>
                      {category.count} artists
                    </Badge>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col p-6 pt-0">
                    <div className="h-32 space-y-4 flex flex-col">
                      <CardDescription className="text-gray-200 leading-relaxed text-sm flex-1 flex items-center">
                        {category.description}
                      </CardDescription>
                      <div className="text-sm text-gray-300 p-3 rounded-lg bg-white/5 backdrop-blur-sm flex-1 flex items-center">
                        <span><strong className="text-white">Featured:</strong> {category.featured}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex-shrink-0">
                      {(() => {
                        const baseButtonClass = "w-full border-2 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 group/btn hover:shadow-lg hover:shadow-current/20 ";
                        const categoryKey = category.title.toLowerCase() as keyof typeof COLORS.gradients;
                        const buttonClass = baseButtonClass + COLORS.gradients[categoryKey].button;
                        
                        return (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className={buttonClass}
                            onClick={() => router.push('/artists')}
                            aria-label={`Explore ${category.title} - Browse ${category.count} available ${category.title.toLowerCase()}`}
                          >
                            <category.buttonIcon className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform duration-200" />
                            Explore {category.title}
                          </Button>
                        );
                      })()}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>








      {/* Onboard Artist Section */}
      <section id="onboard" className="py-16 md:py-24 bg-gradient-to-r from-gray-800/60 to-gray-900/60" aria-label="Artist onboarding information">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            ref={onboardRef}
            className="max-w-3xl mx-auto"
            initial="hidden"
            animate={onboardInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent mb-6"
              variants={itemVariants}
            >
              Are You an Artist?
            </motion.h2>
            <motion.p 
              className="text-xl text-white mb-8 leading-relaxed"
              variants={itemVariants}
            >
              Join thousands of artists who showcase their talent and connect with event organizers worldwide. 
              Start building your portfolio and grow your audience today.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={itemVariants}
            >
              <Button 
                size="lg" 
                className="px-10 py-5 text-lg font-semibold bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0 shadow-xl hover:shadow-orange-500/25 transition-all duration-300 group"
                onClick={() => router.push('/onboard')}
                aria-label="Join as artist - Start your artist onboarding process"
              >
                <Sparkles className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
                Join as Artist
              </Button>

            </motion.div>
          </motion.div>
        </div>
      </section>







      {/* Footer */}
      <motion.footer 
        ref={footerRef}
        className="bg-gray-900 text-white py-12"
        initial="hidden"
        animate={footerInView ? "visible" : "hidden"}
        variants={fadeUpVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            variants={containerVariants}
          >
            <motion.div className="md:col-span-2" variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-4">
                Artistly<span className="text-orange-400">.com</span>
              </h3>
              <p className="text-gray-400 mb-4">
                Connecting amazing artists with unforgettable events worldwide.
              </p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h4 className="font-semibold mb-4">For Artists</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Join Platform</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Artist Resources</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
              </ul>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h4 className="font-semibold mb-4">For Organizers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Book Artists</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Event Planning</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </motion.div>
          </motion.div>
          <motion.div 
            className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"
            variants={itemVariants}
          >
            <p>&copy; 2024 Artistly.com. All rights reserved.</p>
          </motion.div>
        </div>
      </motion.footer>


      

      </div>
    </ErrorBoundary>
  );
}
