import { useState } from 'react';
import { Sparkles, Menu, X, Phone, CalendarRange } from 'lucide-react';

interface NavbarProps {
  onNavigate: (section: 'home' | 'booking' | 'tracker') => void;
  activeSection: string;
}

export default function Navbar({ onNavigate, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'booking', label: 'Pricing Calculator' },
    { id: 'tracker', label: 'Track Booking' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm" id="sevzy-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer space-x-2 mr-8 group"
              onClick={() => { onNavigate('home'); setIsOpen(false); }}
              id="brand-logo-container"
            >
              <div className="bg-gradient-to-tr from-brand-violet to-brand-pink p-2.5 rounded-2xl text-white shadow-md shadow-brand-violet/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl font-extrabold tracking-tight bg-gradient-to-r from-brand-violet to-brand-pink bg-clip-text text-transparent">
                  Sevzy
                </span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Home Services</span>
              </div>
            </div>

            {/* Desktop Nav Items */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => onNavigate(item.id as 'home' | 'booking' | 'tracker')}
                  className={`font-semibold text-sm transition-colors relative py-2 ${
                    activeSection === item.id 
                      ? 'text-brand-violet' 
                      : 'text-gray-500 hover:text-brand-pink'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-brand-violet to-brand-pink rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Contact & CTA Buttons */}
          <div className="hidden md:flex items-center space-x-6">
            <a 
              href="tel:+91 7028997855" 
              className="flex items-center space-x-2 text-sm font-semibold text-gray-600 hover:text-brand-violet transition-colors"
              id="call-us-link"
            >
              <div className="p-2 bg-brand-violet-light rounded-full text-brand-violet">
                <IconPhone className="w-4 h-4" />
              </div>
              <span>+91 7028997855</span>
            </a>
            
            <button
              id="nav-cta-booking"
              onClick={() => onNavigate('booking')}
              className="flex items-center space-x-2 bg-gradient-to-r from-brand-violet to-brand-pink hover:from-brand-violet-dark hover:to-brand-pink-dark text-white text-sm font-bold px-6 py-3 rounded-2xl shadow-lg shadow-brand-violet/15 hover:shadow-brand-violet/25 transform hover:-translate-y-0.5 transition-all"
            >
              <CalendarRange className="w-4 h-4" />
              <span>Book Instantly</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-gray-500 hover:text-brand-violet hover:bg-gray-100 transition-colors"
              id="mobile-nav-toggle"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 animate-fadeIn" id="mobile-nav-menu">
          <div className="px-4 pt-4 pb-6 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-link-${item.id}`}
                onClick={() => {
                  onNavigate(item.id as 'home' | 'booking' | 'tracker');
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-xl font-bold text-base transition-colors ${
                  activeSection === item.id 
                    ? 'bg-brand-violet-light text-brand-violet' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-brand-pink'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <div className="pt-4 border-t border-gray-100 space-y-4">
              <a 
                href="tel:+91 7028997855" 
                className="flex items-center space-x-3 text-base font-bold text-gray-700 px-4"
              >
                <div className="p-2.5 bg-brand-violet-light rounded-full text-brand-violet">
                  <IconPhone className="w-5 h-5" />
                </div>
                <span>+91 7028997855</span>
              </a>
              
              <button
                id="mobile-cta-booking"
                onClick={() => {
                  onNavigate('booking');
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-brand-violet to-brand-pink text-white font-bold py-4 rounded-xl shadow-lg"
              >
                <CalendarRange className="w-5 h-5" />
                <span>Book Service Now</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

// Inline mini helper for phone icon since we need Phone inside
function IconPhone({ className }: { className?: string }) {
  return <Phone className={className} />;
}
