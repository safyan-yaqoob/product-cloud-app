'use client';

import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LogIn, ArrowRight, CheckCircle, Star, ChevronRight, BarChart3, LineChart, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/ui/logo';

export default function Home() {
  const { user, loading, login } = useAuth();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (user && !loading) {
      router.push('/modules/dashboard');
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 bg-opacity-95 dark:bg-opacity-95 backdrop-blur-sm border-b dark:border-gray-800 transition-all ${isScrolled ? 'shadow-sm' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo and links */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Logo variant="default" />
              </Link>
              <div className="hidden md:flex ml-10 space-x-6 text-gray-600 dark:text-gray-300">
                <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Home</Link>
                <Link href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Features</Link>
                <Link href="#marketplace" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Marketplace</Link>
                <Link href="#pricing" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Pricing</Link>
                <Link href="#docs" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Docs</Link>
                <Link href="#blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Blog</Link>
              </div>
            </div>
            
            {/* Desktop buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button 
                onClick={() => login()} 
                variant="ghost"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Login
              </Button>
              <Button 
                onClick={() => login()} 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
              >
                Sign Up
              </Button>
              <Button 
                className="bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-full"
              >
                Contact Sales
              </Button>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <Button 
                variant="ghost"
                size="icon" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600 dark:text-gray-300"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg pb-4 px-4">
            <div className="flex flex-col space-y-3 pt-2 pb-4">
              <Link href="/" className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">Home</Link>
              <Link href="#features" className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">Features</Link>
              <Link href="#marketplace" className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">Marketplace</Link>
              <Link href="#pricing" className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">Pricing</Link>
              <Link href="#docs" className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">Docs</Link>
              <Link href="#blog" className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">Blog</Link>
            </div>
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-col space-y-3">
              <Button 
                onClick={() => login()} 
                variant="ghost"
                className="w-full justify-center text-gray-700 dark:text-gray-300"
              >
                Login
              </Button>
              <Button 
                onClick={() => login()} 
                className="w-full justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
              >
                Sign Up
              </Button>
              <Button 
                className="w-full justify-center bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-full"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section with Gradient Background */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight dark:text-white">
                <span className="block">Modern platform for</span>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">growing businesses</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 md:pr-10">
                Streamline your operations, scale your business, and make data-driven decisions with our comprehensive Product Cloud solution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => login()} 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 px-8 py-6 text-lg h-auto"
                >
                  Get Started
                </Button>
                <Button variant="outline" className="group px-8 py-6 text-lg h-auto dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
                  <span>Watch Demo</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">Free 14-day trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">Cancel anytime</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 transform transition-all hover:scale-[1.02] duration-500">
                  <img 
                    src="https://cdn.dribbble.com/users/1138853/screenshots/15429036/media/6660212cd4c9c0d5f3c6e18ecce349c6.png" 
                    alt="Dashboard Preview" 
                    className="w-full h-auto"
                  />
                </div>
                <div className="absolute -bottom-8 -left-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl p-4 shadow-lg transform rotate-6 flex items-center gap-3">
                  <LineChart className="h-6 w-6 text-white" />
                  <span className="text-white font-medium">+24% Growth</span>
                </div>
                <div className="absolute -top-8 -right-8 bg-gradient-to-br from-blue-500 to-teal-400 rounded-xl p-4 shadow-lg transform -rotate-6 flex items-center gap-3">
                  <BarChart3 className="h-6 w-6 text-white" />
                  <span className="text-white font-medium">Revenue Up</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powering businesses worldwide</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join thousands of companies that trust Product Cloud for their management needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">2,500+</div>
              <div className="text-gray-600">Products registered</div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">750+</div>
              <div className="text-gray-600">Active tenants</div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">18,000+</div>
              <div className="text-gray-600">Users onboarded</div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent mb-2">99.9%</div>
              <div className="text-gray-600">Uptime reliability</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Companies */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-12">Trusted by innovative companies</h2>
          <div className="relative">
            <div className="flex space-x-12 animate-scrollRight">
              <div className="flex-shrink-0">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png" alt="Google" className="h-10 md:h-12" />
              </div>
              <div className="flex-shrink-0">
                <img src="https://i.pinimg.com/736x/91/92/1c/91921cec4f8a8cbe3d09e596e0659d81.jpg" alt="Microsoft" className="h-10 md:h-12" />
              </div>
              <div className="flex-shrink-0">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png" alt="Amazon" className="h-10 md:h-12" />
              </div>
              <div className="flex-shrink-0">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png" alt="Apple" className="h-10 md:h-12" />
              </div>
              <div className="flex-shrink-0">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Facebook_Logo_%282019%29.svg/2560px-Facebook_Logo_%282019%29.svg.png" alt="Meta" className="h-10 md:h-12" />
              </div>
              {/* Duplicate logos for infinite scrolling effect */}
              <div className="flex-shrink-0">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png" alt="Google" className="h-10 md:h-12" />
              </div>
              <div className="flex-shrink-0">
                <img src="https://i.pinimg.com/736x/91/92/1c/91921cec4f8a8cbe3d09e596e0659d81.jpg" alt="Microsoft" className="h-10 md:h-12" />
              </div>
              <div className="flex-shrink-0">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png" alt="Amazon" className="h-10 md:h-12" />
              </div>
              <div className="flex-shrink-0">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png" alt="Apple" className="h-10 md:h-12" />
              </div>
              <div className="flex-shrink-0">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Facebook_Logo_%282019%29.svg/2560px-Facebook_Logo_%282019%29.svg.png" alt="Meta" className="h-10 md:h-12" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What our customers say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from businesses that have transformed their operations with Product Cloud
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CTO, TechCorp",
                image: "https://randomuser.me/api/portraits/women/1.jpg",
                rating: 5,
                text: "This platform has completely transformed how we manage our SaaS subscriptions. The analytics are powerful yet easy to understand."
              },
              {
                name: "Michael Chen",
                role: "Operations Director, GrowthIQ",
                image: "https://randomuser.me/api/portraits/men/2.jpg",
                rating: 5,
                text: "The tenant management features alone saved us thousands of dollars by giving us visibility into our usage patterns."
              },
              {
                name: "Emma Rodriguez",
                role: "Product Manager, Innovate Inc",
                image: "https://randomuser.me/api/portraits/women/3.jpg",
                rating: 4,
                text: "Onboarding was seamless and the customer support has been exceptional. Our team was productive from day one."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="text-gray-700">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to succeed</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform provides all the tools to help your business grow
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-100">
              <div className="bg-blue-600 text-white p-3 rounded-lg inline-flex items-center justify-center mb-5">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Powerful Analytics</h3>
              <p className="text-gray-600">Get insights into your business with real-time analytics and customizable dashboards.</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl border border-purple-100">
              <div className="bg-purple-600 text-white p-3 rounded-lg inline-flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Enterprise Security</h3>
              <p className="text-gray-600">Best-in-class security practices to keep your data safe and compliant.</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-xl border border-green-100">
              <div className="bg-green-600 text-white p-3 rounded-lg inline-flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Scalable Growth</h3>
              <p className="text-gray-600">Infrastructure that grows with your business, from startup to enterprise.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to transform your business?</h2>
          <p className="text-lg opacity-90 max-w-3xl mx-auto mb-8">
            Join thousands of companies already using Product Cloud to scale their operations
          </p>
          <Button 
            onClick={() => login()} 
            className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-6 text-lg h-auto"
          >
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-1 lg:col-span-2">
              <div className="flex items-center mb-4">
                <Logo variant="default" />
              </div>
              <p className="mb-4 pr-4 text-gray-400">
                Modern cloud management platform designed to help businesses scale, optimize, and grow.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Security</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Enterprise</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">API Reference</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Community</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2023 Product Cloud. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}