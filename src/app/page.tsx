import Navigation from "../../components/navigation";
import CountUp from "../../components/CountUp";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const artistCategories = [
  {
    title: "Singers",
    description: "Vocal artists across all genres - from pop to classical, indie to opera",
    icon: "🎤",
    count: "1,250+",
    featured: "Taylor Swift, Ed Sheeran",
    color: "bg-gradient-to-br from-pink-50 to-rose-100 border-rose-200"
  },
  {
    title: "Dancers",
    description: "Professional dancers - ballet, hip-hop, contemporary, and more",
    icon: "💃",
    count: "980+",
    featured: "Martha Graham Company",
    color: "bg-gradient-to-br from-purple-50 to-indigo-100 border-indigo-200"
  },
  {
    title: "DJs",
    description: "Electronic music producers and live performance DJs",
    icon: "🎧",
    count: "750+",
    featured: "Calvin Harris, Deadmau5",
    color: "bg-gradient-to-br from-cyan-50 to-blue-100 border-blue-200"
  },
  {
    title: "Speakers",
    description: "Motivational speakers, keynote presenters, and thought leaders",
    icon: "🎙️",
    count: "620+",
    featured: "Tony Robbins, Brené Brown",
    color: "bg-gradient-to-br from-emerald-50 to-green-100 border-green-200"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 md:pt-28 md:pb-24">
          <div className="text-center">
            {/* Badge */}
            <div className="mb-8">
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
                🌟 Discover Amazing Talent
              </Badge>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Connect with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                {" "}Amazing Artists
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover talented singers, dancers, DJs, and speakers for your next event. 
              Book directly or explore their portfolios to find the perfect artist.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" className="px-8 py-4 text-lg font-semibold">
                🎭 View Artists
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold">
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">
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
                <div className="text-sm text-gray-600">Active Artists</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">
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
                <div className="text-sm text-gray-600">Events Booked</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">
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
                <div className="text-sm text-gray-600">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">
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
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]">
            <div className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"></div>
          </div>
        </div>
      </section>

      {/* Artist Categories Section */}
      <section id="explore" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Artist Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find the perfect artist for your event from our diverse community of talented performers
            </p>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {artistCategories.map((category) => (
              <Card 
                key={category.title} 
                className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 ${category.color}`}
              >
                <CardHeader className="text-center pb-2">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                    {category.title}
                  </CardTitle>
                  <Badge variant="secondary" className="w-fit mx-auto">
                    {category.count} artists
                  </Badge>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 mb-4 leading-relaxed">
                    {category.description}
                  </CardDescription>
                  <div className="text-sm text-gray-500 mb-4">
                    <strong>Featured:</strong> {category.featured}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                  >
                    Explore {category.title}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Onboard Artist Section */}
      <section id="onboard" className="py-16 md:py-24 bg-gradient-to-r from-primary/5 to-purple-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Are You an Artist?
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join thousands of artists who showcase their talent and connect with event organizers worldwide. 
              Start building your portfolio and grow your audience today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 py-4 text-lg font-semibold">
                🎨 Join as Artist
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold">
                View Artist Benefits
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">
                Artistly<span className="text-primary">.com</span>
              </h3>
              <p className="text-gray-400 mb-4">
                Connecting amazing artists with unforgettable events worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Artists</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Join Platform</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Artist Resources</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Organizers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Book Artists</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Event Planning</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Artistly.com. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
